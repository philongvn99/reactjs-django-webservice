import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Container, Row, Col } from "reactstrap";
import axiosInstance from "../../../config/axiosConfig";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// Moves an item from one list to another list
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

//-------------------------------------------STYLE---------------------------------------------------//
//----------------------------------------------------------------------------------------------------/
const grid = 10;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  margin: `5px`,
  height: "70px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  color: "#303",
  // change background colour if dragging
  background: isDragging ? "deeppink" : "#fff",
  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (boardtype) => ({
  background:
    boardtype === "teams"
      ? "#e90052"
      : boardtype === "home"
      ? "#00ff85"
      : boardtype === "away"
      ? "#04f5ff"
      : "#ebff00",
  padding: grid,
  width: "100%",
  minHeight: `1600px`,
  borderRadius: "20px",
});

const styles = {
  entireFormStyle: {
    margin: "20px 0px",
    padding: "5px 5px",
    border: "2px solid black",
    borderRadius: "10px",
    background: "black",
  },
  imgStyle: {
    height: "30px",
    width: "30px",
    margin: "0px 10px",
  },
  hStyle: {
    color: "black",
    fontFamily: "'Hanalei Fill', cursive",
  },
  rankStyle: {
    margin: "0 10px 0 auto",
    fontSize: "20px",
    fontFamily: "'Hanalei Fill', cursive",
  },
  scoreStyle: {
    height: "50px",
    width: "50px",
    textAlign: "center",
  },
  scoreboardStyle: {
    height: "70px",
    margin: "5px 5px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    borderRadius: "3px",
    border: "2px solid #303",
  },
  submitButton: {
    width: "150px",
    height: "50px",
  },
};

const scoreList = () => {
  let ret = {};
  Array.from({ length: 10 }, (v, k) => k).forEach((k) => {
    ret[`home${k}`] = 0;
    ret[`away${k}`] = 0;
  });
  return ret;
};

const dateStringFromDate = (date) =>
  date.getYear() +
  1900 +
  String(date.getMonth() + 1).padStart(2, "0") +
  String(date.getDate()).padStart(2, "0");

const LeagueResultsForm = () => {
  const [teams, setTeams] = useState([]);
  const [home, setHome] = useState([]);
  const [away, setAway] = useState([]);
  const [id2List] = useState({
    allteams: "teams",
    hometeams: "home",
    awayteams: "away",
  });
  const [score, setScore] = useState(scoreList);
  const [dateStr, setDateStr] = useState(new Date());

  const isInitialMount = useRef(true);

  async function fetchMyAPI() {
    await axiosInstance
      .getLeagueTable()
      .then((res) => {
        console.log(res.data);
        setTeams(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      document.getElementById("league_link").classList = "nav-link active";

      fetchMyAPI();
    } else {
      // Your useEffect code here to be run on update
    }
  }, []);

  const handleChange = (event) => {
    setScore({
      ...score,
      [event.target.name]: parseInt(event.target.value),
    });
  };

  const handleButton = (date) => {
    async function getMatchResults() {
      // let newTeams = await axiosInstance
      //   .getLeagueTable()
      //   .then((res) => res.data);
      await axiosInstance
        .getMatchResults(dateStringFromDate(date))
        .then((res) => {
          let newTeams = teams.map((a) => ({ ...a }));
          let newHome = [];
          let newAway = [];

          Array.from(res.data["home"], (v, i) => {
            let idx = newTeams.findIndex((o) => o.team_name === v);
            newHome.push(newTeams[idx]);
            newTeams.splice(idx, 1);
          });

          Array.from(res.data["away"], (v, i) => {
            let idx = newTeams.findIndex((o) => o.team_name === v);
            if (idx < 0) console.log(v);
            newAway.push(newTeams[idx]);
            newTeams.splice(idx, 1);
          });
          setScore(res.data["score"]);
          setAway(newAway);
          setHome(newHome);
          setTeams(newTeams);
        })
        .catch((err) => {
          alert(err);
        });
    }
    getMatchResults();
  };

  const handleSubmit = (event) => {
    let numOfMatch = home.length;
    if (away.length !== numOfMatch)
      alert("[ERROR]: Number of Home teams is not equal to Away ones");
    else {
      let teamIdList = [];
      let teamGSList = [];
      let teamGCList = [];
      Array.from({ length: numOfMatch }, (v, k) => k).map((k) => {
        teamIdList.push(home[k].team_id, away[k].team_id);
        teamGSList.push(score[`home${k}`], score[`away${k}`]);
        teamGCList.push(score[`away${k}`], score[`home${k}`]);
        return null;
      });

      axiosInstance
        .updateLeagueResults({
          id: teamIdList,
          goalscore: teamGSList,
          goalconceeded: teamGCList,
        })
        .then(function (response) {
          if (response.data.success) alert("Successful Update");
          else alert("Unsuccessful Update");
        });
    }
    event.preventDefault();
  };

  const renderScoreBoard = (num) =>
    Array.from({ length: num }, (v, k) => k).map((k) => (
      <div style={styles.scoreboardStyle} key={`math${k}-result`}>
        <input
          type="number"
          id={`home-score-${k}`}
          name={`home${k}`}
          min="0"
          value={score[`home${k}`] || 0}
          onChange={handleChange}
          style={styles.scoreStyle}
        ></input>
        -
        <input
          type="number"
          id={`away-score-${k}`}
          name={`away${k}`}
          min="0"
          value={score[`away${k}`] || 0}
          onChange={handleChange}
          style={styles.scoreStyle}
        ></input>
      </div>
    ));

  const getList = (id) =>
    id2List[id] === "teams" ? teams : id2List[id] === "home" ? home : away;

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      switch (source.droppableId) {
        case "allteams":
          setTeams(items);
          break;
        case "hometeams":
          setHome(items);
          break;
        case "awayteams":
          setAway(items);
          break;
        default:
          return;
      }
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );
      if (result.allteams !== undefined) setTeams(result.allteams);
      if (result.awayteams !== undefined) setAway(result.awayteams);
      if (result.hometeams !== undefined) setHome(result.hometeams);
    }
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (
    <Container>
      <Row style={styles.entireFormStyle}>
        <DatePicker
          dateFormat="dd-MM-yyyy"
          selected={moment(dateStr).toDate()}
          onChange={(date) => {
            setDateStr(date);
            handleButton(date);
          }}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <Col style={{ padding: 0, width: "30%" }}>
            <Droppable droppableId="allteams">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} style={getListStyle("teams")}>
                  <h1 style={styles.hStyle}>TEAMS</h1>
                  {teams.map((item, index) => (
                    <Draggable
                      key={item.team_id + "-team"}
                      draggableId={`team-${item.team_id}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <img
                            src={item.team_logo_link}
                            alt={item.team_acronym_name + "-logo"}
                            style={styles.imgStyle}
                          />
                          <span>{item.team_acronym_name}</span>
                          <span style={styles.rankStyle}>{item.team_id}</span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Col>
          <Col style={{ padding: 0, width: "30%" }}>
            <Droppable droppableId="hometeams">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} style={getListStyle("home")}>
                  <h1 style={styles.hStyle}>HOME</h1>
                  {home.map((item, index) => (
                    <Draggable
                      key={item.team_id + "-home"}
                      draggableId={`team-${item.team_id}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <img
                            src={item.team_logo_link}
                            alt={item.team_acronym_name + "-logo"}
                            style={styles.imgStyle}
                          />
                          <span>{item.team_acronym_name}</span>
                          <span style={styles.rankStyle}>{item.team_id}</span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Col>
          <Col style={{ padding: 0, width: "10%" }}>
            <div style={getListStyle(null)}>
              <h1 style={styles.hStyle}>RESULT</h1>
              {
                <form onSubmit={handleSubmit}>
                  {renderScoreBoard(
                    home.length > away.length ? away.length : home.length
                  )}
                  <div style={styles.scoreboardStyle}>
                    <input
                      type="submit"
                      value="Submit"
                      style={styles.submitButton}
                    ></input>
                  </div>
                </form>
              }
            </div>
          </Col>
          <Col style={{ padding: 0, width: "30%" }}>
            <Droppable droppableId="awayteams">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} style={getListStyle("away")}>
                  <h1 style={styles.hStyle}>AWAY</h1>
                  {away.map((item, index) => (
                    <Draggable
                      key={item.team_id + "-away"}
                      draggableId={`team-${item.team_id}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <img
                            src={item.team_logo_link}
                            alt={item.team_acronym_name + "-logo"}
                            style={styles.imgStyle}
                          />
                          <span>{item.team_acronym_name}</span>
                          <span style={styles.rankStyle}>{item.team_id}</span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Col>
        </DragDropContext>
      </Row>
    </Container>
  );
};

export default LeagueResultsForm;
