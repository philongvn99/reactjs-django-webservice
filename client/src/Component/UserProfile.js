import React, { useEffect, useState } from "react";
import { fireDatabase } from "../config/firebaseConfig";

const UserProfile = (props) => {
  var [userInfo, setUserInfo] = useState(props.userInfo);
  var [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    async function getAvatarUrl() {
      fireDatabase.ref(`/avatarLink/${userInfo.username}`).on(
        "value",
        (snapshot) => {
          setAvatarUrl(snapshot.val());
        },
        (errorObject) => {
          console.log("The read failed: " + errorObject.name);
        }
      );
    }
    getAvatarUrl();
  }, [userInfo.username]);

  const logoutFunction = () => {
    localStorage.setItem("user", JSON.stringify({}));
    window.location.reload();
  };

  return (
    <div style={styles.card}>
      <div style={styles.imgBox}>
        <a href="/user/modify" style={styles.modifyLink}>
          <img
            src={avatarUrl}
            alt="firebase-avatar"
            style={styles.profileAvatar}
          ></img>
        </a>
      </div>
      <div style={styles.profileDetails}>
        <h5>
          <i className="bx bx-mail-send"></i>
          <span>{userInfo.email}</span>
        </h5>
        <h5>
          <i className="bx bx-phone"></i>
          <span>{userInfo.phone}</span>
        </h5>
        <div className="actionBtn">
          <button id="logout-button" onClick={logoutFunction}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

const styles = {
  card: {
    position: "relative",
    width: "fit-content",
    height: "fit-content",
    backgroundImage:
      "linear-gradient(to bottom, transparent 50px, #07aa91 50px, #07aa91)",
    borderRadius: "20px",
    boxShadow: "0 35px 80px rgba(0, 0, 0, 0.8)",
    transition: "0.5s",
    textAlign: "center",
  },

  profileAvatar: {
    position: "relative",
    borderRadius: "20px",
    boxShadow: "0 15px 50px rgba(0, 0, 0, 0.8)",
    display: "flex",
    margin: "5px 0px",
  },

  imgBox: { display: "flex", justifyContent: "center" },

  modifyLink: {
    backgroundColor: "transparent",
  },

  profileDetails: {
    fontWeight: "500",
    display: "block",
    padding: "10px",
  },
};
