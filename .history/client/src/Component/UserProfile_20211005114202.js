import React, { useEffect, useState } from "react";

const UserProfile = (props) => {
    var [userInfo, setUserInfo] = useState(props.userInfo)
    return (
        <div style={styles.profileAvatar}>
            <img style={styles.profileAvatar} src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png" alt="firebase-icon"></img>
            <div style={styles.profileField}>
                <h3>Name: </h3>
                <p>{userInfo.name}</p>
            </div>
            <div style={styles.profileField}>
                <h3>Email: </h3>
                <p>{userInfo.email}</p>
            </div>
            <div style={styles.profileField}>
                <h3>Phone: </h3>
                <p>{userInfo.phone}</p>
            </div>
        </div>
    )
}

export default UserProfile;

const styles = {
    profileField: {
        display: "inline-flex"
    },
    profileAvatar: {
        height: "60px",
        width: "60px"
    }
}