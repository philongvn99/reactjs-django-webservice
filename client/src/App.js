import HomePage     from "./Pages/Home/HomePage";
import PlayerPage   from "./Pages/Player/PlayerPage/PlayerPage";
import Position     from "./Pages/Player/Position/Position";
import LeagueTable  from "./Pages/League/LeagueTable/LeagueTable";
import AddingForm   from "./Pages/League/LeagueTable/AddingForm/AddingForm";  
import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
  } from "react-router-dom";

class App extends Component {
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
            <Route exact path={"/league/addingform"} component={AddingForm} />
        </Router>
    );
    }
}

export default App;