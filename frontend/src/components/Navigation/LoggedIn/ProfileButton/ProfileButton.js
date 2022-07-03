import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import * as sessionActions from "../../../../store/session";
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
      <div className="icon-box">
        <div className="profile-section" onClick={openMenu}>
          <button className="iconBtn">
            <i className="fas fa-user-circle" />
          </button>
          <div className="username-text">{user.username}</div>
        </div>
        {showMenu && (
          <ul className="profile-dropdown">
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button className="logoutBtn" onClick={logout}>
                Log Out
              </button>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
