import React, { useState, useId } from "react";
import "./player-table-style.css";

const PlayerTable = (props) => {
  const [idDisplayed, setIdDisplayed] = useState(-1);

  const renderTableHeader = () => {
    return (
      <tr>
        <th className="th-position" key={"player-header-0"}></th>
        <th className="th-position" key="player-header-name">
          Name
        </th>
        <th className="th-position" key="player-header-nationality">
          Nationality
        </th>
        <th className="th-position" key="player-header-birth">
          Birth
        </th>
        <th className="th-position" key="player-header-height">
          Height
        </th>
        <th className="th-position" key="player-header-role">
          Role
        </th>
        <th className="th-position" key="player-header-wage">
          Wage (Euro)
        </th>
        <th className="th-position" key="player-header-status">
          Status
        </th>
      </tr>
    );
  };

  const renderTableData = () => {
    return props.players.map((player, index) => {
      return (
        <tr key={index + "-player"}>
          <td className="td-position">
            <i
              className="fas fa-info"
              onMouseOver={() => setIdDisplayed(player.id)}
              onMouseOut={() => setIdDisplayed("22")}
            ></i>
          </td>
          <td className="td-position">
            {player.name}
            {idDisplayed === player.id && (
              <MiniTable playerInfo={player}></MiniTable>
            )}
          </td>
          <td className="td-position"> {player.nationality}</td>
          <td className="td-position"> {player.birthday}</td>
          <td className="td-position"> {player.height}</td>
          <td className="td-position"> {player.role}</td>
          <td className="td-position"> {player.salary}</td>
          <td className="td-position"> {player.status}</td>
        </tr>
      );
    });
  };

  return (
    <div className="entire-table">
      <p className="position-title">
        <a href={`http://localhost:3000/players/${props.title}`}>
          {(props.title + "s").toUpperCase()}
        </a>
      </p>
      <div className="info-table">
        <table className="players">
          <thead>{renderTableHeader()}</thead>
          <tbody>{renderTableData()}</tbody>
        </table>
      </div>
    </div>
  );
};

const MiniTable = (props) => {
  const miniTableId = useId();
  return (
    <div className="mini-table" id={miniTableId}>
      <div>
        <strong>{props.playerInfo.name}</strong>
      </div>
      <div className="mini-table-content">
        <ul className="mini-table-info" style={{ listStyleType: "none" }}>
          <li>
            <strong>Full name: </strong>
            <span>{props.playerInfo.full_name}</span>
          </li>
          <li>
            <strong>Nationality: </strong>
            <span>{props.playerInfo.nationality}</span>
          </li>
          <li>
            <strong>Birthday: </strong>
            <span>{props.playerInfo.birthday}</span>
          </li>
          <li>
            <strong>Right foot: </strong>
            <span>{props.playerInfo.right_foot ? "Right" : "left"}</span>
          </li>
          <li>
            <strong>Number: </strong>
            <span>{props.playerInfo.kit_number}</span>
          </li>
          <li>
            <strong>Height: </strong>
            <span>{props.playerInfo.height}</span>
          </li>
          <li>
            <strong>Role: </strong>
            <span>{props.playerInfo.role}</span>
          </li>
          <li>
            <strong>Salary: </strong>
            <span>{props.playerInfo.salary}</span>
          </li>
          <li>
            <strong>Status: </strong>
            <span>{props.playerInfo.status}</span>
          </li>
        </ul>
        <div>
          <img
            src={props.playerInfo.avatar_link}
            alt={props.playerInfo.name + "avatar"}
            height="220px"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default PlayerTable;
