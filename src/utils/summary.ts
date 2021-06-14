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
}

export default function getSummary(transactions: Transaction[]) {
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
  return {
    total: total,
    income: transactionInfo.income,
    expenses: transactionInfo.expenses,
  };
}
