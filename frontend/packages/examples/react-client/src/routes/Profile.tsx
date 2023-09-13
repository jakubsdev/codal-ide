import React, { useState } from "react";
import Navbar from "../Navbar.jsx";
import "./Profile.css";
import UserSnippets from "../UserSnippets.jsx";

const Profile = (props: { user: Object }) => {
    const [user, setUser] = useState(props.user);

    return (
        <div className="profile">
            <Navbar user={user} />
            <UserSnippets user={user} />
        </div>
    );
};

export default Profile;
