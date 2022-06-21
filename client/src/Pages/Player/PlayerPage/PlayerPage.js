import React, { useState, useEffect } from "react";
import { Container, Row } from "reactstrap";
import axios from "axios";
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
      await axios
        .get(`/UnitedHome/player/`)
        .then((res) => {
          setGoalkeeperData(res.data.goalkeepers);
          setDefenderData(res.data.defenders);
          setMidfielderData(res.data.midfielders);
          setForwardData(res.data.forwards);
        })
        .catch((err) => {
          alert(err);
        });
    }
    fetchMyAPI();
  }, []);

  return (
    <Container id="position-table" style={styles.Content}>
      <Row id="goalkeeper-table">
        {goalkeeperData !== null && (
          <PlayerTable
            players={goalkeeperData}
            title="goalkeepers"
          ></PlayerTable>
        )}
      </Row>
      <Row id="defender-table">
        {defenderData !== null && (
          <PlayerTable players={defenderData} title="defenders"></PlayerTable>
        )}
      </Row>
      <Row id="midfielder-table">
        {midfielderData !== null && (
          <PlayerTable
            players={midfielderData}
            title="midfielders"
          ></PlayerTable>
        )}
      </Row>
      <Row id="forward-table">
        {forwardData !== null && (
          <PlayerTable players={forwardData} title="forwards"></PlayerTable>
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
