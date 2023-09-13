import React, { useEffect, useState } from "react";
import "./Navbar.css";
import axios from "axios";
import { LogoSvg } from "./logo";
import { useNavigate } from "react-router-dom";

const UserInfo = ({ user, styleName, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styleName} onClick={() => setOpen(!open)}>
      <img
        referrerPolicy="no-referrer"
        src={user.image}
        alt="user avatar"
        className="avatar"
      />
      <p>{user.displayName}</p>
      <ul className={`dropdown ${open ? "active" : "inactive"}`}>{children}</ul>
    </div>
  );
};

const DropdownItem = ({ icon, text, onClick }) => {
  return (
    <li onClick={onClick} className="dropdown-item">
      {icon} {text}
    </li>
  );
};

const Navbar = (props) => {
  const [user, setUser] = useState(props);
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  const login = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const logout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/logout",
        {},
        {
          withCredentials: true,
        }
      );
      window.location.href = "/";
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        <LogoSvg />
      </div>

      <p>CODAL</p>
      <p className="heading-secondary">Code Editor</p>

      {props.user ? (
        <UserInfo styleName="logged-btn" user={props.user}>
          <a href="/profile">
            <DropdownItem icon="" text="Profile" />
          </a>
          <DropdownItem onClick={logout} icon="" text="Logout" />
        </UserInfo>
      ) : (
        <button className="login-btn" onClick={() => login()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M12 11h8.533c.044.385.067.78.067 1.184 0 2.734-.98 5.036-2.678 6.6-1.485 1.371-3.518 2.175-5.942 2.175A8.976 8.976 0 0 1 3 11.98 8.976 8.976 0 0 1 11.98 3c2.42 0 4.453.89 6.008 2.339L16.526 6.8C15.368 5.681 13.803 5 12 5a7 7 0 1 0 0 14c3.526 0 6.144-2.608 6.577-6H12v-2z"
              fill="rgba(255,255,255,1)"
            />
          </svg>
          Login with Google
        </button>
      )}
    </div>
  );
};

export default Navbar;
