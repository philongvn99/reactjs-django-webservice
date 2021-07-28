import React from 'react'
import './table-style.css'

class Table extends React.Component {
  constructor(props) {
     super(props)
     this.state = {
        players: this.props.players
     }
  }

  renderTableHeader() {
        return (
         <tr>
            <th key={1}>Name</th>
            <th key={2}>Nationality</th>
            <th key={3}>Birth</th>
            <th key={4}>Foot</th>
            <th key={5}>Num</th>
            <th key={6}>Height</th>
            <th key={7}>Pos</th>
            <th key={8}>Role</th>
            <th key={9}>Wage (Euro)</th>
            <th key={10}>Status</th>
         </tr>
        )
  }

  renderTableData() {
     return this.state.players.map((player, index) => {
        var {id, name, nationality, birthday, right_foot, kit_number, height, main_position, role, salary, status } = player //destructuring
        return (
           <tr key={id}>
              <td>{name}</td>
              <td>{nationality}</td>
              <td>{birthday}</td>
              <td>{right_foot ? 'right' : 'left'}</td>
              <td>{kit_number}</td>
              <td>{height}</td>
              <td>{main_position.toString().replace(',', ', ')}</td>
              <td>{role}</td>
              <td>{salary}</td>
              <td>{status}</td>
           </tr>
        )
     })
  }

   render() {
      return (
         <div id="entire-table">
            <h1 id='title'><a href={`http://localhost:3000/players/${this.props.title}` }>{this.props.title.toUpperCase()}</a></h1>
            <div id="info-table">
               <table id='players'>
                  <thead>{this.renderTableHeader()}</thead>
                  <tbody>{this.renderTableData()}</tbody>
               </table>
            </div>
         </div>
      )
   }
}
export default Table
