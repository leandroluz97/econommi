import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import Input from "../Input";
import styles from "./styles.module.scss";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import SelectOptions from "../SelectOptions/";
import { useTransactions } from "../../hooks/useTransactions";
import { useCategories } from "../../hooks/useCategories";

interface NewTransationTypes {
  amount: string;
  category: string;
  type: string;
  description: string;
}

type Categories = {
  name: string;
  type: string;
  color: string;
  icon: string;
  id: string;
};

interface TransactionAdd {
  category: Categories[];
  type: string;
  createdAt: string;
  amount: number;
  description: string;
}

interface NewTransactionModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
}

const NewPlanningModal = ({
  modalIsOpen,
  closeModal,
}: NewTransactionModalProps) => {
  const { addNewTransactions } = useTransactions();

  const {
    getAllCategories,
    categories,
    getDefaultCategories,
    option,
    setOption,
  } = useCategories();

  const [type, setType] = useState("income");

  useEffect(() => {
    (async function () {
      await getAllCategories();
      await getDefaultCategories();
    })();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewTransationTypes>();

  async function addNewTransaction(data: NewTransationTypes) {
    try {
      const date = new Date();

      const newTransactions = {
        amount: Number(data.amount),
        category: [{ ...option }],
        type: type,
        createdAt: new Intl.DateTimeFormat("pt-PT").format(date),
      } as TransactionAdd;

      console.log(newTransactions);

      await addNewTransactions(newTransactions);

      reset();
      closeModal();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="global__modal"
      overlayClassName="global__overlay"
      contentLabel="Profile Configuration"
    >
      <form className={styles.form} onSubmit={handleSubmit(addNewTransaction)}>
        <img
          src={closeImg}
          alt="close"
          className={styles.form__close}
          onClick={() => closeModal()}
        />

        <h2>New Plan</h2>

        <div className={styles.form__select}>
          <SelectOptions
            options={categories}
            option={option}
            setOption={setOption}
          />
        </div>

        <Input
          property={register("amount", {
            required: "Invalid amount",
            minLength: {
              value: 1,
              message: "Entre a valid amount",
            },
          })}
          label="Limit Amount"
          type="number"
          error={errors.amount}
          name="amount"
        />

        {/* <Input
          property={register("description", {
            required: "Invalid Description",
            minLength: {
              value: 2,
              message: "Must have 8 characters",
            },
          })}
          label="Description"
          type="text"
          error={errors.description}
          name="description"
        />*/}
        {/*<div className={styles.form__buttons}>
          <div
            className={
              type === "income"
                ? `${styles.form__buttons__income} ${styles.activeIncome}`
                : `${styles.form__buttons__income}`
            }
            onClick={() => setType("income")}
          >
            <span>Income</span>
            <img src={incomeImg} alt="income" />
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
            <img src={outcomeImg} alt="outcome" />
          </div>
        </div>*/}

        <div className={styles.form__submit}>
          <input type="submit" value="Create Plan" />
        </div>
      </form>
    </Modal>
  );
};

export default NewPlanningModal;
