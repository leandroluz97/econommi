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

const OpenTransaction = ({
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
      className="global__modal"
      overlayClassName="global__overlay"
      contentLabel="Profile Configuration"
    >
      <div className={styles.single}>
        <img
          src={closeImg}
          alt="close"
          className={styles.single__close}
          onClick={() => closeModal()}
        />

        <h2>New Transaction</h2>

        <table>
          <thead>
            <tr>
              <th>Icon</th>
              <th>Category</th>
              <th>Type</th>
              <th>Date</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>Viagem</td>
              <td>Expenses</td>
              <td>12/03/2021</td>
              <td>25,56€</td>
            </tr>
          </tbody>

          <thead>
            <tr>
              <th colSpan={5} className={styles.single__head}>
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5}>
                It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default OpenTransaction;
