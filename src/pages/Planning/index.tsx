import { ChangeEvent, useState } from "react";

import styles from "./styles.module.scss";

import searchImg from "../../assets/search.svg";
import plusImg from "../../assets/plusComponent.svg";
import filterImg from "../../assets/filter.svg";
import trash from "../../assets/trash.svg";
import edit from "../../assets/Edit.svg";
import expensesImg from "../../assets/expenses.svg";
import currentImg from "../../assets/current.svg";
import revenueImg from "../../assets/revenue.svg";

import RoundedButton from "../../components/RoundedButton";
import RoundedSearch from "../../components/RoundedSearch";
import NewPlanningModal from "../../components/NewPlanningModal";
import EditPlanningModal from "../../components/EditPlanningModal";
import FilterModal from "../../components/FilterModal";
import AmountCard from "../../components/AmountCard";

import currency from "../../utils/currency";
import getSummary from "../../utils/summary";
import filterCategoryAmount from "../../utils/filterCategoryAmount";

import { usePlanning } from "../../hooks/usePlanning";
import { useTransactions } from "../../hooks/useTransactions";

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

const Planning = () => {
  //state
  const [modalIsOpenAdd, setIsOpenAdd] = useState(false);
  const [modalIsOpenEdit, setIsOpenEdit] = useState(false);
  const [modalIsOpenFilter, setIsOpenFilter] = useState(false);
  const [search, setSearch] = useState("");

  //hooks
  const { transactions } = useTransactions();
  const { plannings, deletePlanning, editPlanning } = usePlanning();

  //summary data
  const { total, income, expenses } = getSummary(transactions);

  //set new planning modal true
  function handleNewPlanning() {
    setIsOpenAdd(true);
  }

  //set the planning to be updated and open edit modal
  function handleEditPlanning(id: string) {
    editPlanning(id);
    setIsOpenEdit(true);
  }

  //close add new modal
  function closeModalAdd() {
    setIsOpenAdd(false);
  }

  //close edit  modal
  function closeModalEdit() {
    setIsOpenEdit(false);
  }

  //open filter by month modal
  function handleFilterPlanning() {
    setIsOpenFilter(true);
  }

  //close filter by month modal
  function closeModalFilter() {
    setIsOpenFilter(false);
  }

  //handle search input text
  function handleSearchPlanning(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  //filter just t plans the contain search input text
  const searched = plannings.filter((plan) =>
    plan.category[0].name.toLowerCase().includes(search.toLocaleLowerCase())
  );

  //progress bar
  function progressBar(plan: PlanType) {
    //get the amount of a specified category
    const filterAmount = filterCategoryAmount(
      plan.category[0].name,
      transactions
    );

    // percentage of amount
    const filteredAmount = Math.round((filterAmount * 100) / plan.amount);

    //css styles
    let styles = {
      width: `${filteredAmount}%`,
      backgroundColor: filteredAmount > 65 ? "#DE5A5A" : "#5386E9",
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
          <div className={styles.planning__left}>
            <RoundedButton
              handleClick={handleNewPlanning}
              img={plusImg}
              textAlt="Plus icon"
              labelTitle="New Plan"
            />
          </div>

          <div className={styles.planning__right}>
            <RoundedSearch
              handleChange={handleSearchPlanning}
              img={searchImg}
              textAlt="filter icon"
              search={search}
              placeholder="Search by category"
            />
            <RoundedButton
              handleClick={handleFilterPlanning}
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
                  <th>% Expended</th>
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
      <FilterModal
        title="Filter Planning by Month"
        modalIsOpen={modalIsOpenFilter}
        closeModal={closeModalFilter}
      />
    </>
  );
};

export default Planning;
