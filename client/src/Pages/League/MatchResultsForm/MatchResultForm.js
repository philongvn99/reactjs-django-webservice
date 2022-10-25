import React, { useState, useRef } from "react";
import CustomSelector from "../../../Component/CustomSelector/CustomSelector";
import LineupSelector from "./LineupSelector/LineupSelector";
import { Leagues, Round } from "./data";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./match-result-form-styles.scss";

const MatchResultForm = (props) => {
  const [Players] = useState(JSON.parse(sessionStorage.getItem("players")));
  const [league, setLeague] = useState(null);
  const [round, setRound] = useState(null);
  const [home, setHome] = useState(true);

  const dateRef = useRef();
  const stadiumRef = useRef();

  console.log(league);

  return (
    <div className="match-form-background">
      <div className="match-event-info">
        <div className="match-selection">
          <input type="date" placeholder="League" ref={dateRef}></input>
        </div>
        <div className="match-selection league">
          <CustomSelector
            options={Leagues}
            onChange={(e) => setLeague(e)}
            value={league}
            placeholder="League Option"
          ></CustomSelector>
        </div>
        <div className="match-selection round">
          {league &&
            (league.value === "EPL" ? (
              <input
                type="number"
                placeholder="Matchday"
                min="1"
                max="38"
              ></input>
            ) : (
              <CustomSelector
                options={Round[league.value].round.map((e) => {
                  return {
                    value: e,
                    label: e,
                    logo: null,
                  };
                })}
                onChange={(e) => setRound(e)}
                placeholder="Round"
              ></CustomSelector>
            ))}
        </div>
        <div className="match-selection">
          <input
            type="button"
            onClick={() => setHome((h) => !h)}
            value={home ? "HOME" : "AWAY"}
          ></input>
        </div>
        <div className="match-selection">
          <input ref={stadiumRef} type="text" placeholder="Stadium"></input>
          <button
            onClick={() =>
              console.log(
                dateRef.current.value,
                league.value,
                round.value,
                home.value,
                stadiumRef.current.value
              )
            }
          ></button>
        </div>
      </div>
      <div className="match-event-detail">
        <div className="lineup">
          <LineupSelector
            options={Object.values(Players).map((x) =>
              x
                .filter((p) => p.status === "ACTIVE")
                .map((g) => ({
                  label: g.name,
                  value: g.name,
                  no: g.kit_number,
                }))
            )}
          ></LineupSelector>
        </div>
      </div>
    </div>
  );
};

export default MatchResultForm;
