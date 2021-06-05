import React, { useState } from "react"
import styles from "./styles.module.scss"
import caretdown from "../../assets/caretdown.svg"
import Modal from "react-modal"

type Categories = {
  name: string
  type: string
  color: string
  icon: string
  id: string
}
interface SelectOptionsProps {
  options: Categories[]
  option: Categories
  setOption: (data: Categories) => void
}

const SelectOptions = ({ options, option, setOption }: SelectOptionsProps) => {
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
          <ul className={styles.select__options}>
            {options.map((option) => (
              <li key={option.id} onClick={() => handleClick(option)}>
                <span
                  className={styles.select__icon}
                  style={{ backgroundColor: `${option.color}` }}
                >
                  <img src={option.icon} alt={option.name} />
                </span>
                <span>{option.name}</span>
              </li>
            ))}
          </ul>
        </Modal>
        <img src={caretdown} alt='dropdown' onClick={() => openModal()} />
      </div>
    </div>
  )
}

export default SelectOptions
