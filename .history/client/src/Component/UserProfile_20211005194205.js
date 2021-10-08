import React, { useEffect, useState } from "react";

const UserProfile = (props) => {
    var [userInfo, setUserInfo] = useState(props.userInfo)
    return (
        <div style={styles.profileBlock}>
            <img style={styles.profileAvatar} src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png" alt="firebase-icon"></img>
            <div style={styles.profileField}>
                <p><i class='bx bx-email'></i></p>
                <p>{userInfo.name}</p>
            </div>
            <div style={styles.profileField}>
                <p><i class='bx bx-gmail'></i></p>
                <p>{userInfo.email}</p>
            </div>
            <div style={styles.profileField}>
                <p><i class='bx bx-phone'></i></p>
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
        justifySelf: "center"
    },
    profileAvatar: {
        height: "60px",
        width: "60px",
        justifySelf: "center"
    }
}