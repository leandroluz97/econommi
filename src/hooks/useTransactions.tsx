import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getMonthWithAlgorism from "../utils/getMonthWith";

import firebase from "../config/firebase-config";
import currentDateToTimestamp from "../utils/currentDateToTimestamp";

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
  timestamp?: firebase.firestore.Timestamp;
}

type TransactionAdd = {
  category: Categories[];
  type: string;
  createdAt: string;
  amount: number;
  description: string;
  timestamp?: firebase.firestore.Timestamp;
};

interface ContextProps {
  getAllTransactions: ({
    timestampStartOfMonth,
    timestampEndOfMonth,
  }: filterTransactionsByMonthType) => Promise<void>;
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
  openedTransaction: Transaction;
  setOpenedTransaction: (tran: Transaction) => void;
  currentBalance: number;
  getCurrentBalance: () => Promise<void>;
}

//Context
const TransactionsContext = createContext<ContextProps>({} as ContextProps);

//Provider
export const TransactionsProvider = ({
  children,
}: TransactionsProviderType) => {
  //Global State
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editStorage, setEditStorage] = useState<Transaction>(
    {} as Transaction
  );
  const [openedTransaction, setOpenedTransaction] = useState<Transaction>(
    {} as Transaction
  );
  const [currentBalance, setCurrentBalance] = useState(0);
  const [chosenMonth, setChosenMonth] = useState(() => {
    //get month from localstorage
    const storagedDate = localStorage.getItem("@econommi:currentMonthName");

    //check if date in localstorage exists return date
    if (storagedDate) {
      return JSON.parse(storagedDate);
    }

    // get atual date
    const date = new Date();
    const month = getMonthWithAlgorism(date.getMonth());

    //set name of month in localstorage
    localStorage.setItem("@econommi:currentMonthName", JSON.stringify(month));

    //set number of month 0-11
    localStorage.setItem(
      "@econommi:currentMonthId",
      JSON.stringify(date.getMonth())
    );

    return month;
  });

  useEffect(() => {
    (async function () {
      //get current date in firestore timestamp
      const { timestampStartOfMonth, timestampEndOfMonth } =
        currentDateToTimestamp();

      await getCurrentBalance();
      await getAllTransactions({ timestampStartOfMonth, timestampEndOfMonth });
    })();
  }, []);

  async function getAllTransactions({
    timestampStartOfMonth,
    timestampEndOfMonth,
  }: filterTransactionsByMonthType) {
    // inicialize firebase firestore
    let db = firebase.firestore();

    try {
      //get the authenticate user
      const user = firebase.auth().currentUser;

      //get all user categories
      let userCategories = await db
        .collection("users")
        .doc(user?.uid)
        .collection("categories")
        .get();

      const allCategories: any = {};
      //get all user categories inside an object with id as a key
      userCategories.forEach((snap) => {
        allCategories[snap.id] = { ...snap.data(), id: snap.id };
      });

      //get all user transactions within timestamp and ordered by date
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
        //Firestore timestamp to js date
        const date = new Date(snap.data().createdAt.toDate().getTime());

        //get date
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        //set all transaction to an array of object
        transactionsArray.push({
          ...snap.data(),
          id: snap.id,
          createdAt: `${day}/${month + 1}/${year}`,
          timestamp: snap.data().createdAt,
          category: [allCategories[snap.data().category.id]],
        } as Transaction);
      });

      setTransactions(transactionsArray);
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async function getCurrentBalance() {
    // inicialize firebase firestore
    let db = firebase.firestore();

    try {
      //get the authenticate user
      const user = firebase.auth().currentUser;

      //get all user transactions within timestamp and ordered by date
      let userTransactions = await db
        .collection("users")
        .doc(user?.uid)
        .collection("transactions")
        .get();

      let income = 0;
      let expenses = 0;

      //get all income and expenses
      userTransactions.forEach((trans) => {
        if (trans.data().type === "expenses") {
          expenses += trans.data().amount;
        } else {
          income += trans.data().amount;
        }
      });

      //get current balance
      const total = income - expenses;

      setCurrentBalance(total);
    } catch (error) {
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
    // inicialize firebase firestore
    let db = firebase.firestore();
    try {
      //get the authenticate user
      const user = firebase.auth().currentUser;

      //get all user categories
      let userCategories = await db
        .collection("users")
        .doc(user?.uid)
        .collection("categories")
        .get();

      const allCategories: any = {};
      userCategories.forEach((snap) => {
        //get all user categories inside an object with id as a key
        allCategories[snap.id] = { ...snap.data(), id: snap.id };
      });

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
        //Firestore timestamp to js date
        const date = new Date(snap.data().createdAt.toDate().getTime());

        //get date
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        //set all transaction to an array of object
        transactionsArray.push({
          ...snap.data(),
          id: snap.id,
          createdAt: `${day}/${month + 1}/${year}`,
          timestamp: snap.data().createdAt,
          category: [allCategories[snap.data().category.id]],
        } as Transaction);
      });

      setTransactions(transactionsArray);
    } catch (error) {
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

      //get current user from firestore
      let docRef = db.collection("users").doc(user?.uid);

      //create firebase timestamp from js date
      const timestamp = firebase.firestore.Timestamp.fromDate(
        new Date(data.createdAt)
      );

      //get user category by reference
      let userCategories = await db
        .collection("users")
        .doc(user?.uid)
        .collection("categories")
        .doc(data.category[0].id)
        .get();

      //creact new Transaction data with category as a reference
      const newData = {
        ...data,
        createdAt: timestamp,
        category: docRef.collection("categories").doc(data.category[0].id),
      };

      //add new transaction to firebase
      const newTransaction = await docRef
        .collection("transactions")
        .add(newData);

      //new transaction return from firestore
      const newTransactionId = await newTransaction.get();

      //new date from firestore timestamp
      const date = new Date(
        newTransactionId.data()?.createdAt.toDate().getTime()
      );

      //get all date
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      //new transaction to state
      let transaction = {
        ...newTransactionId.data(),
        id: newTransactionId.id,
        createdAt: `${day}/${month + 1}/${year}`,
        timestamp: newTransactionId.data()?.createdAt,
        category: [
          {
            ...userCategories.data(),
            id: userCategories.id,
          },
        ],
      } as Transaction;

      //check if we are at the same month otherwise don't show transaction on ui
      const actualMonth = getMonthWithAlgorism(date.getMonth());
      if (actualMonth !== chosenMonth) return;

      let allTransaction = [transaction, ...transactions];

      setTransactions(allTransaction);

      toast.success("Transaction Added! 😉", {
        bodyClassName: "toastify",
        className: "toastify__success",
      });
    } catch (error) {
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

      //get current user from firestore by uid
      let docRef = db.collection("users").doc(user?.uid);

      //delete transaction in firestore
      const deleteTransaction = await docRef
        .collection("transactions")
        .doc(id)
        .delete();

      //delete transaction in state
      const allTransaction = transactions.filter(
        (transaction) => transaction.id !== id
      );

      //set updated transactions
      setTransactions(allTransaction);

      toast.success("Transaction deleted 😉", {
        bodyClassName: "toastify",
        className: "toastify__success",
      });
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  function editTransaction(id: string) {
    //find transaction to update in state
    const editTransaction = transactions.find(
      (transaction) => transaction.id === id
    );

    //if transaction exist set it to edit transaction storage state
    //other wise do nothing
    if (editTransaction) {
      setEditStorage(editTransaction);
    }
  }

  async function updateTransaction(data: TransactionAdd) {
    //initialize firebase firestore
    let db = firebase.firestore();

    try {
      //get the authenticate user
      const user = firebase.auth().currentUser;

      //get user document from firestore by uid
      let docRef = db.collection("users").doc(user?.uid);

      //get user category by reference
      let userCategories = await db
        .collection("users")
        .doc(user?.uid)
        .collection("categories")
        .doc(editStorage.category[0].id)
        .get();

      //create transaction with category reference
      const updatedData = {
        amount: data.amount,
        category: docRef.collection("categories").doc(data.category[0].id),
        createdAt: data.timestamp,
        description: data.description,
        type: data.type,
      };

      //set updated transaction in firestore
      const updatedTransaction = await docRef
        .collection("transactions")
        .doc(editStorage.id)
        .set(updatedData);

      //update transaction in state
      let allTransaction = transactions.map((trans) => {
        if (trans.id === editStorage.id) {
          return {
            id: editStorage.id,
            ...data,
            category: [
              {
                ...userCategories.data(),
                id: userCategories.id,
              },
            ],
          };
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
        getAllTransactions,
        transactions,
        addNewTransactions,
        deleteTransaction,
        editTransaction,
        editStorage,
        updateTransaction,
        filterTransactionsByMonth,
        chosenMonth,
        setChosenMonth,
        openedTransaction,
        setOpenedTransaction,
        currentBalance,
        getCurrentBalance,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

//Custom hook
export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
