import { Doughnut, Line } from "react-chartjs-2";

import styles from "./styles.module.scss";

import expensesImg from "../../assets/expenses.svg";
import currentImg from "../../assets/current.svg";
import revenueImg from "../../assets/revenue.svg";

import DateCard from "../../components/DateCard";
import AmountCard from "../../components/AmountCard";

import getSummary from "../../utils/summary";
import lineGraphData from "../../utils/lineGraphData";
import { circularGraph, lineGraph } from "./data";

import { useTransactions } from "../../hooks/useTransactions";

const Dashboard = () => {
  //hooks
  const { transactions, currentBalance } = useTransactions();

  //summary data for circular graph
  const { income, expenses } = getSummary(transactions);

  //montly data for line graph
  const montlyExpenses = lineGraphData({ transactions, type: "expenses" });
  const montlyIncome = lineGraphData({ transactions, type: "income" });

  //line and circular data for ui display
  const lineConfig = lineGraph({ montlyExpenses, montlyIncome });
  const circularConfig = circularGraph({ income, expenses });

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <div className={styles.dashboard__summary}>
        <DateCard />

        <AmountCard
          type="Current Balance"
          amount={currentBalance}
          img={currentImg}
          cardTitle="Total current amount that you have."
        />
        <AmountCard
          type="Income"
          amount={income}
          img={revenueImg}
          cardTitle="Total amount of income submitted this month."
        />
        <AmountCard
          type="Expenses"
          amount={expenses}
          img={expensesImg}
          cardTitle="Total amount of expenses submitted this month."
        />
      </div>

      <div className={styles.dashboard__main}>
        <div className={styles.dashboard__lineGraph}>
          <Line type="line" {...lineConfig} />
        </div>
        <div className={styles.dashboard__circuleGraph}>
          <Doughnut type="doughnut" {...circularConfig} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
