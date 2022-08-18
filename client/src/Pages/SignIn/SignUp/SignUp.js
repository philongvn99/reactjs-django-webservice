import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import validator from "validator";
import "./sign-up.css";

const SignUpForm = (props) => {
  const [userRes, setUserRes] = useState({
    username: "",
    email: "",
    phone: "",
    name: "",
    password: "",
    c_password: "",
    license: "",
  });
  const [error, setError] = useState({
    username: "",
    email: "",
    phone: "",
    name: "",
    password: "",
    c_password: "",
    license: "",
  });

  useEffect(() => {
    document.getElementById("login_link").classList = "nav-link active";
    document.getElementById("profile_indicator").classList = "menu-item active";
  });

  const submitHandler = (event) => {
    setError({
      username: /[0-9A-Za-z_]{8,32}$/.test(userRes.username)
        ? ""
        : "Your username should only include number, character and underscore",
      email: validator.isEmail(userRes.phone) ? "" : "Invalid Email format",
      phone: /0[0-9]{9}$/.test(userRes.phone)
        ? ""
        : "Invalid Vietnamese Mobile phone number format",
      name: validator.isByteLength(userRes.name, { min: 8, max: 32 })
        ? ""
        : "Length of your name should has 8-32 characters",
      password: validator.isStrongPassword(userRes.password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
      })
        ? ""
        : "Another Stronger password, please!",
      c_password:
        userRes.c_password === userRes.password
          ? ""
          : "Please re-enter exactly your new demand password",
      license: /([0-9]){2}[A-Z][A-Z0-9]?-[0-9]{4,5}$/.test(userRes.license)
        ? ""
        : "Valid Vietnamese License Plate Format, please!",
    });
    if (
      JSON.stringify(error) ===
      '{"phone":"","name":"","p_password":"","password":"","c_password":"","license":""}'
    )
      console.log(userRes);
  };

  return (
    <Container className="signup-form">
      <Col className="signup-cover" sm="8">
        <Row className="form-title">SIGN UP</Row>
        <Row className="signup-field">
          <Col>
            <label htmlFor="signup-username">USERNAME</label>
          </Col>
          <Col>
            <input
              id="signup-username"
              type="text"
              placeholder="Pikachu123"
              onChange={(e) =>
                setUserRes({ ...userRes, username: e.target.value })
              }
            />
          </Col>
        </Row>
        <Row className="error-notice" id={`username-error`}>
          {error.username}
        </Row>
        <Row className="signup-field">
          <Col>
            <label htmlFor="signup-email">EMAIL</label>
          </Col>
          <Col>
            <input
              id="signup-email"
              type="email"
              placeholder="meotwo@gmail.com"
              onChange={(e) =>
                setUserRes({ ...userRes, email: e.target.value })
              }
            />
          </Col>
        </Row>
        <Row className="error-notice" id={`email-error`}>
          {error.email}
        </Row>
        <Row className="signup-field">
          <Col>
            <label htmlFor="signup-name">NAME</label>
          </Col>
          <Col>
            <input
              id={"signup-name"}
              type="text"
              placeholder="UCHIHA SATOSHI"
              onChange={(e) => setUserRes({ ...userRes, name: e.target.value })}
            />
          </Col>
        </Row>
        <Row className="error-notice" id="name-error">
          {error.name}
        </Row>
        <Row className="signup-field">
          <Col>
            <label htmlFor="signup-phone">PHONE</label>
          </Col>
          <Col>
            <input
              id="signup-phone"
              type="text"
              placeholder="0123xxxxxx"
              onChange={(e) =>
                setUserRes({ ...userRes, phone: e.target.value })
              }
            />
          </Col>
        </Row>
        <Row className="error-notice" id={`phone-error`}>
          {error.phone}
        </Row>
        <Row className="signup-field">
          <Col>
            <label htmlFor="signup-password">PASSWORD</label>
          </Col>
          <Col>
            <input
              id="signup-password"
              type="password"
              onChange={(e) =>
                setUserRes({ ...userRes, password: e.target.value })
              }
            />
          </Col>
        </Row>
        <Row className="error-notice" id={`password-error`}>
          {error.password}
        </Row>
        <Row className="signup-field">
          <Col>
            <label htmlFor="signup-confirmpassword">CONFIRM PASSWORD</label>
          </Col>
          <Col>
            <input
              id="signup-confirmpassword"
              type="password"
              onChange={(e) =>
                setUserRes({ ...userRes, c_password: e.target.value })
              }
            />
          </Col>
        </Row>
        <Row className="error-notice" id={`confirmpassword-error`}>
          {error.c_password}
        </Row>
        <Row className="signup-field">
          <Col>
            <label htmlFor="signup-license">LICENSE PLATE NUMBER</label>
          </Col>
          <Col>
            <input
              id="signup-license"
              type="text"
              placeholder="64B2-00298"
              onChange={(e) =>
                setUserRes({ ...userRes, license: e.target.value })
              }
            />
          </Col>
        </Row>
        <Row className="error-notice" id={`license-error`}>
          {error.license}
        </Row>
        <Row className="signup-field">
          <button id="Signup-submit" onClick={submitHandler}>
            Sign Up
          </button>
        </Row>
      </Col>
    </Container>
  );
};

export default SignUpForm;
