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
import firebase from "firebase"
import firebaseConfig from '../config/config'


class App extends Component {

    firebase.initializeApp(firebaseConfig)

    render() {
    return (
        <Router>
            <Route exact path="/"
                render={ () =>  {return (<Redirect to="/home" /> )}}
              />
            <Route exact path={"/home"} component={HomePage} />
            <Route exact path={"/players"} component={PlayerPage} />
            <Route exact path={"/players/:pos"} component={Position} />
            <Route exact path={"/league/table"} component={LeagueTable} />
            <Route exact path={"/league/leagueform"} component={LeagueResultsForm} />
            <Route exact path={"/league/matchform"} component={MatchResultsForm} />
            <Route exact path={"/signup"} component={SignUpForm} />
        </Router>
    );
    }
}

export default App;