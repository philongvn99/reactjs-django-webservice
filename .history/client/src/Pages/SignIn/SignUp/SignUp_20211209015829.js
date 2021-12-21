import React, {useState, useEffect} from "react";
import {fireDatabase, storage} from "../../../config/firebaseConfig";
import "./sign-up.css"

const SignUpForm = (props) => {
    const [userInfo, setUserInfo] = useState({username: "", email:"", phone: "", name:"", password:"", c_password: ""})
    
    const submitHandler = (event) => {
        console.log(userInfo)
    }

    return (
        <div id="signup-background">
            <div id="signup-form">
                <h1>SIGN UP</h1>
                <div className="submit-signup-field">
                    <label htmlFor="UserName">UserName</label>
                    <input 
                        id="signup-username"
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                        />
                </div>
                <div className="submit-signup-field">
                    <label htmlFor="Email">Email</label>
                    <input 
                        id="signup-email"
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        />
                </div>
                <div className="submit-signup-field">
                    <label htmlFor="Phone Number">Phone Number</label>
                    <input 
                        id="signup-phone"
                        type="number"
                        placeholder="Phone Number"
                        onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                        />
                </div>
                <div className="submit-signup-field">
                    <label htmlFor="Name">Name</label>
                    <input 
                        id="signup-name"
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                        />
                </div>
                <div className="submit-signup-field">
                    <label htmlFor="Password">Password</label>
                    <input 
                        id="signup-password" 
                        type="text" 
                        placeholder="Password"
                        onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                        />
                </div>
                <div className="submit-signup-field">
                    <label htmlFor="Confirm Password">Confirm Password</label>
                    <input 
                        id="signup-confirm-password" 
                        type="text" 
                        placeholder="Confirm Password"
                        onChange={(e) => setUserInfo({ ...userInfo, c_password: e.target.value })}
                        />
                </div>
                <div className="submit-signup-field">
                    <button id="Signup-submit" onClick={submitHandler}>Sign Up</button>
                </div>
            </div>
        </div>
    )
};

export default SignUpForm;