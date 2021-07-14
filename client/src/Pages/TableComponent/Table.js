import React from 'react'
import { Redirect } from 'react-router-dom'
import './table-style.css'

class Table extends React.Component {
  constructor(props) {
     super(props)
     this.state = {
        players: this.props.players
     }
  }

  renderTableHeader() {
     let header = Object.keys(this.state.players[0])
     return header.map((key, index) => {
        return index > 0 ? <th key={index}>{key.toUpperCase()}</th> : null
     })
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
              <td>{main_position.toString()}</td>
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
           <table id='players'>
              <thead><tr>{this.renderTableHeader()}</tr></thead>
              <tbody>{this.renderTableData()}</tbody>
           </table>
        </div>
     )
  }
}
export default Table
