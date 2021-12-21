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
                localStorage.setItem('user', JSON.stringify(res.data.userInfo))
                document.getElementById("login_link").innerHTML = res.data.userInfo.name;
                loginComponent = <UserProfile userInfo={res.data.userInfo}/>;
                console.log(res.data)
            }
            else alert("Username or Password is INVALID");
        })
        .catch( (err) => alert(err))
    }
}

const defaultLoginComponent = (<div className="login-form">
    <form>
        <label>
            <i className="bx bx-user"></i>
            <span>User Name</span> 
        </label><br/>
        <input
            id="login-username"
            type="text"
            className="form-control login-input"
            placeholder="Username"
            autoComplete="off"
        /><br /><br />
        <div className="error-notice" id="user-error">
            <br />
        </div>
        <label>
            <i className="bx bx-user"></i>
            <span>Password</span> 
        </label><br />
        <input
            id="login-password"
            type="password"
            className="form-control login-input"
            placeholder="Password"
            autoComplete="off"
        /><br/><br/>
        <div className="error-notice" id="pass-error">
            <br />
        </div>
    </form>
    <button className="btn btn-black" id="login-btn" onClick={submitLogin}>
        Login
    </button>
    <button
        className="btn btn-secondary"
        onClick={() => window.location.href='http://localhost:3000/signup/'}
        >
        Register
    </button>
</div>);



// BUTTON ONCLICK FUNCTION

document.getElementById("music-switch").onclick = function() {switchMusic()};

//---------------------------------


// Render User Table
const userInfo = JSON.parse(localStorage.getItem('user'))
var loginComponent = undefined

if (Object.keys(userInfo).length > 0) {
    document.getElementById("login_link").innerHTML = userInfo.name;
    loginComponent = <UserProfile userInfo={userInfo}/>;
}
else {
    loginComponent = defaultLoginComponent;
};
ReactDOM.render(loginComponent, document.getElementById('login-dropdown'));

