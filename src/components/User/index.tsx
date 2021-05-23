import React from "react"
import caretdown from "../../assets/caretdown.svg"
import perfil from "../../assets/Perfil.svg"
import styles from "./styles.module.scss"
import Modal from "react-modal"
import profileIcon from "../../assets/profile-icon.svg"
import moonIcon from "../../assets/moon-icon.svg"
import shareIcon from "../../assets/share-icon.svg"
import logoutIcon from "../../assets/logout-icon.svg"
import logo from "../../assets/e.svg"

const User = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false)
  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false)
  }
  return (
    <div className={styles.wrapper}>
      <img src={logo} alt='logo' />
      <div className={styles.user}>
        <div className={styles.user__profile}>
          <button onClick={openModal} className={styles.user__dropdownBtn}>
            <img src={caretdown} alt='Caret down' />
          </button>

          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            className='user__modal'
            overlayClassName='user__overlay'
            contentLabel='Example Modal'
          >
            <div className={styles.user__dropdown}>
              <button>
                <img src={profileIcon} alt='my profile icon' />
                <span>My Profile</span>
              </button>
              <button>
                <img src={moonIcon} alt='Design Mode' />
                <span>Dark Mode</span>
              </button>
              <button>
                <img src={shareIcon} alt='my profile icon' />
                <span>Envite Friends</span>
              </button>
              <button>
                <img src={logoutIcon} alt='my profile icon' />
                <span>Logout</span>
              </button>
            </div>
          </Modal>
        </div>

        <p>Leandro Soares Luz</p>

        <img src={perfil} alt='Profile' />
      </div>
    </div>
  )
}

export default User
