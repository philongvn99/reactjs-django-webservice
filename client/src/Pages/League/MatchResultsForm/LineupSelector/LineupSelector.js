import React, { useState } from "react";
import Select from "react-select";
import "./lineup-selector-styles.scss";
import { lineup } from "../data";

const LineupSelector = (props) => {
  const [goalkeeper, setGoalkeeper] = useState([]);
  const [defenders, setDefenders] = useState([]);
  const [midfielders, setMidfielders] = useState([]);
  const [forwards, setForwards] = useState([]);

  const customStyles = (color) => ({
    control: (styles) => ({
      ...styles,
      backgroundColor: "rgba(155,155, 155, 0.4)",
      marginTop: "10px",
      borderRadius: "10px",
      border: `${color} 1px solid`,
    }),
    menu: (styles) => ({
      ...styles,
      marginTop: 0,
    }),
    option: (styles, { isDisabled }) => {
      return {
        ...styles,
        backgroundColor: "white",
        color: color,
        cursor: isDisabled ? "not-allowed" : "default",
      };
    },
    multiValueLabel: (styles) => {
      return {
        ...styles,
        width: "10vw",
      };
    },
    multiValueRemove: (styles) => ({
      ...styles,
      backgroundColor: color,
    }),
  });

  const formatOptionLabel = ({ value, label, no }) => (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>{label}</div>
      <div style={{ marginLeft: "10px", color: "#ccc" }}>{no}</div>
    </div>
  );

  return (
    <>
      <div className="playground">
        <div className="inside-playground">
          <div className="position-area">
            {forwards.map(({ value, label, no }) => (
              <div className="player-circle" key={value}>
                {no}
              </div>
            ))}
          </div>
          <div className="position-area">
            {midfielders.map(({ value, label, no }) => (
              <div className="player-circle" key={value}>
                {no}
              </div>
            ))}
          </div>
          <div className="position-area">
            {defenders.map(({ value, label, no }) => (
              <div className="player-circle" key={value}>
                {no}
              </div>
            ))}
          </div>
          <div className="position-area">
            {goalkeeper[0] && (
              <div className="player-circle">{goalkeeper[0].no}</div>
            )}
          </div>
          <Select
            placeholder={"Lineup..."}
            className="lineup-selection"
            options={lineup}
            styles={{
              control: (styles) => ({
                ...styles,
                backgroundColor: "rgba(255,255, 255, 0.8)",
                borderRadius: "10px",
                margin: "0px",
                border: `red 1px solid`,
              }),
            }}
          ></Select>
          <div className="line">
            <div className="circle"></div>
          </div>
        </div>
      </div>
      <div className="players">
        <Select
          value={forwards}
          placeholder={"Forwards..."}
          options={props.options[3]}
          styles={customStyles("red")}
          onChange={(options) => setForwards(options)}
          isOptionDisabled={() =>
            defenders.length + midfielders.length + forwards.length >= 10
          }
          formatOptionLabel={formatOptionLabel}
          closeMenuOnSelect={false}
          isMulti
        ></Select>
        <Select
          value={midfielders}
          placeholder={"Midfielders..."}
          options={props.options[2]}
          styles={customStyles("blue")}
          onChange={(options) => setMidfielders(options)}
          isOptionDisabled={() =>
            defenders.length + midfielders.length + forwards.length >= 10
          }
          formatOptionLabel={formatOptionLabel}
          closeMenuOnSelect={false}
          isMulti
        ></Select>
        <Select
          value={defenders}
          placeholder={"Defenders..."}
          options={props.options[1]}
          styles={customStyles("green")}
          onChange={(options) => setDefenders(options)}
          isOptionDisabled={() =>
            defenders.length + midfielders.length + forwards.length >= 10
          }
          formatOptionLabel={formatOptionLabel}
          closeMenuOnSelect={false}
          isMulti
        ></Select>

        <Select
          value={goalkeeper}
          placeholder={"Goalkeeper..."}
          options={props.options[0]}
          styles={customStyles("orange")}
          onChange={(options) => setGoalkeeper(options)}
          isOptionDisabled={() => goalkeeper.length >= 1}
          formatOptionLabel={formatOptionLabel}
          isMulti
        ></Select>
      </div>
    </>
  );
};

export default LineupSelector;
