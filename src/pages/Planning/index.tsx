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
import EditPlanningModal from "../../components/EditPlanningModal";

import expensesImg from "../../assets/expenses.svg";
import currentImg from "../../assets/current.svg";
import revenueImg from "../../assets/revenue.svg";
import { usePlanning } from "../../hooks/usePlanning";
import getSummary from "../../utils/summary";
import filterCategoryAmount from "../../utils/filterCategoryAmount";

const Planning = () => {
  const [modalIsOpenAdd, setIsOpenAdd] = useState(false);
  const [modalIsOpenEdit, setIsOpenEdit] = useState(false);
  const [search, setSearch] = useState("");
  const { transactions } = useTransactions();
  const { plannings, deletePlanning, editPlanning } = usePlanning();

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

  function handleNewPlanning() {
    setIsOpenAdd(true);
  }
  function handleEditPlanning(id: string) {
    editPlanning(id);
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
    const filterAmount = filterCategoryAmount(
      plan.category[0].name,
      transactions
    );

    const filteredAmount = Math.round((filterAmount * 100) / plan.amount);
    /*
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification("Hi there!", {
        body: "Have a good day",
        icon: "./img/goodday.png",
      });
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification("Hi there!", {
            body: "Have a good day",
            icon: "./img/goodday.png",
          });
        }
      });
    }
*/
    let styles = {
      width: `${filteredAmount}%`,
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
                  <th>Expended Amount</th>
                  <th>Limit Amount</th>
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

                    <td>
                      {currency(
                        filterCategoryAmount(
                          plan.category[0].name,
                          transactions
                        )
                      )}
                    </td>
                    <td>{currency(plan.amount)}</td>
                    <td>
                      <span
                        className={styles.planning__progress}
                      >{`${Math.round(
                        (filterCategoryAmount(
                          plan.category[0].name,
                          transactions
                        ) *
                          100) /
                          plan.amount
                      )}%`}</span>
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
      {modalIsOpenEdit && (
        <EditPlanningModal
          modalIsOpen={modalIsOpenEdit}
          closeModal={closeModalEdit}
        />
      )}
    </>
  );
};

export default Planning;
