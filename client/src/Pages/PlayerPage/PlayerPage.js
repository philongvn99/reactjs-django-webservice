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
    document.getElementById('player_link').classList='nav-link active'
    axios.get('/UnitedHome')
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
      <div id = "info-table">
        <img width="100%" src="https://balajithoughts.files.wordpress.com/2008/05/kingsofeurope1.jpeg"></img>
        <div id='goalkeeper-table'>{this.state.goalkeeperTable}</div>
        <div id='defender-table'>{this.state.defenderTable}</div>
        <div id='midfielder-table'>{this.state.midfielderTable}</div>
        <div id='forward-table'>{this.state.forwardTable}</div>
      </div>
    )
  }
};
export default PlayerPage;