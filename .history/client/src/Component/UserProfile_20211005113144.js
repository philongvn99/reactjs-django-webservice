import React, { useEffect, useState } from "react";

const UserProfile = (props) => {
    var [userInfo, setUserInfo] = useState(props.userInfo)
    return (
        <>
            <img src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png" alt="firebase-icon"></img>
            <div class="profile-field">
                <h3>Name: </h3>
                <p>{userInfo.name}</p>
            </div>
            <div class="profile-field">
                <h3>Email: </h3>
                <p>{userInfo.email}</p>
            </div>
            <div class="profile-field">
                <h3>Phone: </h3>
                <p>{userInfo.phone}</p>
            </div>
        </>
    )
}

export default UserProfile;