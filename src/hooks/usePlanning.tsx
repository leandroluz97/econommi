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

interface PlanningProviderType {
  children: ReactNode;
}

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
type PlanningAdd = {
  category: Categories[];
  type: string;
  createdAt: string;
  amount: number;
  description: string;
};
interface ContextProps {
  transactions: Transaction[];
  addNewPlanning: (data: PlanningAdd) => Promise<void>;
  deletePlanning: (id: string) => Promise<void>;
  editPlanning: (id: string) => void;
  editStorage: Transaction;
  updatePlanning: (data: PlanningAdd) => Promise<void>;
}

//Context
const PlanningContext = createContext<ContextProps>({} as ContextProps);

//Provider
export const PlanningProvider = ({ children }: PlanningProviderType) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editStorage, setEditStorage] = useState<Transaction>(
    {} as Transaction
  );

  useEffect(() => {
    (async function () {
      await getAllPlanning();
    })();
  }, []);

  async function getAllPlanning() {
    let db = firebase.firestore();
    try {
      const user = firebase.auth().currentUser;
      const email = user?.email as string;

      let userTransactions = await db
        .collection("users")
        .doc(email)
        .collection("transactions")
        .orderBy("createdAt", "desc")
        .get();

      let transactionsArray = [] as Transaction[];
      userTransactions.forEach((snap) => {
        transactionsArray.push({ ...snap.data(), id: snap.id } as Transaction);
      });

      setTransactions(transactionsArray);
    } catch (error) {}
  }

  async function addNewPlanning(data: PlanningAdd) {
    let db = firebase.firestore();

    try {
      const user = firebase.auth().currentUser;
      const email = user?.email as string;

      let docRef = db.collection("users").doc(email);

      const newTransaction = await docRef.collection("transactions").add(data);

      const newTransactionId = await newTransaction.get();

      let transaction = {
        ...newTransactionId.data(),
        id: newTransactionId.id,
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
  async function deletePlanning(id: string) {
    let db = firebase.firestore();

    try {
      const user = firebase.auth().currentUser;
      const email = user?.email as string;

      let docRef = db.collection("users").doc(email);

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

  function editPlanning(id: string) {
    const editTransaction = transactions.find(
      (transaction) => transaction.id === id
    );
    if (editTransaction) {
      setEditStorage(editTransaction);
    }
  }

  async function updatePlanning(data: PlanningAdd) {
    let db = firebase.firestore();

    try {
      const user = firebase.auth().currentUser;
      const email = user?.email as string;

      let docRef = db.collection("users").doc(email);

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
    <PlanningContext.Provider
      value={{
        transactions,
        addNewPlanning,
        deletePlanning,
        editPlanning,
        editStorage,
        updatePlanning,
      }}
    >
      {children}
    </PlanningContext.Provider>
  );
};

export function usePlanning() {
  const context = useContext(PlanningContext);

  return context;
}
