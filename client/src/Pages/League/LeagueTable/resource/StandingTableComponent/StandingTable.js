import React from 'react'
import './standing-table-style.css'

class standingTable extends React.Component {
  constructor(props) {
     super(props)
     this.state = {
        teams: this.props.teams
     }
  }

  renderTableHeader() {
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

  renderTableData() {
     return this.state.teams.map((team, index) => {
        console.log(team)
        var {id, team_name, logo_link, played_game, won_game, drawn_game, lost_game, goal_for, goal_against, goal_difference, points } = team //destructuring
        console.log(team_name, logo_link)
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

  render() {
     return (
        <div id="entire-table">
           <table id='clubs'>
              <thead>{this.renderTableHeader()}</thead>
              <tbody>{this.renderTableData()}</tbody>
           </table>
        </div>
     )
  }
}
export default standingTable
