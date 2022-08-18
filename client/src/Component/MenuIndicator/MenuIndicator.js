import React from "react";
import "./menu-indicator.css";

const MenuIndicator = () => {
  return (
    <div id="menu-indicator" className="invisible">
      <ul>
        <li className="menu-item" id="home_indicator">
          <a href="http://localhost:3000/home/">
            <span className="icon">
              <p className="fas fa-home" />
            </span>
            <span className="title">Home</span>
          </a>
        </li>
        <li className="menu-item" id="player_indicator">
          <a href="http://localhost:3000/players/">
            <span className="icon">
              <p className="fas fa-tshirt" />
            </span>
            <span className="title">Player</span>
          </a>
        </li>
        <li className="menu-item" id="league_indicator">
          <a href="http://localhost:3000/league/table">
            <span className="icon">
              <p className="fa fa-trophy" />
            </span>
            <span className="title">League</span>
          </a>
        </li>
        <li className="menu-item" id="profile_indicator">
          <a href="http://localhost:3000/user/modify">
            <span className="icon">
              <p className="fas fa-user" />
            </span>
            <span className="title">Profile</span>
          </a>
        </li>
        <li className="menu-item" id="contact_indicator">
          <a href="http://localhost:3000/players/">
            <span className="title">Contact</span>
            <span className="icon">
              <p className="fas fa-address-card" />
            </span>
          </a>
        </li>
        <div className="indicator"></div>
      </ul>
    </div>
  );
};

export default MenuIndicator;
