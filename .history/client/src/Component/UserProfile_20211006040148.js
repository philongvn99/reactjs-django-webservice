import React, { useEffect, useState } from "react";
import firebase from "firebase";


const UserProfile = (props) => {
    var [userInfo, setUserInfo] = useState(props.userInfo)
    var [avatarUrl, setAvatarUrl] = useState(null)

    const fireDatabase = firebase.database()
    const ref = fireDatabase.ref(`/avatarLink/${userInfo.username}`)
    .on('value', snapshot => {
        setAvatarUrl(snapshot.val());
    }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
    });

    return (
        <div style={styles.profileBlock}>
            <img style={styles.profileAvatar} src={avatarUrl} alt="firebase-icon"></img>
            <div style={styles.profileField}>
                <p><i className='bx bx-mail-send'></i></p>
                <p>{userInfo.email}</p>
            </div>
            <div style={styles.profileField}>
                <p><i className='bx bx-phone'></i></p>
                <p>{userInfo.phone}</p>
            </div>
        </div>
    )
}

export default UserProfile;

const styles = {
    profileBlock: {
        display: "grid",
    },

    profileField: {
        display: "inline-flex",
    },
    profileAvatar: {
        height: "60px",
        width: "60px",
        justifySelf: "center"
    }
}