import React, {useState, useEffect} from 'react'
import './player-table-style.css'
import axios from 'axios';

const PlayerTable = (props) => {
   const [players, setPlayers] = useState(props.players);
   const [title, setTitle] = useState(props.title);
   const [idDisplayed, setIdDisplayed] = useState(-1);

   const renderTableHeader = () =>{
      return (
         <tr>
            <th key={'player-header-0'}></th>
            <th key={'player-header-1'} style={{minWidth: '160px'}}>Name</th>
            <th key={'player-header-2'}>Nationality</th>
            <th key={'player-header-3'}>Birth</th>
            <th key={'player-header-4'}>Height</th>
            <th key={'player-header-5'} style={{minWidth: '120px'}}>Role</th>
            <th key={'player-header-6'}>Wage (Euro)</th>
            <th key={'player-header-7'}>Status</th>
         </tr>
      )
   };

   useEffect(() => {}, [])

   const renderTableData = ()  => {
      return players.map((player, index) => {
         var {id, name, nationality, birthday, height, role, salary, status } = player //destructuring
         return (
            <tr key={index + '-player'}>
               <td>
                     <i className='bx bxs-user-pin' onMouseOver={() => setIdDisplayed(id)}  onMouseOut={() => setIdDisplayed(0)}></i>
                     {(idDisplayed===id) && (<MiniTable playerID={id} position={title}></MiniTable>)}
               </td>
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

const MiniTable = (props) => {
   const [info, setInfo] = useState({});
   const [position, setPos] = useState(props.position);
   const [playerID, setPlayerID] = useState(props.playerID);
   
   useEffect(() => {
      function fetchMyAPI() {
         //await axios.get(`http://localhost:8000/UnitedHome/player/${position}/${playerID}`)
         axios.get(`http://localhost:8000/UnitedHome/player/${position}/${playerID}/`)
         .then( res => {
            setInfo(res.data);
         })
         .catch(err => {
            alert(err);
          });
      }
      fetchMyAPI();
   }, [position, playerID])

   return (
      <div style={{position: 'absolute', display: 'grid', minWidth: "400px"}}>
         <div style={{backgroundColor:'teal', fontSize:'20px', padding: '10px'}}>
            <b>{info.name}</b>
         </div>
         <div style={{backgroundColor:'azure', textAlign: 'left', padding: '10px', fontSize:'15px' }}>
            <div style={{padding: '10px'}}>
                  <b>Full name:    </b>{info.full_name}<br></br>
                  <b>Nationality:  </b>{info.nationality}<br></br>
                  <b>Birthday:     </b>{info.birthday}<br></br>
                  <b>Right foot:   </b>{info.right_foot ? "Right" : 'left'}<br></br>
                  <b>Number:       </b>{info.kit_number}<br></br>
                  <b>Height:       </b>{info.height}<br></br>
                  <b>Role:         </b>{info.role}<br></br>
                  <b>Salary:       </b>{info.salary}<br></br>
                  <b>Status:       </b>{info.status}<br></br>
            </div>
            <div>
               <img src={info.avatar_link} alt={info.name+'avatar'} height='220px'></img>
            </div>
         </div>
      </div>
   )
}

export default PlayerTable;
