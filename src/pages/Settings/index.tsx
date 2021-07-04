import { useState } from "react";
import styles from "./styles.module.scss";

import edit from "../../assets/editBig.svg";
import perfil from "../../assets/Perfil.svg";

import RoundedButton from "../../components/RoundedButton";
import EditSettingsModal from "../../components/EditSettingModal";

import { useAuth } from "../../hooks/useAuth";

const Settings = () => {
  //ui state
  const [modalIsOpenEdit, setIsOpenEdit] = useState(false);

  //hooks
  const { currentUser } = useAuth();

  //open edit modal
  function handleEditSettings() {
    setIsOpenEdit(true);
  }

  //close edit modal
  function closeModalEdit() {
    setIsOpenEdit(false);
  }

  return (
    <>
      <div className={styles.settings}>
        <h2>Settings</h2>
        <div className={styles.settings__buttons}>
          <RoundedButton
            handleClick={handleEditSettings}
            img={edit}
            textAlt="Edit informations"
            labelTitle="Update informations"
          />
        </div>

        <div className={styles.settings__wrapper}>
          <div className={styles.settings__group}>
            <span>Profile Image</span>
            <img src={currentUser?.photoURL || perfil} alt="" />
          </div>
          <div className={styles.settings__group}>
            <span>Display Name</span>
            <p>{currentUser?.displayName || "..."} </p>
          </div>
          <div className={styles.settings__group}>
            <span>First Name</span>
            <p>{currentUser?.firstName || "..."}</p>
          </div>
          <div className={styles.settings__group}>
            <span>Last Name</span>
            <p>{currentUser?.lastName || "..."}</p>
          </div>

          <div className={styles.settings__group}>
            <span>Email</span>
            <p>{currentUser?.email} </p>
          </div>
        </div>
      </div>
      {modalIsOpenEdit && (
        <EditSettingsModal
          modalIsOpen={modalIsOpenEdit}
          closeModal={closeModalEdit}
        />
      )}
    </>
  );
};

export default Settings;
