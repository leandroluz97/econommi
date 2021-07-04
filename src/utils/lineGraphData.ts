import firebase from "../config/firebase-config";

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
  timestamp?: firebase.firestore.Timestamp;
}

interface lineGraphDataProps {
  transactions: Transaction[];
  type: string;
}

export default function lineGraphData({
  transactions,
  type,
}: lineGraphDataProps) {
  const labels = [
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
  ];

  const lineGraphArr = labels.map((month) => {
    return transactions.reduce((acc, transaction) => {
      const date = new Date(
        transaction.timestamp?.toDate().getTime() as number
      ).getMonth();

      if (labels[date] === month && transaction.type === type) {
        acc += transaction.amount;
      }

      return acc;
    }, 0);
  });

  return lineGraphArr;
}
