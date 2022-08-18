import React, { useState, useEffect } from "react";
import { Container, Row } from "reactstrap";
import PlayerTable from "../resource/TableComponent/PlayerTable";

const PlayerPage = () => {
  const [goalkeeperData, setGoalkeeperData] = useState(null);
  const [defenderData, setDefenderData] = useState(null);
  const [midfielderData, setMidfielderData] = useState(null);
  const [forwardData, setForwardData] = useState(null);

  useEffect(() => {
    async function fetchMyAPI() {
      document.getElementById("player_link").classList =
        "nav-link active dropbtn";
      document.getElementById("player_indicator").classList =
        "menu-item active";

      let players = JSON.parse(await sessionStorage.getItem("players"));
      setGoalkeeperData(players.goalkeeper);
      setDefenderData(players.defender);
      setMidfielderData(players.midfielder);
      setForwardData(players.forward);
    }
    fetchMyAPI();
  }, []);

  return (
    <Container id="position-table" style={styles.Content}>
      <Row id="goalkeeper-table">
        {goalkeeperData !== null && (
          <PlayerTable
            players={goalkeeperData}
            title="goalkeeper"
          ></PlayerTable>
        )}
      </Row>
      <Row id="defender-table">
        {defenderData !== null && (
          <PlayerTable players={defenderData} title="defender"></PlayerTable>
        )}
      </Row>
      <Row id="midfielder-table">
        {midfielderData !== null && (
          <PlayerTable
            players={midfielderData}
            title="midfielder"
          ></PlayerTable>
        )}
      </Row>
      <Row id="forward-table">
        {forwardData !== null && (
          <PlayerTable players={forwardData} title="forward"></PlayerTable>
        )}
      </Row>
    </Container>
  );
};
export default PlayerPage;

const styles = {
  Content: {
    textAlign: "center",
    justifyContent: "center",
  },
};
