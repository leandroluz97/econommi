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
import currency from "../../utils/currency";

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
  const { openedTransaction } = useTransactions();

  const [isLoanding, setIsLoading] = useState(false);

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
              <td>
                <span
                  className={styles.single__icon}
                  style={{
                    backgroundColor: `${openedTransaction.category[0].color}`,
                  }}
                >
                  <img
                    src={openedTransaction.category[0].icon}
                    alt={openedTransaction.category[0].name}
                  />
                </span>
              </td>
              <td>{openedTransaction.category[0].name}</td>
              <td>{openedTransaction.category[0].type}</td>
              <td>{openedTransaction.createdAt}</td>
              <td>{currency(openedTransaction.amount)}</td>
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
              <td colSpan={5}>{openedTransaction.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default OpenTransaction;
