import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserProfile from './Component/UserProfile'
import './style.css';
import axios from 'axios';

ReactDOM.render(<App />, document.getElementById('root'));
axios.post(
    'http://localhost:8000/UnitedHome/login/', 
    {
        username: "dr3g0ng44n",//usernameLogin, 
        password: "binbin123"//passwordLogin
    }
)
.then( (res) => {
    console.log(res.data)
    if(res.data.success) {
            ReactDOM.render(<UserProfile userInfo={res.data.userInfo}/>, document.getElementById('login-dropdown'));
        }
    else alert("Username or Password is INVALID");
})
.catch( (err) => alert(err))


var myAudio = document.getElementsByTagName("Audio")[0];

window.onload = function() {
    myAudio.volume=0.2;
    myAudio.pause();
}

const switchMusic = () => {
    return myAudio.paused ? myAudio.play() : myAudio.pause();
}

const selectMusic = (option) => {
    myAudio.src=option;
}

const submitLogin = () => {
    var usernameLogin = document.getElementById("login-username").value;
    var passwordLogin = document.getElementById("login-password").value;

    let usernameErrorHTML = "";
    let passwordErrorHTML = "";

    if(usernameLogin.length < 6) usernameErrorHTML = "Username must have at least 6 characters";
    else if (!usernameLogin.match(/^[0-9A-Za-z.@]+$/g)) usernameErrorHTML = "Username contains some special characters";
    
    document.getElementById("user-error").innerHTML = usernameErrorHTML;

    if(passwordLogin.length < 6) passwordErrorHTML = "Password must have at least 6 characters";
    else if (!passwordLogin.match(/^[0-9A-Za-z.@]+$/g) ) passwordErrorHTML = "Password contains some special characters";

    document.getElementById("pass-error").innerHTML = passwordErrorHTML;

    if ((usernameErrorHTML === "") && (passwordErrorHTML === "")) {
        axios.post(
            'http://localhost:8000/UnitedHome/login/', 
            {
                username: "holtby331",//usernameLogin, 
                password: "binbin123"//passwordLogin
            }
        )
        .then( (res) => {
            if(res.data.success) 
                ReactDOM.render(<UserProfile userInfo={res.data.userInfo}/>, document.getElementById('login-dropdown'));
            else alert("Username or Password is INVALID");
        })
        .catch( (err) => alert(err))
    }
}

// BUTTON ONCLICK FUNCTION

document.getElementById("music-switch").onclick = function() {switchMusic()};
document.getElementById("ggmu-option").onclick = function() {selectMusic("/resource/music/GloryGloryManUnited.mp3")};
document.getElementById("hnnu-option").onclick = function() {selectMusic("/resource/music/HaNoiNU.mp3")};
document.getElementById("tn-option").onclick = function() {selectMusic("/resource/music/TheNights.mp3")};
document.getElementById("login-btn").onclick = function() {submitLogin()}

//---------------------------------