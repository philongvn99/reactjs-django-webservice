import React from 'react'
import axios from 'axios';
import Table from '../TableComponent/Table'
import { Container } from 'reactstrap';
export default class LeagueTable extends React.Component{
  constructor() {
    super();
    this.state = {
      players: [],
      playerTable: null,
      thumbnail_pic: null
    }
  }
  componentDidMount = () => {
    document.getElementById('league_link').classList='nav-link active'
    axios.get(`/UnitedHome/league/table`)
    .then(res => {
        console.log(res.data);
        this.setState({
          playerTable : <Table teams={res.data} title='league table'></Table>, 
          thumbnail_pic: 'https://www.sportsmax.tv/media/k2/items/cache/878777739252ea3eeb6a80c154ac05e3_XL.jpg'});
      })
    }
    
  render(){
      return(
        <div id = "info-table">
          <img style={style.thumbnail_style} src={this.state.thumbnail_pic} alt='ICON of this position'></img>
          <Container>
            <div id='player-table'>{this.state.playerTable}</div>
          </Container>
        </div>
      )
    }
};

const style ={
  thumbnail_style: {
    margin: 'auto',
    display: 'block',
    width: '100%'
  }
}
