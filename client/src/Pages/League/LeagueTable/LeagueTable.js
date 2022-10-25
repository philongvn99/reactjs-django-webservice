import React, { useEffect, useState } from "react";
import axiosInstance from "../../../config/axiosConfig";
import CustomSelector from "../../../Component/CustomSelector/CustomSelector";
import "./league-table-style.css";

const StandingTable = (props) => {
  const [teamList, setTeamList] = useState([]);

  useEffect(() => {
    setTeamList(props.teamlist);
  }, [props]);

  const renderTableHeader = () => {
    return (
      <tr>
        <th key={1}>Pos</th>
        <th key={2}>Club</th>
        <th key={3}>Pld</th>
        <th key={4}>W</th>
        <th key={5}>D</th>
        <th key={6}>L</th>
        <th key={7}>GF</th>
        <th key={8}>GA</th>
        <th key={9}>GD</th>
        <th key={10}>Pts</th>
      </tr>
    );
  };

  const renderTableData = () => {
    return teamList.map((team, index) => {
      let {
        team_id,
        team_name,
        team_logo_link,
        team_played_game,
        team_won_game,
        team_drawn_game,
        team_lost_game,
        team_goal_for,
        team_goal_against,
        team_goal_difference,
        team_points,
      } = team; //destructuring
      return (
        <tr key={team_id}>
          <td>{index + 1}</td>
          <td>
            <div>
              <img
                src={team_logo_link}
                alt={team_name + "logo"}
                className="logo"
              />{" "}
              {team_name}
            </div>
          </td>
          <td>{team_played_game}</td>
          <td>{team_won_game}</td>
          <td>{team_drawn_game}</td>
          <td>{team_lost_game}</td>
          <td>{team_goal_for}</td>
          <td>{team_goal_against}</td>
          <td>{team_goal_difference}</td>
          <td>{team_points}</td>
        </tr>
      );
    });
  };

  return (
    <div id="entire-table">
      <table id="clubs">
        <thead>{renderTableHeader()}</thead>
        <tbody>{renderTableData()}</tbody>
      </table>
    </div>
  );
};

const LeagueTable = () => {
  const [teams, setTeams] = useState(null);

  async function fetchMyAPI(season = 2023) {
    await axiosInstance
      .getLeagueTable(season)
      .then((res) => {
        setTeams(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.reload();
        } else alert(err);
      });
  }

  useEffect(() => {
    document.getElementById("league_link").classList = "nav-link active";
    document.getElementById("league_indicator").classList = "menu-item active";

    fetchMyAPI();
  }, []);

  return (
    teams !== null && (
      <div style={{ margin: "1vw 0px", justifyContent: "space-between" }}>
        <CustomSelector
          options={[
            { value: "2022", label: "2022", logo: null },
            { value: "2023", label: "2023", logo: null },
          ]}
          defaultValue={{ value: "2023", label: "2023", logo: null }}
          onChange={(e) => fetchMyAPI(e.value)}
          placeholder="Round"
        ></CustomSelector>
        <StandingTable teamlist={teams} title="league table"></StandingTable>
      </div>
    )
  );
};

export default LeagueTable;
