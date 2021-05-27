import React from "react"
import { useForm } from "react-hook-form"
import Modal from "react-modal"
import Input from "../Input"
import styles from "./styles.module.scss"
import closeImg from "../../assets/close.svg"
import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"

interface NewTransationTypes {
  amount: string
  category: string
  type: string
  description: string
}

interface NewTransactionModalProps {
  modalIsOpen: boolean
  closeModal: () => void
}

const NewTransactionModal = ({
  modalIsOpen,
  closeModal,
}: NewTransactionModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    reset,
  } = useForm<NewTransationTypes>()

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className='global__modal'
      overlayClassName='global__overlay'
      contentLabel='Profile Configuration'
    >
      <form action='' className={styles.form}>
        <img
          src={closeImg}
          alt='close'
          className={styles.form__close}
          onClick={() => closeModal()}
        />

        <h2>New Transaction</h2>

        <Input
          property={register("amount", {
            required: "Invalid First Name",
            minLength: {
              value: 2,
              message: "Must have 8 characters",
            },
          })}
          label='Amount'
          type='text'
          error={errors.amount}
          name='amount'
        />
        <Input
          property={register("description", {
            required: "Invalid First Name",
            minLength: {
              value: 2,
              message: "Must have 8 characters",
            },
          })}
          label='Category'
          type='text'
          error={errors.description}
          name='firstName'
        />

        <div className={styles.form__buttons}>
          <button className={styles.form__buttons__income}>
            <span>Income</span>
            <img src={incomeImg} alt='outcome' />
          </button>
          <button className={styles.form__buttons__outcome}>
            <span>Outcome</span>
            <img src={outcomeImg} alt='outcome' />
          </button>
        </div>

        <Input
          property={register("description", {
            required: "Invalid First Name",
            minLength: {
              value: 2,
              message: "Must have 8 characters",
            },
          })}
          label='Description'
          type='text'
          error={errors.description}
          name='firstName'
        />

        <div className={styles.form__submit}>
          <input type='submit' value='Add New Transactions' />
        </div>
      </form>
    </Modal>
  )
}

export default NewTransactionModal
