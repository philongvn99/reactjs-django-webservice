import React, { useState, useEffect } from "react";
import axios from "axios";
import PlayerTable from "../resource/TableComponent/PlayerTable";
import { Container, Row, Col } from "reactstrap";
import { fireDatabase } from "../../../config/firebaseConfig";
import "./position-style.css";

const Position = (props) => {
  const [playerTable, setPlayerTable] = useState(null);
  const [thumbnailLink, setThumbnailLink] = useState(null);

  useEffect(() => {
    document.getElementById("player_link").classList = "nav-link active";

    const { pos } = props.match.params;

    async function fetchMyAPI() {
      axios.get(`/UnitedHome/player/${pos}`).then((res) => {
        fireDatabase.ref(`/player-table/${pos}`).on(
          "value",
          (snapshot) => {
            setThumbnailLink(snapshot.val());
          },
          (errorObject) => {
            console.log("The read failed: " + errorObject.name);
          }
        );

        setPlayerTable(
          <PlayerTable players={res.data} title={pos}></PlayerTable>
        );
      });
    }
    fetchMyAPI();
  }, [props]);

  return (
    <Container className="position-table">
      <Row xs="12">
        <img
          className="position-thumbnail"
          src={thumbnailLink}
          alt="ICON of this position"
        ></img>
      </Row>
      <Row>{playerTable}</Row>
      <Row>
        <div style={{ display: "flex", alignItems: "center", height: "50px" }}>
          <a
            className="position-link"
            href={`http://localhost:3000/players/`}
            title="player-button"
          >
            <button
              className="btn btn-black my-2 my-sm-0 fas fa-tshirt"
              title="player-button"
              aria-hidden="false"
            />
          </a>
          <a
            className="position-link"
            href={`http://localhost:3000/players/goalkeepers/`}
            title="goalkeeper-button"
          >
            <button
              className="position-button btn btn-dark my-2 my-sm-0 fas fa-hand-paper"
              title="goalkeeper-button"
              aria-hidden="false"
            />
          </a>
          <a
            className="position-link"
            href={`http://localhost:3000/players/defenders`}
            title="defender-button"
          >
            <button
              className="position-button btn btn-dark my-2 my-sm-0 fas fa-shield-alt"
              title="defender-button"
              aria-hidden="false"
            />
          </a>
          <a
            className="position-link"
            href={`http://localhost:3000/players/midfielders`}
            title="midfielder-button"
          >
            <button
              className="position-button btn btn-dark my-2 my-sm-0 fas fa-radiation"
              title="midfielder-button"
              aria-hidden="false"
            />
          </a>
          <a
            className="position-link"
            href={`http://localhost:3000/players/forwards`}
            title="forward-button"
          >
            <button
              className="position-button btn btn-dark my-2 my-sm-0 fas fa-bolt"
              title="forward-button"
              aria-hidden="false"
            />
          </a>
        </div>
      </Row>
    </Container>
  );
};

export default Position;
