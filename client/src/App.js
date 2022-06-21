import HomePage from "./Pages/Home/HomePage";
import PlayerPage from "./Pages/Player/PlayerPage/PlayerPage";
import Position from "./Pages/Player/Position/Position";
import LeagueTable from "./Pages/League/LeagueTable/LeagueTable";
import LeagueResultsForm from "./Pages/League/LeagueResultsForm/LeagueResultsForm";
import MatchResultsForm from "./Pages/League/MatchResultsForm/MatchResultsForm";
import SignUpForm from "./Pages/SignIn/SignUp/SignUp";
import Modify from "./Pages/SignIn/Modify/Modify";
import Snowfall from "react-snowfall";
import { Container, Row, Col } from "reactstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import React from "react";

const App = (props) => {
  return (
    <Container style={style.containter} fluid id="info-table">
      <Row>
        <Col xs="12" sm="2" style={style.besideBanner}></Col>
        <Col xs="12" sm="8" style={style.scrollaleTable}>
          <Snowfall style={{ zIndex: 10, height: 500 }} />
          <Router>
            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  return <Redirect to="/home" />;
                }}
              />
              <Route exact path={"/home"} component={HomePage} />
              <Route exact path={"/players"} component={PlayerPage} />
              <Route exact path={"/players/:pos"} component={Position} />
              <Route exact path={"/league/table"} component={LeagueTable} />
              <Route
                exact
                path={"/league/leagueform"}
                component={LeagueResultsForm}
              />
              <Route
                exact
                path={"/league/matchform"}
                component={MatchResultsForm}
              />
              <Route exact path={"/user/signup"} component={SignUpForm} />
              <Route exact path={"/user/modify"} component={Modify} />
            </Switch>
          </Router>
        </Col>
        <Col xs="12" sm="2" style={style.besideBanner}></Col>
      </Row>
    </Container>
  );
};

const style = {
  besideBannerStyle: {
    width: "inherit",
  },
  containter: {
    position: "relative",
    width: "100%",
  },
  scrollaleTable: {
    height: "inherit",
    width: "fit-content",
  },
  besideBanner: {
    display: "flex",
    alignItems: "center",
  },
};

export default App;
