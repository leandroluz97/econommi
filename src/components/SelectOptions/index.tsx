import React, { useState } from "react"
import styles from "./styles.module.scss"
import close from "../../assets/close.svg"
import Modal from "react-modal"

const SelectOptions = ({ options, option, setOption }: any) => {
  const [ui, setUi] = useState<Boolean>(false)
  const [modalIsOpen, setIsOpen] = useState(false)

  function handleClick(option: any) {
    closeModal()
    setOption(option)
  }

  function handleNewTransactions() {
    setIsOpen(true)
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }
  return (
    <div className={styles.backdrop}>
      <div className={styles.select}>
        <input value={option.name} readOnly onClick={() => openModal()} />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className='new__modal'
          overlayClassName='new__overlay'
          contentLabel='Profile Configuration'
        >
          <ul style={modalIsOpen ? { display: "block" } : { display: "none" }}>
            {options.map((option: any, index: number) => (
              <li key={index} onClick={() => handleClick(option)}>
                {option.name}
              </li>
            ))}
          </ul>
        </Modal>
        <img src={close} alt='' />
      </div>
    </div>
  )
}

export default SelectOptions
