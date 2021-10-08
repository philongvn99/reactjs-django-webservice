import React, {useState, useEffect} from 'react'
import axios from 'axios';
import PlayerTable from '../resource/TableComponent/PlayerTable'
import { Container, Row, Col } from 'reactstrap';
import {fireDatabase} from "../../config/firebaseConfig";
import './position-style.css'

const Position = (props) => {
  const [playerTable, setPlayerTable] = useState(null);
  const [thumbnailLink, setThumbnailLink] = useState(null);

  

  useEffect(() => {

    document.getElementById('player_link').classList='nav-link active'

    const {pos} = props.match.params;

    async function fetchMyAPI() {  
      axios.get(`/UnitedHome/player/${pos}`)
      .then(res => {
          
          fireDatabase.ref(`/player-table/${pos}`)
            .on('value', snapshot => {
                setThumbnailLink(snapshot.val());
            }, (errorObject) => {
                console.log('The read failed: ' + errorObject.name);
            })

          setPlayerTable(<PlayerTable players={res.data} title={pos}></PlayerTable>); 
        })
    }
    fetchMyAPI();
  },  [props])
    
  return(
    <Container className = "position-table">
        <Row xs="12">
              <img className="position-thumbnail" src={thumbnailLink} alt='ICON of this position'></img>
        </Row>  
        <Row>
            <Col>
                <Row>
                    <div className='player-table'>{playerTable}</div>
                </Row>
                <Row>
                    <div style={{display: 'flex', alignItems:'center', height:'50px'}}>
                        <a className="position-link" href={`http://localhost:3000/players/`} ><button className="btn btn-black my-2 my-sm-0 fas fa-tshirt"></button></a>
                        <a className="position-link" href={`http://localhost:3000/players/goalkeepers/`}><button className="position-button btn btn-dark my-2 my-sm-0 fas fa-hand-paper"></button></a>
                        <a className="position-link" href={`http://localhost:3000/players/defenders`}><button className="position-button btn btn-dark my-2 my-sm-0 fas fa-shield-alt"></button></a>
                        <a className="position-link" href={`http://localhost:3000/players/midfielders`}><button className="position-button btn btn-dark my-2 my-sm-0 fas fa-radiation"></button></a>
                        <a className="position-link" href={`http://localhost:3000/players/forwards`}><button className="position-button btn btn-dark my-2 my-sm-0 fas fa-bolt"></button></a>
                    </div>
                </Row>
            </Col>
        </Row>
    </Container>
  )
}

export default Position;
