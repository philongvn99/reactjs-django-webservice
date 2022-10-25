import HomePage from "./Pages/Home/HomePage";
import Modify from "./Pages/SignIn/Modify/Modify";
import ContactPage from "./Pages/Contact/Contact";
import SignUpForm from "./Pages/SignIn/SignUp/SignUp";
import Position from "./Pages/Player/Position/Position";
import PlayerPage from "./Pages/Player/PlayerPage/PlayerPage";
import LeagueTable from "./Pages/League/LeagueTable/LeagueTable";
import MenuIndicator from "./Component/MenuIndicator/MenuIndicator";
import MatchResultForm from "./Pages/League/MatchResultsForm/MatchResultForm";
import LeagueResultsForm from "./Pages/League/LeagueResultsForm/LeagueResultsForm";
// import Snowfall from "react-snowfall";
import axiosInstance from "./config/axiosConfig";
import { Container, Row, Col } from "reactstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import React, { useEffect, useState } from "react";

const App = (props) => {
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    async function getPlayersData() {
      let players = sessionStorage.getItem("players");

      if (players === null) {
        await axiosInstance
          .getPlayerInfo()
          .then((res) => {
            //console.log(res.data);
            sessionStorage.setItem("players", JSON.stringify(res.data));
          })
          .catch((err) => {
            alert(err);
          });
      }
      setBusy(false);
    }
    getPlayersData();
  }, []);

  return (
    !busy && (
      <Container style={style.containter} fluid id="info-table">
        <Row>
          <Col xs="12" lg="2" style={style.besideBanner}></Col>
          <Col xs="12" lg="8" style={style.scrollaleTable}>
            {/* <Snowfall style={{ zIndex: 10, height: 500 }} /> */}
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
                  component={MatchResultForm}
                />
                <Route exact path={"/user/signup"} component={SignUpForm} />
                <Route exact path={"/user/modify"} component={Modify} />
                <Route exact path={"/contact"} component={ContactPage} />
              </Switch>
            </Router>
          </Col>
          <Col xs="12" lg="2" style={style.besideBanner}>
            {MenuIndicator()}
          </Col>
        </Row>
      </Container>
    )
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
    alignItems: "end",
  },
};

export default App;
