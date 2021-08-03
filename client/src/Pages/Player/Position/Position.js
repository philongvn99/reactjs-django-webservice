import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Table from '../TableComponent/Table'
import { Container, Row, Col } from 'reactstrap';

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
          setPlayerTable(<Table players={res.data} title={pos}></Table>); 
          setThumbnailLink(link);
        })
    }
    fetchMyAPI();
  },  [props])
    
  return(
    <Container id = "position-table">
        <Row xs="12">
              <img style={style.thumbnailStyle} src={thumbnailLink} alt='ICON of this position'></img>
        </Row>  
        <Row>
            <Col xs="2"></Col>
            <Col xs="8">
                <Row>
                    <div id='player-table'>{playerTable}</div>
                </Row>
                <Row>
                    <div style={{display: 'flex', alignItems:'center', height:'50px'}}>
                        <a style={{marginRight: '0'}} href={`http://localhost:3000/players/`} ><button className="btn btn-black my-2 my-sm-0 fas fa-arrow-alt-circle-left"> Players</button></a>
                        <a style={{margin: '10px'}} href={`http://localhost:3000/players/goalkeepers/`}><button style={{width: '120px'}} className="btn btn-dark my-2 my-sm-0">Goalkeepers</button></a>
                        <a style={{margin: '10px'}} href={`http://localhost:3000/players/defenders`}><button style={{width: '120px'}} className="btn btn-dark my-2 my-sm-0">Defenders</button></a>
                        <a style={{margin: '10px'}} href={`http://localhost:3000/players/midfielders`}><button style={{width: '120px'}} className="btn btn-dark my-2 my-sm-0">Midfielders</button></a>
                        <a style={{margin: '10px'}} href={`http://localhost:3000/players/forwards`}><button style={{width: '120px'}} className="btn btn-dark my-2 my-sm-0">Forwards</button></a>
                    </div>
                </Row>
            </Col>
            <Col xs="2"></Col>
        </Row>
    </Container>
  )
}

export default Position;

const style ={
  thumbnailStyle: {
    margin: 'auto',
    display: 'block',
    height: '450px'
  }
}
