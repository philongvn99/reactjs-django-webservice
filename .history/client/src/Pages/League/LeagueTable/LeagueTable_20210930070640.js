import React, {useEffect, useState} from 'react';
import axios from 'axios';
import StandingTable from '../resource/StandingTableComponent/StandingTable';
import { Container, Row, Col } from 'reactstrap';
import clubsMap from '../resource/ClubsMap.png';

const LeagueTable = () => {
  const [teams, setTeams] = useState(null);
  const [eplLogoPic, setEplLogoPic] = useState(null);
  const [eplMapsPic, setEplMapsPic] = useState(null);

  useEffect(()=>{
    async function fetchMyAPI() {
      document.getElementById('league_link').classList='nav-link active'
      await axios.get(`http://localhost:8000/UnitedHome/league/table`)
      .then(res => {
          setTeams(res.data); 
          setEplLogoPic('https://www.fifplay.com/img/public/premier-league-2-logo.png');
          setEplMapsPic(clubsMap);
      })
      .catch(err => {
        alert(err);
      });
    }
    fetchMyAPI();
  }, [])
    
  return(
      <Container style={style.containter} fluid id="info-table">
        <Row>
          <Col xs="12" sm="2" style={style.besideBanner}>
            <img  style={style.besideBannerStyle} src={eplLogoPic} alt='EPL Logo'></img>
          </Col>
          <Col xs="12" sm="8" style={style.scrollaleTable}>
            <div id='club-table'>
              {(teams !== null) && <StandingTable teamlist={teams} title='league table'></StandingTable>}
            </div>
          </Col>
          <Col xs="12" sm="2" style={style.besideBanner}>
            <img  style={style.besideBannerStyle} src={eplMapsPic} alt='Map of clubs'></img>
          </Col>
        </Row>
      </Container>
  )
};

export default LeagueTable;

const style ={
  besideBannerStyle: {
    width: "inherit",
  },
  containter: {
    position:"relative",
    width: "100%",
    backgroundColor: "#050505"
  },
  scrollaleTable: {
    height: "inherit"
  },
  besideBanner: {
    display: "flex",
    alignItems: "center",
  }
}
