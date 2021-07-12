import React, { useState } from "react";
import caretdown from "../../assets/caretdown.svg";
import perfil from "../../assets/Perfil.svg";
import styles from "./styles.module.scss";
import Modal from "react-modal";
import profileIcon from "../../assets/profile-icon.svg";
import moonIcon from "../../assets/moon-icon.svg";
import shareIcon from "../../assets/share-icon.svg";
import logoutIcon from "../../assets/logout-icon.svg";
import logo from "../../assets/e.svg";
import firebase from "../../config/firebase-config";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const User = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { setCurrentUser, currentUser } = useAuth();

  let history = useHistory();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleLogout() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setCurrentUser(null);
        history.push("/login");
      });
  }

  const photoURL = currentUser?.photoURL;

  return (
    <div className={styles.wrapper}>
      <img src={logo} alt="logo" />
      <div className={styles.user}>
        <div className={styles.user__profile}>
          <button onClick={openModal} className={styles.user__dropdownBtn}>
            <img src={caretdown} alt="Caret down" />
          </button>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="user__modal"
            overlayClassName="user__overlay"
            contentLabel="Profile Configuration"
          >
            <div className={styles.user__dropdown}>
              <Link to="/settings" onClick={closeModal}>
                <img src={profileIcon} alt="my profile icon" />
                <span>My Profile</span>
              </Link>
              <button onClick={closeModal}>
                <img src={moonIcon} alt="Design Mode" />
                <span>Dark Mode</span>
              </button>
              <Link to="/share" onClick={closeModal}>
                <img src={shareIcon} alt="my profile icon" />
                <span>Envite Friends</span>
              </Link>
              <button onClick={handleLogout}>
                <img src={logoutIcon} alt="my profile icon" />
                <span>Logout</span>
              </button>
            </div>
          </Modal>
        </div>

        <p>{currentUser?.displayName || currentUser?.email}</p>

        <img
          src={photoURL || perfil}
          alt="Profile"
          className={styles.user__photoURL}
        />
      </div>
    </div>
  );
};

export default User;
