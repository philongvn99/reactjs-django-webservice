import React, {useState, useEffect} from 'react'
import './standing-table-style.css'

const StandingTable = (props) => {
   const [teamList, setTeamList] = useState([]);
   const [profileState, setProfileState] = useState(props);

   useEffect(() => {
      setProfileState(props);
      setTeamList(profileState.teamlist)
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
        var {id, team_name, logo_link, played_game, won_game, drawn_game, lost_game, goal_for, goal_against, goal_difference, points } = team //destructuring
        return (
           <tr key={id}>
              <td>{index + 1}</td>
              <td><div><img src={logo_link} alt={team_name + 'logo'}/>  {team_name}</div></td>
              <td>{played_game}</td>
              <td>{won_game}</td>
              <td>{drawn_game}</td>
              <td>{lost_game}</td>
              <td>{goal_for}</td>
              <td>{goal_against}</td>
              <td>{goal_difference}</td>
              <td>{points}</td>
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
