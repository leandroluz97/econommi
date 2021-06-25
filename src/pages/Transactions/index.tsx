import filterImg from "../../assets/filter.svg";
import searchImg from "../../assets/search.svg";
import trash from "../../assets/trash.svg";
import edit from "../../assets/Edit.svg";
import plusImg from "../../assets/plusComponent.svg";
import styles from "./styles.module.scss";
import RoundedButton from "../../components/RoundedButton";
import NewTransactionModal from "../../components/NewTransactionModal";
import { ChangeEvent, useEffect, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import EditTransactionModal from "../../components/EditTransactionModal";
import AmountCard from "../../components/AmountCard";
import currency from "../../utils/currency";

import expensesImg from "../../assets/expenses.svg";
import current from "../../assets/current.svg";
import revenue from "../../assets/revenue.svg";
import open from "../../assets/open.svg";
import RoundedSearch from "../../components/RoundedSearch";
import getSummary from "../../utils/summary";

import FilterTransactionModal from "../../components/FilterTransactionModal";

const Transactions = () => {
  const [modalIsOpenAdd, setIsOpenAdd] = useState(false);
  const [modalIsOpenEdit, setIsOpenEdit] = useState(false);
  const [modalIsOpenShow, setIsOpenShow] = useState(false);
  const [modalIsOpenFilter, setIsOpenFilter] = useState(false);
  const [search, setSearch] = useState("");
  const { transactions, deleteTransaction, editTransaction } =
    useTransactions();

  useEffect(() => {
    /*
    ;(async function () {
      await getAllCategories()
      await getDefaultCategories()
    })()
    */
    //console.log(transactions);
  }, []);

  const { total, income, expenses } = getSummary(transactions);

  //handle open modal
  function handleNewTransaction() {
    setIsOpenAdd(true);
  }

  function handleOpenTransaction(id: string) {
    //editTransaction(id);
    setIsOpenShow(true);
  }

  function handleEditTransaction(id: string) {
    editTransaction(id);
    setIsOpenEdit(true);
  }

  function handleFilterTransaction() {
    setIsOpenFilter(true);
  }

  //handle close modal
  function closeModalAdd() {
    setIsOpenAdd(false);
  }

  function closeModalEdit() {
    setIsOpenEdit(false);
  }

  function closeModalFilter() {
    setIsOpenFilter(false);
  }

  function handleSearchTransaction(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

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
          <div>
            <RoundedButton
              handleClick={handleNewTransaction}
              img={plusImg}
              textAlt="Plus icon"
              labelTitle="New transaction"
            />
          </div>

          <div>
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
                        onClick={() => handleOpenTransaction(transaction.id)}
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
              <AmountCard type="Current Balance" amount={total} img={current} />
              <AmountCard type="Income" amount={income} img={revenue} />
              <AmountCard type="Expenses" amount={expenses} img={expensesImg} />
            </div>
          )}
        </div>
      </div>

      <NewTransactionModal
        modalIsOpen={modalIsOpenAdd}
        closeModal={closeModalAdd}
      />
      {modalIsOpenEdit && (
        <EditTransactionModal
          modalIsOpen={modalIsOpenEdit}
          closeModal={closeModalEdit}
        />
      )}
      <FilterTransactionModal
        modalIsOpen={modalIsOpenFilter}
        closeModal={closeModalFilter}
      />
    </>
  );
};

export default Transactions;
