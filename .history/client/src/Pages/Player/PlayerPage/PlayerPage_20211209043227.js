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
      await axios.get(`/UnitedHome/player/`)
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
    maxWidth: "90%",
    height: "fit-content",
    fontSize: "10px"
  },

  Content:{
    position: "relative",
    textAlign: "center",
    // background: "repeating-linear-gradient(45deg, #000080, black 100%)",
    background: "repeating-linear-gradient(topdown, #000080, black 100%)",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "20px 0px"
  }
}