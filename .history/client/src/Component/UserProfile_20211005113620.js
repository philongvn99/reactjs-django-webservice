import React, { useEffect, useState } from "react";

const UserProfile = (props) => {
    var [userInfo, setUserInfo] = useState(props.userInfo)
    return (
        <>
            <img className="profile-avatar" src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png" alt="firebase-icon"></img>
            <div className={style.profileField}>
                <h3>Name: </h3>
                <p>{userInfo.name}</p>
            </div>
            <div className={style.profileField}>
                <h3>Email: </h3>
                <p>{userInfo.email}</p>
            </div>
            <div className={style.profileField}>
                <h3>Phone: </h3>
                <p>{userInfo.phone}</p>
            </div>
        </>
    )
}

export default UserProfile;

const style = {
    profileField: {
        display: "inline-block"
    }
}