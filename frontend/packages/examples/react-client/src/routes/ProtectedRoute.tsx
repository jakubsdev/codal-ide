import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile.js";

const ProtectedRoute = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Profile | CODAL Online IDE";

        const getUser = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/auth/userdata",
                    {
                        withCredentials: true,
                    }
                );
                setUser(res.data);
            } catch (err) {
                console.log(err);
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            }
        };

        getUser();
    }, []);

    return (
        <div>
            {Object.keys(user).length === 0 ? (
                <p>Loading...</p>
            ) : (
                <Profile user={user} />
            )}
        </div>
    );
};

export default ProtectedRoute;
