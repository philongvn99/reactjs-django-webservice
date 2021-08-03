import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Table from '../TableComponent/Table'


const PlayerPage = () => {

  const  [goalkeeperTable, setGoalkeeperTable] = useState(null);
  const  [defenderTable, setDefenderTable] = useState(null);
  const  [midfielderTable, setMidfielderTable] = useState(null);
  const  [forwardTable, setForwardTable] = useState(null);

  useEffect(() => {
    async function fetchMyAPI() {
      document.getElementById('player_link').classList='nav-link active dropbtn'
      await axios.get('/UnitedHome/player')
        .then(res => {
          setGoalkeeperTable(<Table players={res.data.goalkeepers} title="goalkeepers"></Table>);
          setDefenderTable(<Table players={res.data.goalkeepers} title="defender"></Table>);
          setMidfielderTable(<Table players={res.data.goalkeepers} title="midfielders"></Table>);
          setForwardTable(<Table players={res.data.goalkeepers} title="forwards"></Table>);
        })
        .catch(err => {
          alert(err);
        });
      };
    fetchMyAPI();
  }, [])
    

  return(
    <div id = "position-table" style={styles.Content}>
      <div style={styles.table}>
        <div id='goalkeeper-table'>{goalkeeperTable}</div>
        <div id='defender-table'>{defenderTable}</div>
        <div id='midfielder-table'>{midfielderTable}</div>
        <div id='forward-table'>{forwardTable}</div>
      </div>
    </div>
  )
};
export default PlayerPage;

const styles = {
  img: {
    visibility: "hidden"
  },

  table: {
    position: "relative",
    backgroundColor: "rgba(255,255,255,0.5)",
    overflow: "scroll",
    maxWidth: "90%",
    maxHeight: "900px",
    fontSize: "10px"
  },

  Content:{
    position: "relative",
    textAlign: "center",
    backgroundImage: `url("https://i2-prod.manchestereveningnews.co.uk/incoming/article15211519.ece/ALTERNATES/s1200/1_dressingrrom.jpg")`,
    backgroundAttachment: "sticky",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
  }
}