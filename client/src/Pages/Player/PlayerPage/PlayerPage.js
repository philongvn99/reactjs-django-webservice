import React from 'react'
import axios from 'axios';
import Table from '../TableComponent/Table'
class PlayerPage extends React.Component {
  constructor() {
    super();
    this.state = {
      goalkeeperTable: null,
      defenderTable: null,
      midfielderTable: null,
      forwardTable: null
    }
  }
  componentDidMount = () => {
    document.getElementById('player_link').classList='nav-link active dropbtn'
    axios.get('/UnitedHome/player')
      .then(res => {
        this.setState({
          goalkeeperTable: <Table players={res.data.goalkeepers} title="goalkeepers"></Table>,
          defenderTable: <Table players={res.data.defenders} title="defenders"></Table>,
          midfielderTable: <Table players={res.data.midfielders} title="midfielders"></Table>,
          forwardTable: <Table players={res.data.forwards} title="forwards"></Table>
        });
      })
    }

  render() {
    return(
      <div id = "position-table" style={styles.Content}>
        <div style={styles.table}>
          <div id='goalkeeper-table'>{this.state.goalkeeperTable}</div>
          <div id='defender-table'>{this.state.defenderTable}</div>
          <div id='midfielder-table'>{this.state.midfielderTable}</div>
          <div id='forward-table'>{this.state.forwardTable}</div>
        </div>
      </div>
    )
  }s
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