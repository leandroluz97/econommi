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
import CalendarFilter from "../CalendarFilter";

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

const FilterTransactionModal = ({
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
  const [isLoanding, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      const newTransactions = {
        amount: Number(data.amount),
        category: [{ ...option }],
        type: type,
        description: data.description,
        // createdAt: new Intl.DateTimeFormat("pt-PT").format(date),
        createdAt: String(new Date()),
      } as TransactionAdd;

      await addNewTransactions(newTransactions);

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
      className="filter__modal modal--fade"
      overlayClassName="filter__overlay"
      contentLabel="Profile Configuration"
    >
      <form className={styles.form} onSubmit={handleSubmit(addNewTransaction)}>
        <img
          src={closeImg}
          alt="close"
          className={styles.form__close}
          onClick={() => closeModal()}
        />

        <h2>Filter transaction Transaction</h2>

        <CalendarFilter closeCalendar={closeModal} />
        {/*
          <div className={styles.form__submit}>
            {!isLoanding && (
              <input type="submit" value={"ADD NEW TRANSACTION"} />
            )}
            {isLoanding && <Spinner />}
          </div>
            */}
      </form>
    </Modal>
  );
};

export default FilterTransactionModal;
