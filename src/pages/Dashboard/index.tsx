import React, { useEffect, useState } from "react";
import AmountCard from "../../components/AmountCard";
import { useTransactions } from "../../hooks/useTransactions";
import styles from "./styles.module.scss";

import expensesImg from "../../assets/expenses.svg";
import currentImg from "../../assets/current.svg";
import revenueImg from "../../assets/revenue.svg";
import caretdownBig from "../../assets/caretdownBig.svg";

import { Doughnut, Line } from "react-chartjs-2";
import getSummary from "../../utils/summary";

interface transDataType {
  trans: number;
  createdAt: string[];
}
const Dashboard = () => {
  const { transactions } = useTransactions();

  const { total, income, expenses } = getSummary(transactions);

  let transData: transDataType = {
    trans: 0,
    createdAt: [],
  };
  const transactionsByDay = transactions.reduce((acc, transaction) => {
    if (transaction.type === "income") {
      /*
      if (acc.createdAt.includes(transaction.createdAt)) {
      }
      */
    }

    return acc;
  }, transData);

  console.log(transactions);

  const data = {
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
        data: [65, 59, 80, 81, 70, 70, 75, 73, 71, 83],
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
  };

  const dataCirculeGraphs = {
    labels: ["Expenses", "Income"],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: ["#DE5A5A", "#8BCF61"],
        hoverBackgroundColor: ["#D45050", "#82C957"],
        data: [Number(expenses), income - expenses],
      },
    ],
  };

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

        <AmountCard
          type="Current Balance"
          amount={total}
          img={currentImg}
          cardTitle="Total current amount that you have."
        />
        <AmountCard
          type="Income"
          amount={income}
          img={revenueImg}
          cardTitle="Total amount of income submitted."
        />
        <AmountCard
          type="Expenses"
          amount={expenses}
          img={expensesImg}
          cardTitle="Total amount of expenses submitted."
        />
      </div>

      <div className={styles.dashboard__main}>
        <div className={styles.dashboard__lineGraph}>
          <Line
            data={data}
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
            data={dataCirculeGraphs}
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
