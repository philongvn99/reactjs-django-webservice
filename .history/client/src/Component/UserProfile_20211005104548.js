import { useEffect, useState } from "react";

const UserProfile = (props) => {
    var [userInfo, setUserInfo] = useState(props.userInfo)
    return (
        <>
            <img src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png" alt="firebase-icon"></img>
            <div class="profile-field">
                <p>Name</p>

            </div>
        </>
    )
}

export default UserProfile;