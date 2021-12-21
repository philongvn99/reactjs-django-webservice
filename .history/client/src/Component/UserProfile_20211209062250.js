import React, { useEffect, useState } from "react";
import {fireDatabase} from "../config/firebaseConfig";
import {defaultLoginComponent} from "../index.js"


const UserProfile = (props) => {
    var [userInfo, setUserInfo] = useState(props.userInfo)
    var [avatarUrl, setAvatarUrl] = useState(null)

    useEffect(()=>{
        async function getAvatarUrl() {
            fireDatabase.ref(`/avatarLink/${userInfo.username}`)
            .on('value', snapshot => {
                setAvatarUrl(snapshot.val());
            }, (errorObject) => {
                console.log('The read failed: ' + errorObject.name);
            })
        };
        getAvatarUrl()},
        [userInfo.username]
    )

    const logoutFunction = () => {
        localStorage.setItem('user', JSON.stringify({}));
        window.location.reload();
    }

    return (
        <div style={styles.profileBlock}>
            <a style={styles.modify} href="/user/modify"><img style={styles.profileAvatar} src={avatarUrl} alt="firebase-icon"></img></a>
            <div style={styles.profileField}>
                <p><i className='bx bx-mail-send'></i></p>
                <p>{userInfo.email}</p>
            </div>
            <div style={styles.profileField}>
                <p><i className='bx bx-phone'></i></p>
                <p>{userInfo.phone}</p>
            </div>
            <button id="logout-button" onClick={logoutFunction}>Log Out</button>
            
        </div>
    )
}

export default UserProfile;

const styles = {
    profileBlock: {
        display: "grid",
        fontWeight: "15px",
        fontSize: "15px",
        padding: "0px 10px",
        color: "#000"
    },

    profileField: {
        display: "inline-flex",
    },
    profileAvatar: {
        height: "80px",
        width: "80px",
        objectFit: "cover"
    },
    modify: {
        textAlign: "center",
        backgroundColor: "transparent"
    }
}