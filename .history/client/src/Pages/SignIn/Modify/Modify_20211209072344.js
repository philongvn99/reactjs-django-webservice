import React, {useState, useEffect} from "react";
import {fireDatabase, storage} from "../../../config/firebaseConfig";
import axios from "axios";
import "./modify.css"

const SignUpForm = (props) => {
    const [selectedFile, setSelectedFIle] = useState(null)
    const [userInfo, setUserInfo] = useState({username: "", email:"", phone: "", name:"", password:"", c_password: ""})
    
    useEffect(() => {
            async function getUser()  {
                const userInfo = JSON.parse(localStorage.getItem('user'));
                setUserInfo({ ...userInfo, username: userInfo.username, email: userInfo.email, phone: userInfo.phone, name: userInfo.name });
            }
            getUser();
        }, []
    )
    
    const fileSelectHandler = (event) => {
        console.log(event.target.files)
        setSelectedFIle(event.target.files[0])
    }

    const fileUploadHandler = () => {
        if(selectedFile == null) return;
        const userInfo = JSON.parse(localStorage.getItem('user'))
        if (Object.keys(userInfo).length > 0) {
            storage.ref(`/${selectedFile.name}`).put(selectedFile)
            .on(
                "state_changed" , 
                function progress(snapshot) {
                    console.log(snapshot)   
                    fireDatabase.ref(`/avatarLink/${userInfo.username}`)
                    .set(
                        `https://firebasestorage.googleapis.com/v0/b/plfirebase-cc1f1.appspot.com/o/${selectedFile.name}?alt=media`
                    )                    
                    .catch(error => ({
                        errorCode: error.code,
                        errorMessage: error.message
                    }));
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

    const submitHandler = () => {}

    return (
        <div id="signup-background">
            <div id="signup-form">
                <h1>Modify</h1>
                <div className="submit-signup-field">
                    <label htmlFor="UserName">Username</label>
                    <input 
                        id="signup-username"
                        type="text"
                        value={userInfo.username}
                        onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                        />
                </div>
                <div className="submit-signup-field">
                    <label htmlFor="Email">Email</label>
                    <input 
                        id="signup-email"
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        />
                </div>
                <div className="submit-signup-field">
                    <label htmlFor="Phone Number">Name</label>
                    <input 
                        id="signup-phone"
                        type="number"
                        value={userInfo.phone}
                        onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                        />
                </div>
                <div className="submit-signup-field">
                    <label htmlFor="Name">Name</label>
                    <input 
                        id="signup-name"
                        type="text"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                        />
                </div>
                <div className="submit-signup-field">
                    <label htmlFor="Password">Password</label>
                    <input 
                        id="signup-password" 
                        type="password" 
                        onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                        />
                </div>
                <div className="submit-signup-field">
                    <label htmlFor="Confirm Password">Confirm Password</label>
                    <input 
                        id="signup-confirm-password" 
                        type="password" 
                        placeholder={userInfo.c_password}
                        onChange={(e) => setUserInfo({ ...userInfo, c_password: e.target.value })}
                        />
                </div>
                <div className="submit-signup-field">
                    <button id="Signup-submit" onClick={submitHandler}>Modify</button>
                </div>
            </div>
        </div>
    )
};

export default SignUpForm;