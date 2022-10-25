import React, { useState, useEffect, useRef } from "react";
import validator from "validator";
import "./modify.css";

const Modify = (props) => {
  const [userPublicInfo, setUserPublicInfo] = useState({
    phone: "",
    name: "",
    license: "",
  });

  const phoneRef = useRef();
  const nameRef = useRef();
  const p_passwordRef = useRef();
  const passwordRef = useRef();
  const c_passwordRef = useRef();
  const licenseRef = useRef();

  const [error, setError] = useState({
    phone: "",
    name: "",
    p_password: "",
    password: "",
    c_password: "",
    license: "",
  });
  const [display, setDisplay] = useState(true);
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    document.getElementById("login_link").classList = "nav-link active";
    document.getElementById("profile_indicator").classList = "menu-item active";
    async function getUser() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (Object.keys(user).length === 0) setDisplay(false);
      else {
        setUserPublicInfo({
          phone: user.phone,
          name: user.name,
          license: user.license,
        });
      }
    }
    getUser();
  }, []);

  const onChecked = (e) => {
    setChangePassword(e.target.checked);
  };

  const submitHandler = () => {
    setError({
      phone: /0[0-9]{9}$/.test(phoneRef.current.value)
        ? ""
        : "Invalid Vietnamese Mobile phone number format",
      name: validator.isByteLength(nameRef.current.value, { min: 8, max: 32 })
        ? ""
        : "Length of your name should has 8-32 characters",
      p_password:
        validator.isStrongPassword(passwordRef.current.value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
          returnScore: false,
        }) || !changePassword
          ? ""
          : "Your input password is not strong enough",
      password:
        validator.isStrongPassword(passwordRef.current.value, {
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
        c_passwordRef.current.value === passwordRef.current.value ||
        !changePassword
          ? ""
          : "Please re-enter exactly your new demand password",
      license: /([0-9]){2}[A-Z][A-Z0-9]?-[0-9]{4,5}$/.test(
        licenseRef.current.value
      )
        ? ""
        : "Valid Vietnamese License Plate Format, please!",
    });
    if (
      JSON.stringify(error) ===
      '{"phone":"","name":"","p_password":"","password":"","c_password":"","license":""}'
    )
      console.log(
        licenseRef.current.value,
        p_passwordRef.current.value,
        c_passwordRef.current.value,
        nameRef.current.value,
        phoneRef.current.value,
        passwordRef.current.value
      );
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
              ref={phoneRef}
              defaultValue={userPublicInfo.phone}
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
              ref={nameRef}
              defaultValue={userPublicInfo.name}
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
              ref={licenseRef}
              defaultValue={userPublicInfo.license}
            />
          </div>
          <div className="error-notice" id="license-error">
            {error.license}
          </div>
          <input
            onClick={onChecked}
            className="form-check-input"
            type="checkbox"
            defaultValue={true}
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
                  ref={p_passwordRef}
                  placeholder="Current Password"
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
                  ref={passwordRef}
                  placeholder="Password"
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
                  ref={c_passwordRef}
                  placeholder="Confirm Password"
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
