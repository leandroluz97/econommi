import { type } from "os"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import firebase from "../config/firebase-config"

interface TransactionsProviderType {
  children: ReactNode
}
interface User {}

type Categories = {
  name: string
  type: string
  color: string
  icon: string
  id: string
}

interface Transaction {
  category: Categories
  type: string
  date: string
  amount: number
  description: string
  id: string
}
type TransactionAdd = {
  category: Categories
  type: string
  date: string
  amount: number
  description: string
}
interface ContextProps {
  transactions: Transaction[]
  addNewTransactions: (data: Transaction) => Promise<void>
}

//Context
const TransactionsContext = createContext<ContextProps>({} as ContextProps)

//Provider
export const TransactionsProvider = ({
  children,
}: TransactionsProviderType) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {}, [])

  async function getAllCategories() {
    let db = firebase.firestore()
    try {
      const user = firebase.auth().currentUser
      const email = user?.email as string

      let userTransactions = await db
        .collection("users")
        .doc(email)
        .collection("transactions")
        .get()

      let categoriesArray = [] as Categories[]
      userTransactions.forEach((snap) => {
        categoriesArray.push({ ...snap.data(), id: snap.id } as Categories)
      })
    } catch (error) {}
  }

  async function addNewTransactions(data: TransactionAdd) {
    let db = firebase.firestore()

    try {
      const user = firebase.auth().currentUser
      const email = user?.email as string

      let docRef = db.collection("users").doc(email)

      const newTransaction = await docRef.collection("transactions").add(data)

      const newTransactionId = await newTransaction.onSnapshot((doc) => {
        const transaction = {
          ...doc.data(),
          id: doc.id,
        }

        //setTransactions(allTransaction)
      })
    } catch (error) {
      console.log(error)

      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      })
    }
  }

  return (
    <TransactionsContext.Provider value={{ transactions, addNewTransactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)

  return context
}
