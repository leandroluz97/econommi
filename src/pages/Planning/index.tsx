import React, { ChangeEvent, useState } from "react";
import styles from "./styles.module.scss";
import { useTransactions } from "../../hooks/useTransactions";
import RoundedButton from "../../components/RoundedButton";
import RoundedSearch from "../../components/RoundedSearch";
import currency from "../../utils/currency";
import searchImg from "../../assets/search.svg";
import AmountCard from "../../components/AmountCard";
import plusImg from "../../assets/plusComponent.svg";
import filterImg from "../../assets/filter.svg";
import trash from "../../assets/trash.svg";
import edit from "../../assets/Edit.svg";

import NewPlanningModal from "../../components/NewPlanningModal";

import expenses from "../../assets/expenses.svg";
import current from "../../assets/current.svg";
import revenue from "../../assets/revenue.svg";

const Planning = () => {
  const [modalIsOpenAdd, setIsOpenAdd] = useState(false);
  const [modalIsOpenEdit, setIsOpenEdit] = useState(false);
  const [search, setSearch] = useState("");
  const { transactions, deleteTransaction, editTransaction } =
    useTransactions();

  const transactionInfo = transactions.reduce(
    (acc, value) => {
      if (value.type === "income") {
        acc.income += value.amount;
      } else {
        acc.expenses += value.amount;
      }

      return acc;
    },
    { expenses: 0, income: 0 }
  );

  const total = transactionInfo.income - transactionInfo.expenses;

  function handleNewPlanning() {
    setIsOpenAdd(true);
  }
  function handleEditPlanning(id: string) {
    // editPlanning(id);
    setIsOpenEdit(true);
  }

  function closeModalAdd() {
    setIsOpenAdd(false);
  }
  function closeModalEdit() {
    setIsOpenEdit(false);
  }
  function handleSearchPlanning(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  const searched = transactions.filter((transaction) =>
    transaction.category[0].name
      .toLowerCase()
      .includes(search.toLocaleLowerCase())
  );
  return (
    <>
      <div className={styles.planning}>
        <h2>Planning</h2>
        <div className={styles.planning__buttons}>
          <div>
            <RoundedButton
              handleClick={handleNewPlanning}
              img={plusImg}
              textAlt="Plus icon"
              labelTitle="New Plan"
            />
          </div>

          <div>
            <RoundedSearch
              handleChange={handleSearchPlanning}
              img={searchImg}
              textAlt="filter icon"
              search={search}
              placeholder="Search by category"
            />
            <RoundedButton
              handleClick={handleNewPlanning}
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
                        onClick={() => handleEditPlanning(transaction.id)}
                      >
                        <img src={edit} alt="edit" />
                      </button>
                      <button onClick={() => deleteTransaction(transaction.id)}>
                        <img src={trash} alt="edit" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h3 className={styles.planning__empty}>
              You don't have any Plan yet!
            </h3>
          )}
          {transactions.length > 1 && (
            <div className={styles.transactions__cards}>
              <AmountCard type="Current Balance" amount={total} img={current} />
              <AmountCard
                type="Income"
                amount={transactionInfo.income}
                img={revenue}
              />
              <AmountCard
                type="Expenses"
                amount={transactionInfo.expenses}
                img={expenses}
              />
            </div>
          )}
        </div>
      </div>

      <NewPlanningModal
        modalIsOpen={modalIsOpenAdd}
        closeModal={closeModalAdd}
      />
      {/*modalIsOpenEdit && (
        <EditTransactionModal
          modalIsOpen={modalIsOpenEdit}
          closeModal={closeModalEdit}
        />
      )*/}
    </>
  );
};

export default Planning;
