import React from 'react'
import './table-style.css'

class Table extends React.Component {
  constructor(props) {
     super(props)
     this.state = {
        teams: this.props.teams
     }
  }

  renderTableHeader() {
   //   let header = Object.keys(this.state.teams[0])
   //   return header.map((key, index) => {
   //      return index > 0 ? <th key={index}>{key.toUpperCase()}</th> : null
   //   })
   return (
      <tr>
         <th key={1}>Position</th>
         <th key={2}>Club</th>
         <th key={3}>Played</th>
         <th key={4}>Won</th>
         <th key={5}>Drawn</th>
         <th key={6}>Lost</th>
         <th key={7}>GF</th>
         <th key={8}>GA</th>
         <th key={9}>GD</th>
         <th key={10}>Points</th>
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
           <h1 id='title'><a href={`http://localhost:3000/clubs/${this.props.title}` }>{this.props.title.toUpperCase()}</a></h1>
           <table id='clubs'>
              <thead>{this.renderTableHeader()}</thead>
              <tbody>{this.renderTableData()}</tbody>
           </table>
        </div>
     )
  }
}
export default Table
