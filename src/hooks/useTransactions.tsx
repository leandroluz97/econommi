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

type Categories = {
  name: string
  type: string
  color: string
  icon: string
  id: string
}

interface Transaction {
  category: Categories[]
  type: string
  createdAt: string
  amount: number
  description: string
  id: string
}
type TransactionAdd = {
  category: Categories[]
  type: string
  createdAt: string
  amount: number
  description: string
}
interface ContextProps {
  transactions: Transaction[]
  addNewTransactions: (data: TransactionAdd) => Promise<void>
  deleteTransaction:(id: string) => Promise<void>
  editTransaction:(id:string)=>void
  editStorage:Transaction
  updateTransaction:(data: TransactionAdd) => Promise<void>
}

//Context
const TransactionsContext = createContext<ContextProps>({} as ContextProps)

//Provider
export const TransactionsProvider = ({
  children,
}: TransactionsProviderType) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [editStorage, setEditStorage] = useState<Transaction>({} as Transaction)

  useEffect(() => {
    ;(async function () {
      await getAllTransactions()
    })()
  }, [])

  async function getAllTransactions() {
    let db = firebase.firestore()
    try {
      const user = firebase.auth().currentUser
      const email = user?.email as string

      let userTransactions = await db
        .collection("users")
        .doc(email)
        .collection("transactions")
        .orderBy('createdAt','desc')
        .get()

      let transactionsArray = [] as Transaction[]
      userTransactions.forEach((snap) => {
        transactionsArray.push({ ...snap.data(), id: snap.id } as Transaction)
      })

      setTransactions(transactionsArray)
    } catch (error) {}
  }

  async function addNewTransactions(data: TransactionAdd) {
    let db = firebase.firestore()

    try {
      const user = firebase.auth().currentUser
      const email = user?.email as string

      let docRef = db.collection("users").doc(email)

      const newTransaction = await docRef.collection("transactions").add(data)

      const newTransactionId = await newTransaction.get()

      let transaction = {
          ...newTransactionId.data(),
          id: newTransactionId.id,
      } as Transaction
        
        let allTransaction = [transaction, ...transactions]
        
        setTransactions(allTransaction)

        toast.success('Transaction Added! 😉', {
          bodyClassName: "toastify",
          className: "toastify__success",
        })
        
    } catch (error) {
      console.log(error)

      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      })
    }
  }
  async function deleteTransaction(id: string) {
    let db = firebase.firestore()

    try {
      const user = firebase.auth().currentUser
      const email = user?.email as string

      let docRef = db.collection("users").doc(email)

      const deleteTransaction = await docRef.collection("transactions").doc(id).delete()

      const allTransaction = transactions.filter(transaction=>transaction.id !== id)

      console.log('deleted one', allTransaction);
      
      setTransactions(allTransaction)

      toast.success('Transaction deleted 😉', {
        bodyClassName: "toastify",
        className: "toastify__success",
      })
     
    } catch (error) {
      console.log(error)

      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      })
    }
  }


  function editTransaction(id:string){
    const editTransaction = transactions.find(transaction => transaction.id  === id)
    if (editTransaction) {
      setEditStorage(editTransaction)
    }
  }

  async function updateTransaction(data:TransactionAdd){
    let db = firebase.firestore()

    try {

      const user = firebase.auth().currentUser
      const email = user?.email as string

      let docRef = db.collection("users").doc(email)

      const updatedTransaction = await docRef.collection("transactions")
                            .doc(editStorage.id).set(data)
        
        let allTransaction = transactions.map((trans=>{
          if (trans.id === editStorage.id) {
            return {id:editStorage.id, ...data}
          }

          return trans
        })) as Transaction[]
        
        setTransactions(allTransaction)
      
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      })
    }
    
  }


  return (
    <TransactionsContext.Provider value={{ transactions, addNewTransactions, deleteTransaction,editTransaction,editStorage,updateTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)

  return context
}
