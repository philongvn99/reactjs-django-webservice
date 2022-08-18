import React, { useState, useEffect, useRef, useId } from "react";
import CustomSelector from "./CustomSelector/CustomSelector";
import LineupSelector from "./LineupSelector/LineupSelector";
import { Leagues, Round } from "./data";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./match-result-form-styles.scss";

const MatchResultForm = (props) => {
  const [Players] = useState(JSON.parse(sessionStorage.getItem("players")));
  const [league, setLeague] = useState(null);
  const [round, setRound] = useState();
  const [home, setHome] = useState({ value: true, label: "Home", logo: null });
  const [stadium, setStadium] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="match-form-background">
      <div className="match-event-info">
        <div className="match-selection">
          <input
            type="date"
            placeholder="League"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></input>
        </div>
        <div className="match-selection league">
          <CustomSelector
            options={Leagues}
            onChange={(e) => {
              setLeague(e);
            }}
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
          <CustomSelector
            options={[
              { value: true, label: "Home", logo: null },
              { value: false, label: "Away", logo: null },
            ]}
            defaultValue={{ value: true, label: "Home", logo: null }}
            onChange={(e) => setHome(e.value)}
            placeholder="Home/Away"
          ></CustomSelector>
        </div>
        <div className="match-selection">
          <input
            type="text"
            placeholder="Stadium"
            value={stadium}
            onChange={(e) => {
              setStadium(e.target.value);
            }}
          ></input>
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
