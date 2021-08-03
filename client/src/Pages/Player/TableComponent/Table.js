import React, {useState} from 'react'
import './table-style.css'



const Table = (props) => {
   const [players, setPlayers] = useState(props.players);
   const [title, setTitle] = useState(props.title);

   const renderTableHeader = () =>{
      return (
       <tr>
          <th key={'player-header-1'}>Name</th>
          <th key={'player-header-2'}>Nationality</th>
          <th key={'player-header-3'}>Birth</th>
          <th key={'player-header-4'}>Height</th>
          <th key={'player-header-5'}>Role</th>
          <th key={'player-header-6'}>Wage (Euro)</th>
          <th key={'player-header-7'}>Status</th>
       </tr>
      )
   };

  const renderTableData = ()  => {
     return players.map((player, index) => {
        var {name, nationality, birthday, height, role, salary, status } = player //destructuring
        return (
           <tr key={index + '-player'}>
              <td>{name}</td>
              <td>{nationality}</td>
              <td>{birthday}</td>
              <td>{height}</td>
              <td>{role}</td>
              <td>{salary}</td>
              <td>{status}</td>
           </tr>
        )
     })
  };

   return (
      <div id="entire-table">
         <h1 id='title'><a href={`http://localhost:3000/players/${title}` }>{title.toUpperCase()}</a></h1>
         <div id="info-table">
            <table id='players'>
               <thead>{renderTableHeader()}</thead>
               <tbody>{renderTableData()}</tbody>
            </table>
         </div>
      </div>
   )
}
export default Table
