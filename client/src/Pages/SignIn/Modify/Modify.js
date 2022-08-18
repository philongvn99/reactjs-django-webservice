import React, { useState, useEffect } from "react";
import validator from "validator";
import "./modify.css";

const Modify = (props) => {
  const [userInfo, setUserInfo] = useState({
    phone: "",
    name: "",
    p_password: "",
    password: "",
    c_password: "",
    license: "",
  });
  const [error, setError] = useState({
    phone: "",
    name: "",
    p_password: "",
    password: "",
    c_password: "",
    license: "",
  });
  const [password, setPassword] = useState("");
  const [display, setDisplay] = useState(true);
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    document.getElementById("login_link").classList = "nav-link active";
    document.getElementById("profile_indicator").classList = "menu-item active";
    async function getUser() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (Object.keys(user).length === 0) setDisplay(false);
      else {
        setUserInfo({
          ...userInfo,
          phone: user.phone,
          name: user.name,
          license: user.license,
        });
        setPassword(user.password);
      }
    }
    getUser();
  }, [userInfo]);

  const onChecked = (e) => {
    setChangePassword(e.target.checked);
  };

  const submitHandler = () => {
    setError({
      phone: /0[0-9]{9}$/.test(userInfo.phone)
        ? ""
        : "Invalid Vietnamese Mobile phone number format",
      name: validator.isByteLength(userInfo.name, { min: 8, max: 32 })
        ? ""
        : "Length of your name should has 8-32 characters",
      p_password:
        userInfo.p_password === password || !changePassword
          ? ""
          : "Your password is incorrect",
      password:
        validator.isStrongPassword(userInfo.password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
          returnScore: false,
        }) || !changePassword
          ? ""
          : "Another Stronger password, please!",
      c_password:
        userInfo.c_password === userInfo.password || !changePassword
          ? ""
          : "Please re-enter exactly your new demand password",
      license: /([0-9]){2}[A-Z][A-Z0-9]?-[0-9]{4,5}$/.test(userInfo.license)
        ? ""
        : "Valid Vietnamese License Plate Format, please!",
    });
    if (
      JSON.stringify(error) ===
      '{"phone":"","name":"","p_password":"","password":"","c_password":"","license":""}'
    )
      console.log(userInfo);
  };

  if (display)
    return (
      <div className="modify-form">
        <div className="modify-cover">
          <h1 className="modify-form-title">Modify</h1>
          <div className="field">
            <label htmlFor="modify-phone">Phone Number (10 digits)</label>&nbsp;
            <input
              id="modify-phone"
              type="tel"
              pattern="0[0-9]{9}"
              value={userInfo.phone}
              onChange={(e) =>
                setUserInfo({ ...userInfo, phone: e.target.value })
              }
            />
          </div>
          <div className="error-notice" id="phone-error">
            {error.phone}
          </div>
          <div className="field">
            <label htmlFor="modify-name">Name</label>
            <input
              id="modify-name"
              type="text"
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
            />
          </div>
          <div className="error-notice" id="name-error">
            {error.name}
          </div>
          <div className="field">
            <label htmlFor="modify-license">License</label>
            <input
              id="modify-license"
              type="text"
              value={userInfo.license}
              onChange={(e) =>
                setUserInfo({ ...userInfo, license: e.target.value })
              }
            />
          </div>
          <div className="error-notice" id="license-error">
            {error.license}
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
              <div className="field">
                <label htmlFor="modify-current-password">
                  Current Password
                </label>
                <input
                  id="modify-current-password"
                  type="password"
                  placeholder="Current Password"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, password: e.target.value })
                  }
                />
              </div>
              <div className="error-notice" id="past-password-error">
                {error.p_password}
              </div>
              <div className="field">
                <label htmlFor="modify-password">Password</label>
                <input
                  id="modify-password"
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, password: e.target.value })
                  }
                />
              </div>
              <div className="error-notice" id="password-error">
                {error.password}
              </div>
              <div className="field">
                <label htmlFor="modify-confirm-password">
                  Confirm Password
                </label>
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
              <div className="error-notice" id="confirm-password-error">
                {error.c_password}
              </div>
            </>
          )}
          <div className="field modify-submit">
            <button onClick={submitHandler} className="modify-button">
              <span>Modify</span>
            </button>
          </div>
        </div>
      </div>
    );
  else {
    return (
      <div id="content">
        <div class="wrapper">
          <pre>{String.raw`
 \                           /
  \   Please Sign In First  /
   \                       /
    ]  To view this page  [    ,'|
    ]                     [   /  |
    ]___               ___[ ''   |
    ]  ]\             /[  [ |:   |
    ]  ] \           / [  [ |:   |
    ]  ]  ]         [  [  [ |:   |
    ]  ]  ]__     __[  [  [ |:   |
    ]  ]  ] ]\ _ /[ [  [  [ |:   |
    ]  ]  ] ] (#) [ [  [  [ :===='
    ]  ]  ]_].nMn.[_[  [  [
    ]  ]  ]  MMMMM. [  [  [
    ]  ] /   YMMMNA  \ [  [
    ]__]/    AMMMA "  \[__[
    ]       AANNNAA       [
    ]      AAAN/"AAA      [
    ]         N M         [
   /          N            \
  /           q,            \
 /                           \
        `}</pre>
        </div>
      </div>
    );
  }
};

export default Modify;
