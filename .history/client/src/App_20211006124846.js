import HomePage     from "./Pages/Home/HomePage";
import PlayerPage   from "./Pages/Player/PlayerPage/PlayerPage";
import Position     from "./Pages/Player/Position/Position";
import LeagueTable  from "./Pages/League/LeagueTable/LeagueTable";
import LeagueResultsForm   from "./Pages/League/LeagueResultsForm/LeagueResultsForm";  
import MatchResultsForm    from "./Pages/League/MatchResultsForm/MatchResultsForm";
import SignUpForm   from "./Pages/SignIn/SignUp/SignUp";
import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Redirect
  } from "react-router-dom";
import firebase from "firebase";
import {firebaseConfig} from "./config/config";


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fireDatabase : null
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      
    }
  }

  componentDidMount() {
    this.setState({
      fireDatabase: firebase.database()
    }); 
  }

  render() {
    return (
        <Router>
            <Route exact path="/"
                render={ () =>  {return (<Redirect to="/home" /> )}}
              />
            <Route exact path={"/home"}><HomePage fireDatabase={this.state.fireDatabase}/></Route>
            <Route exact path={"/players"}><PlayerPage fireDatabase={this.state.fireDatabase}/></Route>
            <Route exact path={"/players/:pos"}><Position fireDatabase={this.state.fireDatabase}/></Route>
            <Route exact path={"/league/table"}><LeagueTable fireDatabase={this.state.fireDatabase}/></Route>
            <Route exact path={"/league/leagueform"}><LeagueResultsForm fireDatabase={this.state.fireDatabase}/></Route>
            <Route exact path={"/league/matchform"}><MatchResultsForm fireDatabase={this.state.fireDatabase}/></Route>
            <Route exact path={"/signup"}><SignUpForm fireDatabase={this.state.fireDatabase}/></Route>
        </Router>
    );
    }
}

export default App;