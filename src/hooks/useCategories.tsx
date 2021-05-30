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

interface CategoriesProviderType {
  children: ReactNode
}

type Categories = {
  name: string
  type: string
  color: string
  icon: string
  id: string
}

interface ContextProps {
  categories: Categories[]
  getAllCategories: () => Promise<void>
  defaultCategory: Categories
}

//Context
const CategoriesContext = createContext<ContextProps>({} as ContextProps)

//Provider
export const CategoriesProvider = ({ children }: CategoriesProviderType) => {
  const [categories, setCategories] = useState<Categories[]>([])
  const [defaultCategory, setDefaultCategory] = useState<Categories>(
    {} as Categories
  )

  useEffect(() => {
    ;(async function () {
      await getDefaultCategories()
    })()
  }, [])

  async function getAllCategories() {
    let db = firebase.firestore()
    try {
      const user = firebase.auth().currentUser
      const email = user?.email as string

      let userCategories = await db
        .collection("users")
        .doc(email)
        .collection("categories")
        .get()

      let categoriesArray = [] as Categories[]
      userCategories.forEach((snap) => {
        categoriesArray.push({ ...snap.data(), id: snap.id } as Categories)
      })
      setCategories(categoriesArray)
    } catch (error) {}
  }

  async function getDefaultCategories() {
    let db = firebase.firestore()
    try {
      const user = firebase.auth().currentUser
      const email = user?.email as string

      let defaultCategory = await db
        .collection("categories")
        .where("name", "==", "Salary")
        .get()

      let catDefault = {} as Categories
      const dat = defaultCategory.forEach((cat) => {
        catDefault = { id: cat.id, ...cat.data() } as Categories
      })
      setDefaultCategory(catDefault)
    } catch (error) {}
  }

  return (
    <CategoriesContext.Provider
      value={{ categories, getAllCategories, defaultCategory }}
    >
      {children}
    </CategoriesContext.Provider>
  )
}

export function useCategories() {
  const context = useContext(CategoriesContext)

  return context
}
