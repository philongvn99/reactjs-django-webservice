import React, { useState, useEffect } from "react";
import { fireDatabase, storage } from "../../../config/firebaseConfig";
import { Container, Row, Col } from "reactstrap";
import "./sign-up.css";

const SignUpForm = (props) => {
  const [username, setUsername] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [license, setLicense] = useState(null);
  const [error, setError] = useState({
    username: "",
    email: "",
    phone: "",
    name: "",
    password: "",
    c_password: "",
    license: "",
  });

  const submitHandler = (event) => {
    console.log(
      username,
      email,
      phone,
      name,
      password,
      confirmPassword,
      license
    );
  };

  return (
    <Container id="signup-background">
      <Col id="signup-form" sm="8">
        <Row className="title">SIGN UP</Row>
        <Row className="submit-signup-field">
          <Col>
            <label htmlFor="username">USERNAME</label>
          </Col>
          <Col>
            <input
              id="signup-username"
              type="text"
              placeholder="Pikachu123"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Col>
          <div className="error-notice" id={`username-error`}>
            {error.username}
          </div>
        </Row>
        <Row className="submit-signup-field">
          <Col>
            <label htmlFor="email">EMAIL</label>
          </Col>
          <Col>
            <input
              id={"signup-email"}
              type="text"
              placeholder="meotwo@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
          <div className="error-notice" id={`email-error`}>
            {error.email}
          </div>
        </Row>
        <Row className="submit-signup-field">
          <Col>
            <label htmlFor="name">NAME</label>
          </Col>
          <Col>
            <input
              id={"signup-name"}
              type="text"
              placeholder="UCHIHA SATOSHI"
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <div className="error-notice" id="name-error">
            {error.name}
          </div>
        </Row>
        <Row className="submit-signup-field">
          <Col>
            <label htmlFor="email">PHONE</label>
          </Col>
          <Col>
            <input
              id={"signup-phone"}
              type="text"
              placeholder="0123xxxxxx"
              onChange={(e) => setPhone(e.target.value)}
            />
          </Col>
          <div className="error-notice" id={`phone-error`}>
            {error.phone}
          </div>
        </Row>
        <Row className="submit-signup-field">
          <Col>
            <label htmlFor="email">PASSWORD</label>
          </Col>
          <Col>
            <input
              id={"signup-password"}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
          <div className="error-notice" id={`password-error`}>
            {error.password}
          </div>
        </Row>
        <Row className="submit-signup-field">
          <Col>
            <label htmlFor="email">CONFIRM PASSWORD</label>
          </Col>
          <Col>
            <input
              id={"signup-confirmpassword"}
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Col>
          <div className="error-notice" id={`confirmpassword-error`}>
            {error.c_password}
          </div>
        </Row>
        <Row className="submit-signup-field">
          <Col>
            <label htmlFor="license">LICENSE PLATE NUMBER</label>
          </Col>
          <Col>
            <input
              id={"signup-license"}
              type="text"
              placeholder="64B2-00298"
              onChange={(e) => setLicense(e.target.value)}
            />
          </Col>
          <div className="error-notice" id={`license-error`}>
            {error.license}
          </div>
        </Row>
        <div className="submit-signup-field">
          <button id="Signup-submit" onClick={submitHandler}>
            Sign Up
          </button>
        </div>
      </Col>
    </Container>
  );
};

export default SignUpForm;
