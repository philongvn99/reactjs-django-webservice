import "./style.css";
import $ from "jquery";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SearchBar from "./Component/SearchBar";
import UserProfile from "./Component/UserProfile";
import axiosInstance from "./config/axiosConfig";

const root = ReactDOM.createRoot(document.getElementById("root"));
const user_dropdown = ReactDOM.createRoot(
  document.getElementById("login-dropdown")
);
root.render(<App />);
let myAudio = document.querySelector("#audio-music");

// ===================== ONLOAD =================================
window.onload = function () {
  myAudio.volume = 0.05;
  myAudio.currentTime = sessionStorage.getItem("musicCurrTime");
  myAudio.src =
    sessionStorage.getItem("musicSrc") ||
    "/resource/music/GloryGloryManUnited.mp3";

  sessionStorage.getItem("musicPaused") === "true"
    ? myAudio.pause()
    : myAudio.play().catch((error) => {
        //  when an exception is played, the exception flow is followed
      });
};

// ============== HEADER SCROLL HANDLING =========================

$(document).on("scroll", function () {
  if (window.scrollY > 78) {
    $("#topbar").addClass("invisible"); //hide();
    $("#navbar").css({ top: 78, position: "relative" });
  } else {
    $("#topbar").removeClass("invisible"); //show();
    $("#navbar").css({ top: 0, position: "sticky" });
  }
  if (window.scrollY < 160) {
    $("#menu-indicator").addClass("invisible");
  } else {
    $("#menu-indicator").removeClass("invisible");
  }
});

// ==============  SEARCH BAR  =========================
let searchDiv = ReactDOM.createRoot(document.getElementById("search-bar"));
searchDiv.render(<SearchBar />);

// ============== MUSIC PLAYER =========================

window.addEventListener("beforeunload", function (event) {
  sessionStorage.setItem("musicCurrTime", myAudio.currentTime);
  sessionStorage.setItem("musicPaused", myAudio.paused);
  sessionStorage.setItem("musicSrc", myAudio.src);
});

document.getElementById("music-switch").addEventListener("click", () => {
  myAudio.paused ? myAudio.play() : myAudio.pause();
});

let musicOptions = document.querySelectorAll(".music-option");
for (let i = 0; i < musicOptions.length; i++) {
  musicOptions[i].addEventListener("click", (e) => {
    myAudio.src = e.target.value;
  });
}

// ============================= USER TABLE ============================

const submitLogin = async () => {
  let usernameLogin = document.getElementById("login-username").value;
  let passwordLogin = document.getElementById("login-password").value;

  let usernameErrorHTML = " ";
  let passwordErrorHTML = " ";

  if (usernameLogin.length < 6)
    usernameErrorHTML = "Username must have at least 6 characters";
  else if (!usernameLogin.match(/^[0-9A-Za-z.@]+$/g))
    usernameErrorHTML = "Username contains some special characters";

  document.getElementById("user-error").innerHTML = usernameErrorHTML;

  if (passwordLogin.length < 6)
    passwordErrorHTML = "Password must have at least 6 characters";
  else if (!passwordLogin.match(/^[0-9A-Za-z.@]+$/g))
    passwordErrorHTML = "Password contains some special characters";

  document.getElementById("pass-error").innerHTML = passwordErrorHTML;

  if (usernameErrorHTML === " " && passwordErrorHTML === " ") {
    await axiosInstance
      .login({
        username: usernameLogin,
        password: passwordLogin,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(res.data.user_session));
          const token = res.data.auth_token;
          localStorage.setItem("access_token", token["access"]);
          localStorage.setItem("refresh_token", token["refresh"]);
          document.getElementById("login_link").innerHTML =
            res.data.user_session.name;
          user_dropdown.render(
            <UserProfile userInfo={res.data.user_session} />
          );
        } else alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }
};

// ................Table Component................
export const defaultLoginComponent = (
  <div className="login-dropdown">
    <form className="login-form">
      <label htmlFor="login-username">
        <i className="fas fa-user"></i>
        <span> Username</span>
      </label>
      <input
        id="login-username"
        type="text"
        className="form-control login-input"
        placeholder="Username / Phone / Email"
        autoComplete="off"
      />
      <div className="error-notice" id="user-error"></div>
      <label htmlFor="login-password">
        <i className="fas fa-lock"></i>
        <span> Password</span>
      </label>
      <input
        id="login-password"
        type="password"
        className="form-control login-input"
        placeholder="Password"
        autoComplete="off"
      />
      <div className="error-notice" id="pass-error"></div>
    </form>
    <button className="btn btn-black" id="login-btn" onClick={submitLogin}>
      Login
    </button>
    <button
      className="btn btn-secondary"
      onClick={() =>
        (window.location.href = "http://localhost:3000/user/signup/")
      }
    >
      Register
    </button>
  </div>
);

// ..............Render User Table...............................
const userInfo = JSON.parse(localStorage.getItem("user"));
let loginComponent = undefined;

if (userInfo != null && Object.keys(userInfo).length > 0) {
  document.getElementById("login_link").innerHTML = userInfo.name;
  loginComponent = <UserProfile userInfo={userInfo} />;
} else {
  loginComponent = defaultLoginComponent;
}
user_dropdown.render(loginComponent);
