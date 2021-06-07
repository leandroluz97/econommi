import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Modal from "react-modal"
import Input from "../Input"
import styles from "./styles.module.scss"
import closeImg from "../../assets/close.svg"
import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"
import SelectOptions from "../SelectOptions/"
import { useTransactions } from "../../hooks/useTransactions"
import { useCategories } from "../../hooks/useCategories"

interface NewCategoryTypes {
  name: string
  color: string
  type: string
  icon: string
}

type Categories = {
  name: string
  type: string
  color: string
  icon: string
  id: string
}

interface CategoryAdd {
  name:string
  type: string
  color:string
  icon:string
}

interface NewCategoryModalProps {
  modalIsOpen: boolean
  closeModal: () => void
}

const NewCategoryModal = ({
  modalIsOpen,
  closeModal,
}: NewCategoryModalProps) => {
  const { addNewTransactions } = useTransactions()
  
  const {
    getAllCategories,
    categories,
    defaultCategory,
    getDefaultCategories,
    option,
    setOption
  } = useCategories()

  const [type, setType] = useState("income")
  

  useEffect(() => {
    
    (async function () {
      /*
      await getAllCategories()
      await getDefaultCategories()
      */
    })()
    
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewCategoryTypes>()

  async function addNewCategory(data: NewCategoryTypes) {
    try {
      const date = new Date()

      const category = {
        name: data.name,
        type: type,
        color: data.color,
        icon: data.icon
      
      } as CategoryAdd

   
      
      //await addNewTransactions(newTransactions)

      reset()
      closeModal()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className='global__modal'
      overlayClassName='global__overlay'
      contentLabel='Profile Configuration'
    >
      <form className={styles.form} onSubmit={handleSubmit(addNewCategory)}>
        <img
          src={closeImg}
          alt='close'
          className={styles.form__close}
          onClick={() => closeModal()}
        />

        <h2>New Category</h2>

        <Input
          property={register("name", {
            required: "Invalid Name",
            minLength: {
              value: 4,
              message: "Must have 4 characters",
            },
          })}
          label='Name'
          type='text'
          error={errors.name}
          name='firstName'
        />

        <div className={styles.form__buttons}>
          <div
            className={
              type === "income"
                ? `${styles.form__buttons__income} ${styles.activeIncome}`
                : `${styles.form__buttons__income}`
            }
            onClick={() => setType("income")}
          >
            <span>Income</span>
            <img src={incomeImg} alt='income' />
          </div>
          <div
            className={
              type === "outcome"
                ? `${styles.form__buttons__outcome} ${styles.activeOutcome}`
                : `${styles.form__buttons__outcome}`
            }
            onClick={() => setType("outcome")}
          >
            <span>Outcome</span>
            <img src={outcomeImg} alt='outcome' />
          </div>
        </div>

        

        <div className={styles.form__submit}>
          <input type='submit' value='Add New Transactions' />
        </div>
      </form>
    </Modal>
  )
}

export default NewCategoryModal