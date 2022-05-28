// eslint-disable-next-line
import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";

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
  // change background colour if dragging
  background: isDragging ? "deeppink" : "lightslategrey",
  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (boardtype) => ({
  background:
    boardtype === "teams"
      ? "#e90052"
      : boardtype === "home"
      ? "#00ff85"
      : "#04f5ff",
  padding: grid,
  width: "100%",
  minHeight: `1600px`,
  borderRadius: "20px",
});

const style = {
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
  boardStyle: {
    padding: "10px",
  },
  submitButton: {
    width: "250px",
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

const LeagueResultsForm = () => {
  const [teams, setTeams] = useState([]);
  const [home, setHome] = useState([]);
  const [away, setAway] = useState([]);
  const [id2List, setId2List] = useState({
    allteams: "teams",
    hometeams: "home",
    awayteams: "away",
  });
  const [selectedFile, setSelectedFile] = useState();
  const [score, setScore] = useState(scoreList);

  const isInitialMount = useRef(true);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      async function fetchMyAPI() {
        await axios
          .get("/UnitedHome/league/table")
          .then((res) => {
            setTeams(res.data);
          })
          .catch((err) => {
            alert(err);
          });
      }
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

  const handleSubmit = (event) => {
    let numOfMatch = home.length;
    if (away.length !== numOfMatch)
      alert("[ERROR]: Number of Home teams is not equal to Away ones");
    else {
      let teamIdList = [];
      //let teamPointList = []
      let teamGSList = [];
      let teamGCList = [];
      Array.from({ length: numOfMatch }, (v, k) => k).map((k) => {
        teamIdList.push(home[k].team_id, away[k].team_id);
        teamGSList.push(score[`home${k}`], score[`away${k}`]);
        teamGCList.push(score[`away${k}`], score[`home${k}`]);
        return null;
      });

      axios
        .put("http://localhost:8000/UnitedHome/league/table/", {
          id: teamIdList,
          //point: teamPointLis,
          goalscore: teamGSList,
          goalconceded: teamGCList,
        })
        .then(function (response) {
          if (response.data.success) alert("Successful Update");
          else alert("Unsuccessful Update");
        });
    }
    event.preventDefault();
  };

  const handleUploadImage = () => {
    // Assuming only image
    var file = inputRef.current.files[0];
    if (file != null) {
      var reader = new FileReader();
      var url = reader.readAsDataURL(file);

      reader.onloadend = function (e) {
        setSelectedFile(reader.result);
      };
    }
  };

  const runAI = () => {};

  const renderScoreBoard = (num) =>
    Array.from({ length: num }, (v, k) => k).map((k) => (
      <div style={style.scoreboardStyle} key={`math${k}-result`}>
        <input
          type="number"
          id={`home-score-${k}`}
          name={`home${k}`}
          min="0"
          value={score[`home${k}`] || 0}
          onChange={handleChange}
          style={style.scoreStyle}
        ></input>
        -
        <input
          type="number"
          id={`away-score-${k}`}
          name={`away${k}`}
          min="0"
          value={score[`away${k}`] || 0}
          onChange={handleChange}
          style={style.scoreStyle}
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
      <Row style={{ height: "400px" }}>
        <Col
          sm="3"
          style={{
            backgroundColor: "black",
            padding: "20px",
            margin: "20px",
            border: "10px solid green",
          }}
        >
          <Row>
            <form>
              <input
                ref={inputRef}
                type="file"
                name="user[image]"
                multiple="true"
                onChange={handleUploadImage}
              />
            </form>
          </Row>
          <Row>
            <form>
              <button onClick={runAI}>Run</button>
            </form>
          </Row>
        </Col>
        <Col
          sm="7"
          style={{
            backgroundColor: "green",
            padding: "20px",
            margin: "20px",
            display: "flex",
            justifyContent: "center",
            border: "10px solid black",
            maxHeight: "100%",
          }}
        >
          <img src={selectedFile} style={{ maxHeight: "300px" }} />
        </Col>
      </Row>
      <Row>
        <DragDropContext onDragEnd={onDragEnd}>
          <Col style={{ width: "30%" }}>
            <Droppable droppableId="allteams">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} style={getListStyle("teams")}>
                  <h1 style={style.hStyle}>TEAMS</h1>
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
                            style={style.imgStyle}
                          />
                          <span>{item.team_acronym_name}</span>
                          <span style={style.rankStyle}>{item.team_id}</span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Col>
          <Col style={{ width: "30%" }}>
            <Droppable droppableId="hometeams">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} style={getListStyle("home")}>
                  <h1 style={style.hStyle}>HOME</h1>
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
                            style={style.imgStyle}
                          />
                          <span>{item.team_acronym_name}</span>
                          <span style={style.rankStyle}>{item.team_id}</span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Col>
          <Col style={{ width: "10%" }}>
            <div style={style.boardStyle}>
              <h1 style={style.hStyle}>RESULT</h1>
              {
                <form onSubmit={handleSubmit}>
                  {renderScoreBoard(
                    home.length > away.length ? away.length : home.length
                  )}
                  <div style={style.scoreboardStyle}>
                    <input
                      type="submit"
                      value="Submit"
                      style={style.submitButton}
                    ></input>
                  </div>
                </form>
              }
            </div>
          </Col>
          <Col style={{ width: "30%" }}>
            <Droppable droppableId="awayteams">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} style={getListStyle("away")}>
                  <h1 style={style.hStyle}>AWAY</h1>
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
                            style={style.imgStyle}
                          />
                          <span>{item.team_acronym_name}</span>
                          <span style={style.rankStyle}>{item.team_id}</span>
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
