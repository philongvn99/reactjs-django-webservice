import HomePage     from "./Pages/Home/HomePage";
import PlayerPage   from "./Pages/Player/PlayerPage/PlayerPage";
import Position     from "./Pages/Player/Position/Position";
import LeagueTable  from "./Pages/League/LeagueTable/LeagueTable";
import LeagueResultsForm   from "./Pages/League/LeagueResultsForm/LeagueResultsForm";  
import MatchResultsForm    from "./Pages/League/MatchResultsForm/MatchResultsForm";
import SignUpForm   from "./Pages/SignIn/SignUp/SignUp";
import Modify from "./Pages/SignIn/Modify/Modify";
import Snowfall from 'react-snowfall';
import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
  } from "react-router-dom";


class App extends Component {

  componentDidMount() {}

  render() {
    return (
      <div>
        <Snowfall style={{zIndex: 10}}/>
        <Router>
            <Switch>
                <Route exact path="/"
                    render={ () =>  {return (<Redirect to="/home" /> )}}
                  />
                <Route exact path={"/home"} component={HomePage} />
                <Route exact path={"/players"} component={PlayerPage} />
                <Route exact path={"/players/:pos"} component={Position} />
                <Route exact path={"/league/table"} component={LeagueTable} />
                <Route exact path={"/league/leagueform"} component={LeagueResultsForm} />
                <Route exact path={"/league/matchform"} component={MatchResultsForm} />
                <Route exact path={"user/signup"} component={SignUpForm} />
                <Route exact path={"user/modify"} component={Modify} />
            </Switch>
        </Router>
      </div>
    );
    }
}

export default App;