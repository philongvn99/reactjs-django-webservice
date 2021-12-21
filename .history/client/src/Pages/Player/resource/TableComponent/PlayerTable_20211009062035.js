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
            <th className="th-position" key={'player-header-0'}></th>
            <th className="th-position" key={'player-header-1'} style={{minWidth: '200px'}}>Name</th>
            <th className="th-position" key={'player-header-2'} style={{minWidth: '150px'}}>Nationality</th>
            <th className="th-position" key={'player-header-3'} style={{minWidth: '150px'}}>Birth</th>
            <th className="th-position" key={'player-header-4'}>Height</th>
            <th className="th-position" key={'player-header-5'} style={{minWidth: '150px'}}>Role</th>
            <th className="th-position" key={'player-header-6'}>Wage (Euro)</th>
            <th className="th-position" key={'player-header-7'}>Status</th>
         </tr>
      )
   };

   useEffect(() => {}, [])

   const renderTableData = ()  => {
      return players.map((player, index) => {
         var {id, name, nationality, birthday, height, role, salary, status } = player //destructuring
         return (
            <tr key={index + '-player'}>
               <td className="td-position"> 
                     <i className='bx bxs-user-pin' onMouseOver={() => setIdDisplayed(id)}  onMouseOut={() => setIdDisplayed(0)}></i>
                     {(idDisplayed===id) && (<MiniTable playerID={id} position={title}></MiniTable>)}
               </td>
               <td className="td-position"> {name}</td>
               <td className="td-position"> {nationality}</td>
               <td className="td-position"> {birthday}</td>
               <td className="td-position"> {height}</td>
               <td className="td-position"> {role}</td>
               <td className="td-position"> {salary}</td>
               <td className="td-position"> {status}</td>
            </tr>
         )
      })
   };

   return (
      <div className="entire-table">
         <h1 className='title'><a href={`http://localhost:3000/players/${title}` }>{title.toUpperCase()}</a></h1>
         <div className="info-table">
            <table className='players'>
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
      let unmounted = false;
      function fetchMyAPI() {
         axios.get(`/UnitedHome/player/${position}/${playerID}/`)
         .then( res => {
               if(!unmounted) setInfo(res.data);
            })
         .catch(err => {
            alert(err);
         });
      }
      fetchMyAPI();
      return () => { unmounted = true };
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
