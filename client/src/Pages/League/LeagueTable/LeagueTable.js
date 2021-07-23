import React from 'react';
import axios from 'axios';
import StandingTable from './resource/StandingTableComponent/StandingTable';
import { Container, Row, Col } from 'reactstrap';
import clubsMap from './resource/ClubsMap.png'
export default class LeagueTable extends React.Component{
  constructor() {
    super();
    this.state = {
      standingTable: null,
      eplLogoPic: null,
      eplMapsPic: null
    }
  }
  componentDidMount = () => {
    document.getElementById('league_link').classList='nav-link active'
    axios.get(`/UnitedHome/league/table`)
    .then(res => {
        console.log(res.data);
        this.setState({
          standingTable : <StandingTable teams={res.data} title='league table'></StandingTable>, 
          eplLogoPic: 'https://www.fifplay.com/img/public/premier-league-2-logo.png',
          eplMapsPic: clubsMap});
      })
    }
    
  render(){
      return(
        <div id = "info-table">
          <Container style={style.containter} fluid>
            <Row>
              <Col xs="12" sm="2" style={style.besideBanner}>
                <img  style={style.besideBannerStyle} src={this.state.eplLogoPic} alt='EPL Logo'></img>
              </Col>
              <Col xs="12" sm="8" style={style.scrollaleTable}><div id='club-table'>{this.state.standingTable}</div></Col>
              <Col xs="12" sm="2" style={style.besideBanner}>
                <img  style={style.besideBannerStyle} src={this.state.eplMapsPic} alt='Map of clubs'></img>
              </Col>
            </Row>
          </Container>
        </div>
      )
    }
};

const style ={
  besideBannerStyle: {
    width: "inherit",
  },
  containter: {
    position:"relative",
    width: "100%",
    backgroundColor: "#ffe"
  },
  scrollaleTable: {
    overflow: "scroll",
    height: "inherit"
  },
  besideBanner: {
    display: "flex",
    alignItems: "center",
  }
}
