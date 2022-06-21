import React, { useEffect, useState } from "react";
import axios from "axios";
import StandingTable from "../resource/StandingTableComponent/StandingTable";
import { Container, Row, Col } from "reactstrap";

const LeagueTable = () => {
  const [teams, setTeams] = useState(null);

  useEffect(() => {
    async function fetchMyAPI() {
      document.getElementById("league_link").classList = "nav-link active";
      await axios
        .get(`/UnitedHome/league/table`)
        .then((res) => {
          setTeams(res.data);
        })
        .catch((err) => {
          alert(err);
        });
    }
    fetchMyAPI();
  }, []);

  return (
    <div id="club-table">
      {teams !== null && (
        <StandingTable teamlist={teams} title="league table"></StandingTable>
      )}
    </div>
  );
};

export default LeagueTable;
