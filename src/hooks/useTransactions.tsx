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

type Transaction = {
  icon: string
  category: string
  type: string
  date: string
  amount: number
}
interface ContextProps {
  transactions: Transaction[]
}

//Context
const TransactionsContext = createContext<ContextProps>({} as ContextProps)

//Provider
export const TransactionsProvider = ({
  children,
}: TransactionsProviderType) => {
  const alltransac: Transaction[] = [
    /*
    {
      icon: "ttps",
      category: "transcport",
      type: "outcom",
      date: "2020",
      value: 200,
    },
    {
      icon: "ttps",
      category: "transcport",
      type: "outcom",
      date: "2020",
      value: 200,
    },
    {
      icon: "ttps",
      category: "transcport",
      type: "outcom",
      date: "2020",
      value: 200,
    },
    */
  ]
  const [transactions, setTransactions] = useState<Transaction[]>(alltransac)

  useEffect(() => {}, [])

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)

  return context
}
