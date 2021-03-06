import React, { useState, useEffect } from 'react'
import axios from 'axios';
import PlayerTable from '../resource/TableComponent/PlayerTable'


const PlayerPage = () => {

  const  [goalkeeperData, setGoalkeeperData] = useState(null);
  const  [defenderData, setDefenderData] = useState(null);
  const  [midfielderData, setMidfielderData] = useState(null);
  const  [forwardData, setForwardData] = useState(null);

  useEffect(() => {
    async function fetchMyAPI() {
      document.getElementById('player_link').classList='nav-link active dropbtn'
      await axios.get(`http://localhost:8000/UnitedHome/player/`)
        .then(res => {
          setGoalkeeperData(res.data.goalkeepers);
          setDefenderData(res.data.defenders);
          setMidfielderData(res.data.midfielders);
          setForwardData(res.data.forwards);
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
        <div id='goalkeeper-table'>
          {(goalkeeperData !== null) && <PlayerTable players={goalkeeperData} title="goalkeepers"></PlayerTable> }
        </div>
        <div id='defender-table'>
          {(defenderData !== null) && <PlayerTable players={defenderData} title="defenders"></PlayerTable>}
        </div>
        <div id='midfielder-table'>
          {(midfielderData !== null) && <PlayerTable players={midfielderData} title="midfielders"></PlayerTable>}
        </div>
        <div id='forward-table'>
          {(forwardData !== null) && <PlayerTable players={forwardData} title="forwards"></PlayerTable>}
          </div>
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
    maxWidth: "90%",
    height: "fit-content",
    fontSize: "10px"
  },

  Content:{
    position: "relative",
    textAlign: "center",
    backgroundImage: `url("https://i2-prod.manchestereveningnews.co.uk/incoming/article15211519.ece/ALTERNATES/s1200/1_dressingrrom.jpg")`,
    backgroundAttachment: "sticky",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "repeat-y",
    display: "flex",
    justifyContent: "center",
    minHeight: "2000px"
  }
}