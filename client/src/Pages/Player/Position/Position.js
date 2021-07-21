import React from 'react'
import axios from 'axios';
import Table from '../TableComponent/Table'
import { Container } from 'reactstrap';
export default class Position extends React.Component{
  constructor() {
    super();
    this.state = {
      players: [],
      playerTable: null,
      thumbnail_pic: null
    }
  }
  componentDidMount = () => {
    document.getElementById('player_link').classList='nav-link active'
    const {pos} = this.props.match.params
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
        this.setState({
          playerTable : <Table players={res.data} title={pos}></Table>, 
          thumbnail_pic: link});
      })
    }
    
  render(){
      return(
        <div id = "info-table">
          <img style={style.thumbnail_style} src={this.state.thumbnail_pic} alt='ICON of this position'></img>
          <Container>
            <div id='player-table'>{this.state.playerTable}</div>
            <div style={{display: 'flex', alignItems:'center', height:'50px'}}>
              <a style={{marginRight: '20px'}} href={`http://localhost:3000/players/`} ><button class="btn btn-black my-2 my-sm-0 fas fa-arrow-alt-circle-left"> Players</button></a>
              <a style={{margin: '10px'}} href={`http://localhost:3000/players/goalkeepers/`}><button style={{width: '120px'}} class="btn btn-dark my-2 my-sm-0">Goalkeepers</button></a>
              <a style={{margin: '10px'}} href={`http://localhost:3000/players/defenders`}><button style={{width: '120px'}} class="btn btn-dark my-2 my-sm-0">Defenders</button></a>
              <a style={{margin: '10px'}} href={`http://localhost:3000/players/midfielders`}><button style={{width: '120px'}} class="btn btn-dark my-2 my-sm-0">Midfielders</button></a>
              <a style={{margin: '10px'}} href={`http://localhost:3000/players/forwards`}><button style={{width: '120px'}} class="btn btn-dark my-2 my-sm-0">Forwards</button></a>
            </div>
          </Container>
        </div>
      )
    }
};

const style ={
  thumbnail_style: {
    margin: 'auto',
    display: 'block',
    height: '450px'
  }
}
