import { ChangeEvent, useState } from "react";
import styles from "./styles.module.scss";

import filterImg from "../../assets/filter.svg";
import searchImg from "../../assets/search.svg";
import trash from "../../assets/trash.svg";
import edit from "../../assets/Edit.svg";
import plusImg from "../../assets/plusComponent.svg";
import expensesImg from "../../assets/expenses.svg";
import current from "../../assets/current.svg";
import revenue from "../../assets/revenue.svg";
import open from "../../assets/open.svg";

import RoundedButton from "../../components/RoundedButton";
import NewTransactionModal from "../../components/NewTransactionModal";
import EditTransactionModal from "../../components/EditTransactionModal";
import AmountCard from "../../components/AmountCard";
import RoundedSearch from "../../components/RoundedSearch";
import OpenTransaction from "../../components/OpenTransaction";
import FilterModal from "../../components/FilterModal";

import currency from "../../utils/currency";
import getSummary from "../../utils/summary";
import firebase from "../../config/firebase-config";

import { useUI } from "../../hooks/useUi";
import { useTransactions } from "../../hooks/useTransactions";

type Categories = {
  name: string;
  type: string;
  color: string;
  icon: string;
  id: string;
};

interface Transaction {
  category: Categories[];
  type: string;
  createdAt: string;
  amount: number;
  description: string;
  id: string;
  timestamp?: firebase.firestore.Timestamp;
}

const Transactions = () => {
  //ui States
  const [modalIsOpenEdit, setIsOpenEdit] = useState(false);
  const [modalIsOpenShow, setIsOpenShow] = useState(false);
  const [modalIsOpenFilter, setIsOpenFilter] = useState(false);

  //data state
  const [search, setSearch] = useState("");

  //Custom hooks
  const { modalIsOpenAdd, setIsOpenAdd } = useUI();
  const {
    transactions,
    deleteTransaction,
    editTransaction,
    setOpenedTransaction,
  } = useTransactions();

  //functions utilities
  const { total, income, expenses } = getSummary(transactions);

  //handle new transaction modal
  function handleNewTransaction() {
    setIsOpenAdd(true);
  }

  function closeModalAdd() {
    setIsOpenAdd(false);
  }

  //Handle Open Transaction
  function handleOpenTransaction(transaction: Transaction) {
    setOpenedTransaction(transaction);
    setIsOpenShow(true);
  }

  function closeModalOpen() {
    setIsOpenShow(false);
  }

  //Handle edit modal
  function handleEditTransaction(id: string) {
    editTransaction(id);
    setIsOpenEdit(true);
  }

  function closeModalEdit() {
    setIsOpenEdit(false);
  }

  //Handle  Filter transaction
  function handleFilterTransaction() {
    setIsOpenFilter(true);
  }

  function closeModalFilter() {
    setIsOpenFilter(false);
  }

  //handle input search on change
  function handleSearchTransaction(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  //typing search filter
  const searched = transactions.filter((transaction) =>
    transaction.category[0].name
      .toLowerCase()
      .includes(search.toLocaleLowerCase())
  );

  return (
    <>
      <div className={styles.transactions}>
        <h2>Transactions</h2>
        <div className={styles.transactions__buttons}>
          <div className={styles.transactions__left}>
            <RoundedButton
              handleClick={handleNewTransaction}
              img={plusImg}
              textAlt="Plus icon"
              labelTitle="New transaction"
            />
          </div>

          <div className={styles.transactions__right}>
            <RoundedSearch
              handleChange={handleSearchTransaction}
              img={searchImg}
              textAlt="filter icon"
              search={search}
              placeholder="Search by category"
            />
            <RoundedButton
              handleClick={handleFilterTransaction}
              img={filterImg}
              textAlt="filter icon"
              labelTitle="Filter"
            />
          </div>
        </div>
        <div className={styles.transactions__infos}>
          {transactions.length >= 1 ? (
            <table className={styles.transactions__table}>
              <thead>
                <tr>
                  <th></th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {searched.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>
                      <span
                        className={styles.transactions__icon}
                        style={{
                          backgroundColor: `${transaction.category[0].color}`,
                        }}
                      >
                        <img
                          src={transaction.category[0].icon}
                          alt={transaction.category[0].name}
                        />
                      </span>
                    </td>
                    <td>{transaction.category[0].name}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.createdAt}</td>
                    <td>{currency(transaction.amount)}</td>
                    <td>
                      <button
                        className={styles.transactions__action}
                        onClick={() => handleOpenTransaction(transaction)}
                      >
                        <img src={open} alt="open" />
                      </button>
                      <button
                        className={styles.transactions__action}
                        onClick={() => handleEditTransaction(transaction.id)}
                      >
                        <img src={edit} alt="edit" />
                      </button>
                      <button
                        className={styles.transactions__action}
                        onClick={() => deleteTransaction(transaction.id)}
                      >
                        <img src={trash} alt="delete" />

                        <div className={styles.transactions__actions}></div>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h3 className={styles.transactions__empty}>
              You don't have any transactions.
            </h3>
          )}
          {transactions.length >= 1 && (
            <div className={styles.transactions__cards}>
              <AmountCard
                type="Current Balance"
                amount={total}
                img={current}
                cardTitle="Current balance of this month."
              />
              <AmountCard
                type="Income"
                amount={income}
                img={revenue}
                cardTitle="Total amount of income submitted this month."
              />
              <AmountCard
                type="Expenses"
                amount={expenses}
                img={expensesImg}
                cardTitle="Total amount of expenses submitted this month."
              />
            </div>
          )}
        </div>
      </div>

      {modalIsOpenShow && (
        <NewTransactionModal
          modalIsOpen={modalIsOpenAdd}
          closeModal={closeModalAdd}
        />
      )}
      {modalIsOpenEdit && (
        <EditTransactionModal
          modalIsOpen={modalIsOpenEdit}
          closeModal={closeModalEdit}
        />
      )}

      {modalIsOpenShow && (
        <OpenTransaction
          modalIsOpen={modalIsOpenShow}
          closeModal={closeModalOpen}
        />
      )}
      <FilterModal
        title="Filter Transaction by Month"
        modalIsOpen={modalIsOpenFilter}
        closeModal={closeModalFilter}
      />
    </>
  );
};

export default Transactions;
