import React, { useState, useEffect } from "react";
import { Container, Row } from "reactstrap";
import PlayerTable from "../resource/TableComponent/PlayerTable";

const PlayerPage = () => {
  const [players, setPlayers] = useState(
    JSON.parse(sessionStorage.getItem("players"))
  );

  useEffect(() => {
    async function fetchMyAPI() {
      document.getElementById("player_link").classList =
        "nav-link active dropbtn";
      document.getElementById("player_indicator").classList =
        "menu-item active";
    }
    fetchMyAPI();
  }, []);

  return (
    players && (
      <Container id="position-table" style={styles.Content}>
        <Row id="goalkeeper-table">
          <PlayerTable
            players={players.goalkeeper}
            title="goalkeeper"
          ></PlayerTable>
        </Row>
        <Row id="defender-table">
          <PlayerTable
            players={players.defender}
            title="defender"
          ></PlayerTable>
        </Row>
        <Row id="midfielder-table">
          <PlayerTable
            players={players.midfielder}
            title="midfielder"
          ></PlayerTable>
        </Row>
        <Row id="forward-table">
          <PlayerTable players={players.forward} title="forward"></PlayerTable>
        </Row>
      </Container>
    )
  );
};
export default PlayerPage;

const styles = {
  Content: {
    textAlign: "center",
    justifyContent: "center",
  },
};
