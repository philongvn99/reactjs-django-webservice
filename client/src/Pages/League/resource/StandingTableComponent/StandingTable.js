import React, {useState, useEffect} from 'react'
import './standing-table-style.css'

const StandingTable = (props) => {
   const [teamList, setTeamList] = useState([]);

   useEffect(() => {
      setTeamList(props.teamlist)
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
         
      )
   }

   const renderTableData = () => {
     return teamList.map((team, index) => {
        var {team_id, team_name, team_logo_link, team_played_game, team_won_game, team_drawn_game, team_lost_game, team_goal_for, team_goal_against, team_goal_difference, team_points } = team //destructuring
        return (
           <tr key={team_id}>
              <td>{index + 1}</td>
              <td><div><img src={team_logo_link} alt={team_name + 'logo'} className="logo"/>  {team_name}</div></td>
              <td>{team_played_game}</td>
              <td>{team_won_game}</td>
              <td>{team_drawn_game}</td>
              <td>{team_lost_game}</td>
              <td>{team_goal_for}</td>
              <td>{team_goal_against}</td>
              <td>{team_goal_difference}</td>
              <td>{team_points}</td>
           </tr>
        )
     })
  }

   return (
      <div id="entire-table">
         <table id='clubs'>
            <thead>{renderTableHeader()}</thead>
            <tbody>{renderTableData()}</tbody>
         </table>
      </div>
   )
}
export default StandingTable
