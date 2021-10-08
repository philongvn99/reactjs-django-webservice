import React, {useEffect, useState} from 'react';
import axios from 'axios';
import StandingTable from '../resource/StandingTableComponent/StandingTable';
import { Container, Row, Col } from 'reactstrap';
import firebase from "firebase/app";


const LeagueTable = () => {
  const [teams, setTeams] = useState(null);
  const [eplBannerUrls, setEplBannerUrls] = useState(null);

  useEffect(()=>{
    async function fetchMyAPI() {
      document.getElementById('league_link').classList='nav-link active'
      await axios.get(`http://localhost:8000/UnitedHome/league/table`)
      .then(res => {
          setTeams(res.data); 
          const fireDatabase = firebase.database();
          
          fireDatabase.ref('/epl-table')
            .on('value', snapshot => {
                setEplBannerUrls(snapshot.val());
            }, (errorObject) => {
                console.log('The read failed: ' + errorObject.name);
            })
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
            <img  style={style.besideBannerStyle} src={eplBannerUrls['left-banner']} alt='EPL Logo'></img>
          </Col>
          <Col xs="12" sm="8" style={style.scrollaleTable}>
            <div id='club-table'>
              {(teams !== null) && <StandingTable teamlist={teams} title='league table'></StandingTable>}
            </div>
          </Col>
          <Col xs="12" sm="2" style={style.besideBanner}>
            <img  style={style.besideBannerStyle} src={eplBannerUrls['right-banner']} alt='Map of clubs'></img>
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
