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
import Spinner from "../../components/Spinner";
import firebase from "../../config/firebase-config";

interface EditTransationTypes {
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

interface TransactionEdit {
  category: Categories[];
  type: string;
  createdAt: string;
  amount: number;
  description: string;
}

interface EditTransactionModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
}

const EditTransactionModal = ({
  modalIsOpen,
  closeModal,
}: EditTransactionModalProps) => {
  const { updateTransaction, editStorage } = useTransactions();

  const { getAllCategories, categories, getDefaultCategories } =
    useCategories();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<EditTransationTypes>();

  const [category] = editStorage.category;
  const [isLoanding, setIsLoading] = useState(false);

  const [type, setType] = useState(editStorage.type);
  const [option, setOption] = useState(category);

  useEffect(() => {
    (async function () {
      await getAllCategories();
      await getDefaultCategories();
    })();
    setValue("amount", String(editStorage.amount), { shouldValidate: true });
    setValue("description", editStorage.description, { shouldValidate: true });
  }, []);

  async function updatedTransaction(data: EditTransationTypes) {
    setIsLoading(true);
    try {
      const date = new Date();

      const updatedTransactions = {
        amount: Number(data.amount),
        category: [{ ...option }],
        type: type,
        description: data.description,
        createdAt: editStorage.createdAt,
      } as TransactionEdit;

      await updateTransaction(updatedTransactions);

      reset();
      closeModal();
      setIsLoading(false);
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
      <form className={styles.form} onSubmit={handleSubmit(updatedTransaction)}>
        <img
          src={closeImg}
          alt="close"
          className={styles.form__close}
          onClick={() => closeModal()}
        />

        <h2>Edit Transaction</h2>

        <Input
          property={register("amount", {
            required: "Invalid amount",
            minLength: {
              value: 2,
              message: "Must have 8 characters",
            },
          })}
          label="Amount"
          type="number"
          error={errors.amount}
          name="amount"
        />

        <div>
          <SelectOptions
            options={categories}
            option={option}
            setOption={setOption}
          />
        </div>

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
            <img src={incomeImg} alt="income" />
          </div>
          <div
            className={
              type === "expenses"
                ? `${styles.form__buttons__outcome} ${styles.activeOutcome}`
                : `${styles.form__buttons__outcome}`
            }
            onClick={() => setType("expenses")}
          >
            <span>Outcome</span>
            <img src={outcomeImg} alt="expenses" />
          </div>
        </div>

        <Input
          property={register("description", {
            required: "Invalid First Name",
            minLength: {
              value: 2,
              message: "Must have 8 characters",
            },
          })}
          label="Description"
          type="text"
          error={errors.description}
          name="firstName"
        />

        <div className={styles.form__submit}>
          {!isLoanding && <input type="submit" value={"UPDATE TRANSACTION"} />}
          {isLoanding && <Spinner />}
        </div>
      </form>
    </Modal>
  );
};

export default EditTransactionModal;
