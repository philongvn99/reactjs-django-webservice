import HomePage     from "./Pages/HomePage/HomePage";
import PlayerPage   from "./Pages/PlayerPage/PlayerPage";
import Position     from "./Pages/Position/Position";
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
        </Router>
    );
    }
}

export default App;