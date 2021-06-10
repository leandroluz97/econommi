import React from "react";
import AmountCard from "../../components/AmountCard";
import { useTransactions } from "../../hooks/useTransactions";
import styles from "./styles.module.scss";

import expenses from "../../assets/expenses.svg";
import current from "../../assets/current.svg";
import revenue from "../../assets/revenue.svg";
import caretdownBig from "../../assets/caretdownBig.svg";

const Dashboard = () => {
  const { transactions } = useTransactions();

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
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard__summary}>
        <div className={styles.dashboard__date}>
          <p>Maio</p>
          <span>
            <img src={caretdownBig} alt="Caret Down" />
          </span>
        </div>

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
    </div>
  );
};

export default Dashboard;
