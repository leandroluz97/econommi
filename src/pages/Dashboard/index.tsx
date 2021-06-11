import React, { useState } from "react";
import AmountCard from "../../components/AmountCard";
import { useTransactions } from "../../hooks/useTransactions";
import styles from "./styles.module.scss";

import expenses from "../../assets/expenses.svg";
import current from "../../assets/current.svg";
import revenue from "../../assets/revenue.svg";
import caretdownBig from "../../assets/caretdownBig.svg";

import { Doughnut, Line } from "react-chartjs-2";

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

  const [state, setstate] = useState({
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Current Balance",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(83, 134, 233, 1)",
        borderColor: "rgba(83, 134, 233, 1)",
        borderWidth: 2,
        data: [65, 59, 80, 81, 70, 80, 80, 70, 75, 73, 71, 83],
      },
      {
        label: "Income",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(139, 207, 97, 1)",
        borderColor: "rgba(139, 207, 97, 1)",
        borderWidth: 2,
        data: [75, 59, 70, 81, 70, 70, 80, 60, 85, 63, 81, 83],
      },
      {
        label: "Expenses",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(222, 90, 90, 1)",
        borderColor: "rgba(222, 90, 90, 1)",
        borderWidth: 2,
        data: [55, 54, 60, 71, 60, 60, 60, 60, 75, 63, 71, 73],
      },
    ],
  });

  const [dog, setdog] = useState({
    labels: ["Expenses", "Income"],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: ["#DE5A5A", "#8BCF61"],
        hoverBackgroundColor: ["#D45050", "#82C957"],
        data: [
          Number(transactionInfo.expenses),
          transactionInfo.income - transactionInfo.expenses,
        ],
      },
    ],
  });

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
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

      <div className={styles.dashboard__main}>
        <div className={styles.dashboard__lineGraph}>
          <Line
            data={state}
            type="line"
            options={{
              title: {
                display: true,
                text: "Average Rainfall per month",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
        <div className={styles.dashboard__circuleGraph}>
          <Doughnut
            type="line"
            data={dog}
            options={{
              title: {
                display: true,
                text: "Average Rainfall per month",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
