import React, {useMemo} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserProfile from './Component/UserProfile'
import Audio from './Component/Audio'
import './style.css';
import axios from 'axios';
import Test from './Test.jsx';

ReactDOM.render(<Router>
    <Audio/>
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
        <Route exact path={"/signup"} component={SignUpForm} />
    </Switch>
</Router>, document.getElementById('root'));


// var src = "/resource/music/GloryGloryManUnited.mp3";
// //ReactDOM.render(<Audio/>, document.getElementById('audio'));


// var myAudio = document.getElementById("background-music");


// window.onload = function() {
//     myAudio.volume=0.05;
// }


// const switchMusic = () => {
//     return myAudio.paused ? myAudio.play() : myAudio.pause();
// }


// const submitLogin = () => {
//     var usernameLogin = document.getElementById("login-username").value;
//     var passwordLogin = document.getElementById("login-password").value;

//     let usernameErrorHTML = "";
//     let passwordErrorHTML = "";

//     if(usernameLogin.length < 6) usernameErrorHTML = "Username must have at least 6 characters";
//     else if (!usernameLogin.match(/^[0-9A-Za-z.@]+$/g)) usernameErrorHTML = "Username contains some special characters";
    
//     document.getElementById("user-error").innerHTML = usernameErrorHTML;

//     if(passwordLogin.length < 6) passwordErrorHTML = "Password must have at least 6 characters";
//     else if (!passwordLogin.match(/^[0-9A-Za-z.@]+$/g) ) passwordErrorHTML = "Password contains some special characters";

//     document.getElementById("pass-error").innerHTML = passwordErrorHTML;

//     if ((usernameErrorHTML === "") && (passwordErrorHTML === "")) {
//         axios.post(
//             'http://localhost:8000/UnitedHome/login/', 
//             {
//                 username: usernameLogin, 
//                 password: passwordLogin
//             }
//         )
//         .then( (res) => {
//             if(res.data.success) 
//             {
//                 console.log(res.data)
//                 ReactDOM.render(<UserProfile userInfo={res.data.userInfo}/>, document.getElementById('login-dropdown'));
//                 document.getElementById("login_link").innerHTML = res.data.userInfo.name;
//             } 
//             else alert("Username or Password is INVALID");
//         })
//         .catch( (err) => alert(err))
//     }
// }


// // BUTTON ONCLICK FUNCTION

// document.getElementById("music-switch").onclick = function() {switchMusic()};
// document.getElementById("login-btn").onclick = function() {submitLogin()}

// //---------------------------------