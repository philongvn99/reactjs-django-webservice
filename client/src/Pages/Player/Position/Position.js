import React, { useState, useEffect } from "react";
import PlayerTable from "../resource/TableComponent/PlayerTable";
import { Container, Row } from "reactstrap";
import { fireDatabase } from "../../../config/firebaseConfig";
import "./position-style.css";

const Position = (props) => {
  const [playerTable, setPlayerTable] = useState(null);
  const [thumbnailLink, setThumbnailLink] = useState(null);

  useEffect(() => {
    document.getElementById("player_link").classList = "nav-link active";

    const { pos } = props.match.params;

    async function fetchMyAPI() {
      fireDatabase.ref(`/player-table/${pos + "s"}`).on(
        "value",
        (snapshot) => {
          setThumbnailLink(snapshot.val());
        },
        (errorObject) => {
          console.log("The read failed: " + errorObject.name);
        }
      );

      setPlayerTable(
        <PlayerTable
          players={JSON.parse(sessionStorage.getItem("players"))[pos]}
          title={pos}
        ></PlayerTable>
      );
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
            href={`http://localhost:3000/players/goalkeeper`}
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
            href={`http://localhost:3000/players/defender`}
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
            href={`http://localhost:3000/players/midfielder`}
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
            href={`http://localhost:3000/players/forward`}
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
