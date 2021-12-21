import React, {useState, useEffect} from "react";
import {storage} from "../../../config/firebaseConfig";
import "./sign-up.css"

const SignUpForm = (props) => {
    const [selectedFile, setSelectedFIle] = useState(null)
    
    const fileSelectHandler = (event) => {
        console.log(event.target.files)
        setSelectedFIle(event.target.files[0])
    }

    const fileUploadHandler = () => {
        if(selectedFile == null) return;
        const userInfo = JSON.parse(localStorage.getItem('user'))
        if (Object.keys(userInfo).length > 0) {
            storage.ref(`/${selectedFile.name}}`).put(selectedFile)
            .on(
                "state_changed" , 
                function progress(snapshot) {
                    var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    uploader.value = percentage;       
                }, 
                function error(err) {
                    alert(err)
                },
                function complete() {
                    alert("success")
                }
            );
        }
        else alert("Please Sign In")
    }

    return (
        <div id="signup-background">
            <div id="signup-form">
                <h1>SIGN UP</h1>
                <div className="submit-signup-field">
                    <label htmlFor="UserName">UserName</label>
                    <input id="signup-username" type="text" placeholder="Username"></input>
                </div>
                <div className="submit-signup-field">
                    <label htmlFor="Email">Email</label>
                    <input id="signup-email" type="email" placeholder="Email"></input>
                </div>
                <div className="submit-signup-field">
                    <label htmlFor="Phone Number">Phone Number</label>
                    <input id="signup-phone" type="number" placeholder="Phone Number"></input>
                </div>
                <div className="submit-signup-field">
                    <label htmlFor="Name">Name</label>
                    <input id="signup-name" type="text" placeholder="Name"></input>
                </div>
                <div className="submit-signup-field">
                    <label htmlFor="Password">Password</label>
                    <input id="signup-password" type="text" placeholder="Password"></input>
                </div>
                <div className="submit-signup-field">
                    <label htmlFor="Confirm Password">Confirm Password</label>
                    <input id="signup-confirm-password" type="text" placeholder="Confirm Password"></input>
                </div>
                <div className="submit-sigup-field">
                    <input id="sign-up-avatar" type="file" onChange={fileSelectHandler}/>
                </div>
                <div className="submit-signup-field">
                    <button id="Signup-submit" onClick={fileUploadHandler}>Sign Up</button>
                </div>
            </div>
        </div>
    )
};

export default SignUpForm;