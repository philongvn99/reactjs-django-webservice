import React, { useState, useEffect } from "react";
import { fireDatabase, storage } from "../../../config/firebaseConfig";
import axios from "axios";
import "./modify.css";

const Modify = (props) => {
  const [selectedFile, setSelectedFIle] = useState(null);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    phone: "",
    name: "",
    p_password: "",
    password: "",
    c_password: "",
  });
  const [display, setDisplay] = useState(true);
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    async function getUser() {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      if (Object.keys(user).length === 0) setDisplay(false);
      else
        setUserInfo({
          ...userInfo,
          username: user.username,
          email: user.email,
          phone: user.phone,
          name: user.name,
        });
    }
    getUser();
  }, []);

  const fileSelectHandler = (event) => {
    console.log(event.target.files);
    setSelectedFIle(event.target.files[0]);
  };

  const onChecked = (e) => {
    setChangePassword(e.target.checked);
  };

  const fileUploadHandler = () => {
    if (selectedFile == null) return;
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (Object.keys(userInfo).length > 0) {
      storage
        .ref(`/${selectedFile.name}`)
        .put(selectedFile)
        .on(
          "state_changed",
          function progress(snapshot) {
            console.log(snapshot);
            fireDatabase
              .ref(`/avatarLink/${userInfo.username}`)
              .set(
                `https://firebasestorage.googleapis.com/v0/b/plfirebase-cc1f1.appspot.com/o/${selectedFile.name}?alt=media`
              )
              .catch((error) => ({
                errorCode: error.code,
                errorMessage: error.message,
              }));
          },
          function error(err) {
            alert(err);
          },
          function complete() {
            alert("success");
          }
        );
    } else alert("Please Sign In");
  };

  const submitHandler = () => {
    console.log(userInfo);
  };

  if (display)
    return (
      <div id="modify-background">
        <div id="modify-form">
          <h1>Modify</h1>
          <div className="submit-modify-field">
            <label htmlFor="UserName">Username</label>
            <input
              id="modify-username"
              type="text"
              value={userInfo.username}
              onChange={(e) =>
                setUserInfo({ ...userInfo, username: e.target.value })
              }
            />
          </div>
          <div className="submit-modify-field">
            <label htmlFor="Email">Email</label>
            <input
              id="modify-email"
              type="email"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
            />
          </div>
          <div className="submit-modify-field">
            <label htmlFor="Phone Number">Name</label>&nbsp;
            <input
              id="modify-phone"
              type="number"
              value={userInfo.phone}
              onChange={(e) =>
                setUserInfo({ ...userInfo, phone: e.target.value })
              }
            />
          </div>
          <div className="submit-modify-field">
            <label htmlFor="Name">Name</label>
            <input
              id="modify-name"
              type="text"
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
            />
          </div>

          <input
            onClick={onChecked}
            className="form-check-input"
            type="checkbox"
            value={true}
          />
          <label>Do you want to change password</label>
          <br></br>

          {changePassword && (
            <>
              <div className="submit-modify-field">
                <label htmlFor="Password">Current Password</label>
                <input
                  id="current-password"
                  type="password"
                  placeholder="Current Password"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, password: e.target.value })
                  }
                />
              </div>
              <div className="submit-modify-field">
                <label htmlFor="Password">Password</label>
                <input
                  id="modify-password"
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, password: e.target.value })
                  }
                />
              </div>
              <div className="submit-modify-field">
                <label htmlFor="Confirm Password">Confirm Password</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  id="modify-confirm-password"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, c_password: e.target.value })
                  }
                />
              </div>
            </>
          )}
          <div className="submit-modify-field">
            <button id="modify-submit" onClick={submitHandler}>
              Modify
            </button>
          </div>
        </div>
      </div>
    );
  else return <div>Please Sign In First!</div>;
};

export default Modify;
