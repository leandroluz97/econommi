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

import expensesImg from "../../assets/expenses.svg";
import currentImg from "../../assets/current.svg";
import revenueImg from "../../assets/revenue.svg";
import { usePlanning } from "../../hooks/usePlanning";
import getSummary from "../../utils/summary";

const Planning = () => {
  const [modalIsOpenAdd, setIsOpenAdd] = useState(false);
  const [modalIsOpenEdit, setIsOpenEdit] = useState(false);
  const [search, setSearch] = useState("");
  const { transactions } = useTransactions();
  const { plannings, deletePlanning } = usePlanning();

  type Categories = {
    name: string;
    type: string;
    color: string;
    icon: string;
    id: string;
  };

  interface PlanType {
    category: Categories[];
    createdAt: string;
    amount: number;
  }

  const { total, income, expenses } = getSummary(transactions);

  function getTrans(identifier: string) {
    const allTransacategory = transactions
      .filter((transaction) => {
        return transaction.category[0].name === identifier;
      })
      .reduce((acc, value) => {
        return acc + value.amount;
      }, 0);

    return allTransacategory;
  }

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

  const searched = plannings.filter((plan) =>
    plan.category[0].name.toLowerCase().includes(search.toLocaleLowerCase())
  );

  function progressBar(plan: PlanType) {
    // const value =  getTrans(plan.category[0].name ) * 100 / plan.amount

    let styles = {
      width: `${(getTrans(plan.category[0].name) * 100) / plan.amount}%`,
      backgroundColor: plan.amount < 70 ? "#DE5A5A" : "#5386E9",
      display: "block",
      height: "20px",
      borderRadius: "100px",
    };
    return styles;
  }
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
        <div className={styles.planning__infos}>
          {plannings.length >= 1 ? (
            <table className={styles.planning__table}>
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
                {searched.map((plan) => (
                  <tr key={plan.id}>
                    <td>
                      <span
                        className={styles.planning__icon}
                        style={{
                          backgroundColor: `${plan.category[0].color}`,
                        }}
                      >
                        <img
                          src={plan.category[0].icon}
                          alt={plan.category[0].name}
                        />
                      </span>
                    </td>
                    <td>{plan.category[0].name}</td>

                    <td>{plan.createdAt}</td>
                    <td>{currency(plan.amount)}</td>
                    <td>
                      <span className={styles.planning__progress}>{`${
                        (getTrans(plan.category[0].name) * 100) / plan.amount
                      }%`}</span>
                      <span className={styles.planning__outer}>
                        <span style={{ ...progressBar(plan) }}></span>
                      </span>
                    </td>
                    <td>
                      <button onClick={() => handleEditPlanning(plan.id)}>
                        <img src={edit} alt="edit" />
                      </button>
                      <button onClick={() => deletePlanning(plan.id)}>
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
          {plannings.length >= 1 && (
            <div className={styles.planning__cards}>
              <AmountCard
                type="Current Balance"
                amount={total}
                img={currentImg}
              />
              <AmountCard type="Income" amount={income} img={revenueImg} />
              <AmountCard type="Expenses" amount={expenses} img={expensesImg} />
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
