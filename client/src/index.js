import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import UserProfile from "./Component/UserProfile";
import Audio from "./Component/Audio";
import "./style.css";
import axios from "axios";

ReactDOM.render(<App/>, document.getElementById('root'));



window.onload = function () {

    const pauseMusic = sessionStorage.getItem("musicPaused");
    const srcMusic = sessionStorage.getItem("musicSrc");

    ReactDOM.render(<Audio src={srcMusic ?  srcMusic : "/resource/music/GloryGloryManUnited.mp3"}/>, document.getElementById('audio'));

    var myAudio = document.getElementById("background-music");

    myAudio.volume = 0.05;
    myAudio.currentTime = sessionStorage.getItem("musicCurrTime");

    (pauseMusic === 'true') ? myAudio.pause() : myAudio.play();
}

window.addEventListener("beforeunload", function(event) {
    var myAudio = document.getElementById("background-music");
    
    sessionStorage.setItem("musicCurrTime", myAudio.currentTime);
    sessionStorage.setItem("musicPaused", myAudio.paused);
    sessionStorage.setItem("musicSrc", myAudio.src);
})

const switchMusic = () => {
    var myAudio = document.getElementById("background-music");
    return myAudio.paused ? myAudio.play() : myAudio.pause();
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
                username: usernameLogin,
                password: passwordLogin
            }
        )
        .then( (res) => {
            if(res.data.success)
            {
                console.log(res.data)
                ReactDOM.render(<UserProfile userInfo={res.data.userInfo}/>, document.getElementById('login-dropdown'));
                document.getElementById("login_link").innerHTML = res.data.userInfo.name;
            }
            else alert("Username or Password is INVALID");
        })
        .catch( (err) => alert(err))
    }
}

// BUTTON ONCLICK FUNCTION

document.getElementById("music-switch").onclick = function() {switchMusic()};
document.getElementById("login-btn").onclick = function() {submitLogin()}

//---------------------------------
