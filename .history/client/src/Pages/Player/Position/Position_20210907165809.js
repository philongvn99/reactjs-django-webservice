import React, {useState, useEffect} from 'react'
import axios from 'axios';
import PlayerTable from '../resource/TableComponent/PlayerTable'
import { Container, Row, Col } from 'reactstrap';
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
          let link = null
          switch(pos) {
            case 'goalkeepers': 
              link = "https://i.dailymail.co.uk/i/pix/2011/01/27/article-1350987-01565DC100000578-168_634x358.jpg";
              break;
            case 'defenders': 
              link = "https://i.pinimg.com/564x/17/6c/82/176c82250b3d28dcfb29d6e9654473a2.jpg";
              break;
            case 'midfielders': 
              link = "https://i.pinimg.com/564x/c7/7b/43/c77b43e265266c34817f1003946a83a8.jpg";
              break;
            default: 
              link = "https://i.pinimg.com/564x/55/64/c6/5564c698148d68cb710abdbef7beeb00.jpg";
              break;
          }
          setPlayerTable(<PlayerTable players={res.data} title={pos}></PlayerTable>); 
          setThumbnailLink(link);
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
