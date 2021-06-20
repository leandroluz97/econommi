

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

export default function filterCategoryAmount(
  identifier: string,
  transactions: Transaction[]
) {
  const allTransacategory = transactions
    .filter((transaction) => {
      return transaction.category[0].name === identifier;
    })
    .reduce((acc, value) => {
      return acc + value.amount;
    }, 0);

  return allTransacategory;
}
