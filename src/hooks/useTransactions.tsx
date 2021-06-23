import { type } from "os";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import firebase from "../config/firebase-config";

interface TransactionsProviderType {
  children: ReactNode;
}

type Categories = {
  name: string;
  type: string;
  color: string;
  icon: string;
  id: string;
};

interface filterTransactionsByMonthType {
  timestampStartOfMonth: firebase.firestore.Timestamp;
  timestampEndOfMonth: firebase.firestore.Timestamp;
}

interface Transaction {
  category: Categories[];
  type: string;
  createdAt: string;
  amount: number;
  description: string;
  id: string;
}
type TransactionAdd = {
  category: Categories[];
  type: string;
  createdAt: string;
  amount: number;
  description: string;
};
interface ContextProps {
  transactions: Transaction[];
  addNewTransactions: (data: TransactionAdd) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  editTransaction: (id: string) => void;
  editStorage: Transaction;
  updateTransaction: (data: TransactionAdd) => Promise<void>;
  filterTransactionsByMonth: (
    data: filterTransactionsByMonthType
  ) => Promise<void>;
  chosenMonth: string;
  setChosenMonth: (data: string) => void;
}

//Context
const TransactionsContext = createContext<ContextProps>({} as ContextProps);

//Provider
export const TransactionsProvider = ({
  children,
}: TransactionsProviderType) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editStorage, setEditStorage] = useState<Transaction>(
    {} as Transaction
  );
  const [chosenMonth, setChosenMonth] = useState(() => {
    // const storagedCart = Buscar dados do localStorage
    const storagedDate = localStorage.getItem("@econommi:currentMonthName");

    if (storagedDate) {
      return JSON.parse(storagedDate);
    }

    const date = new Date();
    const month = date.getMonth();

    const months = [
      "January",
      "February",
      "March",
      "April	",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months[month];
  });

  useEffect(() => {
    (async function () {
      const date = new Date();
      const day = date.getDate();
      const year = date.getFullYear();
      let month = date.getMonth() + 1;

      const totalDayOfMonth = new Date(year, month + 1, 0).getDate();

      //check if localstorage doesn't have any dated
      //code here
      const storagedDate = localStorage.getItem("@econommi:currentMonthId");
      if (storagedDate) {
        month = Number(JSON.parse(storagedDate));
      }

      const startOfMonth = `${year}-${month}-${1}`;
      const endOfMonth = `${year}-${month}-${totalDayOfMonth}`;
      //const startOfMonth = `${year}-${month + 1}-${21}`;
      //const endOfMonth = `${totalDayOfMonth}-${monthId}-${year}`;

      const timestampStartOfMonth = firebase.firestore.Timestamp.fromDate(
        new Date(startOfMonth)
      );
      const timestampEndOfMonth = firebase.firestore.Timestamp.fromDate(
        new Date(endOfMonth)
      );

      await getAllTransactions({ timestampStartOfMonth, timestampEndOfMonth });
    })();
  }, []);

  async function getAllTransactions({
    timestampStartOfMonth,
    timestampEndOfMonth,
  }: filterTransactionsByMonthType) {
    let db = firebase.firestore();
    try {
      const user = firebase.auth().currentUser;
      const email = user?.email as string;

      let userTransactions = await db
        .collection("users")
        .doc(user?.uid)
        .collection("transactions")
        .where("createdAt", ">", timestampStartOfMonth)
        .where("createdAt", "<", timestampEndOfMonth)
        .orderBy("createdAt", "desc")
        .get();

      let transactionsArray = [] as Transaction[];
      userTransactions.forEach((snap) => {
        //const date = snap.data().createdAt.toDate().getTime();
        const date = new Date(snap.data().createdAt.toDate().getTime());

        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        transactionsArray.push({
          ...snap.data(),
          id: snap.id,
          createdAt: `${day}/${month + 1}/${year}`,
        } as Transaction);
      });

      setTransactions(transactionsArray);
    } catch (error) {
      console.log(error.message);

      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async function filterTransactionsByMonth({
    timestampStartOfMonth,
    timestampEndOfMonth,
  }: filterTransactionsByMonthType) {
    let db = firebase.firestore();
    try {
      const user = firebase.auth().currentUser;
      const email = user?.email as string;

      let userTransactions = await db
        .collection("users")
        .doc(user?.uid)
        .collection("transactions")
        .where("createdAt", ">", timestampStartOfMonth)
        .where("createdAt", "<", timestampEndOfMonth)
        .orderBy("createdAt", "desc")
        .get();

      let transactionsArray = [] as Transaction[];
      userTransactions.forEach((snap) => {
        //const date = snap.data().createdAt.toDate().getTime();
        const date = new Date(snap.data().createdAt.toDate().getTime());

        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        transactionsArray.push({
          ...snap.data(),
          id: snap.id,
          createdAt: `${day}/${month + 1}/${year}`,
        } as Transaction);
      });

      setTransactions(transactionsArray);
    } catch (error) {
      console.log(error.message);

      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async function addNewTransactions(data: TransactionAdd) {
    let db = firebase.firestore();

    try {
      const user = firebase.auth().currentUser;
      const email = user?.email as string;

      let docRef = db.collection("users").doc(user?.uid);
      const timestamp = firebase.firestore.Timestamp.fromDate(
        new Date(data.createdAt)
      );

      const newData = {
        ...data,
        createdAt: timestamp,
      };

      const newTransaction = await docRef
        .collection("transactions")
        .add(newData);

      const newTransactionId = await newTransaction.get();

      const date = new Date(
        newTransactionId.data()?.createdAt.toDate().getTime()
      );

      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      let transaction = {
        ...newTransactionId.data(),
        id: newTransactionId.id,
        createdAt: `${day}/${month + 1}/${year}`,
      } as Transaction;

      let allTransaction = [transaction, ...transactions];

      setTransactions(allTransaction);

      toast.success("Transaction Added! 😉", {
        bodyClassName: "toastify",
        className: "toastify__success",
      });
    } catch (error) {
      console.log(error);

      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }
  async function deleteTransaction(id: string) {
    let db = firebase.firestore();

    try {
      const user = firebase.auth().currentUser;
      const email = user?.email as string;

      let docRef = db.collection("users").doc(user?.uid);

      const deleteTransaction = await docRef
        .collection("transactions")
        .doc(id)
        .delete();

      const allTransaction = transactions.filter(
        (transaction) => transaction.id !== id
      );

      console.log("deleted one", allTransaction);

      setTransactions(allTransaction);

      toast.success("Transaction deleted 😉", {
        bodyClassName: "toastify",
        className: "toastify__success",
      });
    } catch (error) {
      console.log(error);

      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  function editTransaction(id: string) {
    const editTransaction = transactions.find(
      (transaction) => transaction.id === id
    );
    if (editTransaction) {
      setEditStorage(editTransaction);
    }
  }

  async function updateTransaction(data: TransactionAdd) {
    let db = firebase.firestore();

    try {
      const user = firebase.auth().currentUser;
      const email = user?.email as string;

      let docRef = db.collection("users").doc(user?.uid);

      const updatedTransaction = await docRef
        .collection("transactions")
        .doc(editStorage.id)
        .set(data);

      let allTransaction = transactions.map((trans) => {
        if (trans.id === editStorage.id) {
          return { id: editStorage.id, ...data };
        }

        return trans;
      }) as Transaction[];

      setTransactions(allTransaction);
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addNewTransactions,
        deleteTransaction,
        editTransaction,
        editStorage,
        updateTransaction,
        filterTransactionsByMonth,
        chosenMonth,
        setChosenMonth,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
