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
    Switch,
    Redirect
  } from "react-router-dom";
import Audio from "./Component/Audio";


class Test extends Component {

  componentDidMount() {}

  render() {
    return (
      <div>
            <header class="container-fluid">

                <div class="row header-nav-bar">
                    <div class="col menu-col">
                        <nav class="navbar navbar-expand-xl navbar-dark">
                            <a href="http://localhost:3000/home/" class="navbar-brand"><img src="/favicon.ico" alt="web-icon"/></a>
                            <button class="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbar-responsive" aria-controls="navbar-responsive"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            
                            <div class="collapse navbar-collapse" id="navbar-responsive">
                                <ul class="navbar-nav ml-auto">
                                    <li class="nav-item"><a href="http://localhost:3000/home/"     id="home_link"    class="nav-link">Home</a></li>
                                    <li class="nav-item">
                                        <div class="dropdown-nav">
                                            <a href="#"  id="player_link"  class="nav-link dropbtn" onclick="return false;">Players</a>
                                            <div class="dropdown-content">
                                                <div class="grid-container">
                                                    <div class="child">
                                                        <a href="http://localhost:3000/players/">All</a>
                                                    </div>
                                                    <div class="child">
                                                        <a href="http://localhost:3000/players/goalkeepers">Goalkeepers</a>
                                                        <a href="http://localhost:3000/players/defenders">Defenders</a>
                                                        <a href="http://localhost:3000/players/midfielders">Midfielders</a>
                                                        <a href="http://localhost:3000/players/forwards">Forwards</a>
                                                    </div>    
                                                </div>
                                            </div> 
                                        </div>
                                    </li>
                                    <li class="nav-item">
                                        <div class="dropdown-nav">
                                            <a href="#"  id="league_link"   class="nav-link">League</a>
                                            <div class="dropdown-content">
                                                <div class="child">
                                                    <a href="http://localhost:3000/league/table" class="nav-link">League Table</a>
                                                    <a href="http://localhost:3000/league/leagueform" class="nav-link">Adding League Results</a>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="nav-item">
                                        <div class="dropdown-nav">
                                            <a href="#"  id="login_link"    class="nav-link dropbtn" onclick="return false;">Login</a>
                                            <div class="dropdown-content">
                                                <div class="grid-container">
                                                    <div class="child" id="login-dropdown">
                                                        <div class="login-form">
                                                            <form>
                                                                <label>
                                                                    <i class='bx bx-user'></i>
                                                                    <span>User Name</span>
                                                                </label><br/>
                                                                <input id="login-username" type="text" class="form-control login-input" placeholder="Username" autocomplete="off"/><br/><br/>
                                                                <div class="error-notice" id="user-error"><br/></div>
                                                                <label>
                                                                    <i class='bx bx-user'></i>
                                                                    <span>Password</span>
                                                                </label><br/>
                                                                <input id="login-password" type="password" class="form-control login-input" placeholder="Password" autocomplete="off"/><br/><br/>
                                                                <div class="error-notice" id="pass-error"><br/></div>
                                                            </form>
                                                            <button class="btn btn-black" id="login-btn">Login</button>
                                                            <button class="btn btn-secondary" onclick="location.href='http://localhost:3000/signup/'">Register</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="nav-item"><a href="http://localhost:3000/players/"  id="user_link"    class="nav-link">Contact Us</a></li>
                                </ul>
                                <form class="form-inline mt-md-0">  
                                    <input type="text" placeholder="Search" aria-label="Search" class="form-control mr-sm-2"/>
                                    <button class="btn btn-light my-2 my-sm-0">Search</button>
                                </form>
                            </div>
                        </nav>
                    </div>
                </div>


                <div class="row top-bar">


                    <div class="col col-lg-9 col-sm-9 col-xs-12 left-top-slogan">
                        <div class="top-bar-slogan" id="music-switch">Make the World RED again!</div>
                    </div>

                    <div class="col col-lg-3 col-sm-3 col-xs-12 right-top-info">
                        <button class="btn btn-black dropdown-toggle music" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Music
                        </button>                
                        <Audio/>
                    </div>

                </div> 
            </header>
            
            <footer>
                <div class="container">
                    <div class="row text-light text-center py-4 justify-content-center">
                        <div class="inherit-pos">
                            <img src="/favicon.ico" alt="logo" class="w-100" />
                            <p>NICE TO MEET YOU</p>
                            <ul class="social pt-3">
                                <li><a href="https://facebook.com/holtby331" title="facebook-contact"><btn class="fab fa-facebook" target="_blank"/></a></li>
                                <li><a href="https://github.com/philongvn99" title="github-contact"><btn class="fab fa-github" target="_blank"/></a></li>
                                <li><a href="https://www.linkedin.com/in/long-phi-819316186/" title="linkedin-contact" target="_blank"><btn class="fab fa-linkedin"/></a></li>
                                <li><a href="#" title="twitter-contact"><btn class="fab fa-twitter"/></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
    }
}

export default Test;