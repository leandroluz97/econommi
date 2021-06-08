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

interface IconsType{
 id:string
 icon:string
}
interface ColorsType{
 id:string
 color:string
}


interface ContextProps {
  categories: Categories[]
  getAllCategories: () => Promise<void>
  defaultCategory: Categories
  getDefaultCategories: () => Promise<void>
  option: Categories
  setOption: (option:Categories) => void
  getAllCategoriesPlus: () => Promise<void>
  icons:IconsType[]
  colors:ColorsType[]
}

//Context
const CategoriesContext = createContext<ContextProps>({} as ContextProps)

//Provider
export const CategoriesProvider = ({ children }: CategoriesProviderType) => {
  const [categories, setCategories] = useState<Categories[]>([])
  const [defaultCategory, setDefaultCategory] = useState<Categories>(
    {} as Categories
  )
  const [option, setOption] = useState<Categories>({}as Categories)
  const [icons, setIcons] = useState<IconsType[]>([])
  const [colors, setColors] = useState<ColorsType[]>([])

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
    } catch (error) {

      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      })

    }
  }

  async function getDefaultCategories() {
    let db = firebase.firestore()
    try {
      const user = firebase.auth().currentUser
      const email = user?.email as string

      let defaultCategoryAsync = await db
        .collection("categories")
        .where("name", "==", "Salary")
        .get()

      let catDefault = {} as Categories
        defaultCategoryAsync.forEach((cat) => {
        catDefault = { id: cat.id, ...cat.data() } as Categories
      })
      
      setOption(catDefault)
      setDefaultCategory(catDefault)
    } catch (error) {

      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      })
    }
  }

  async function getAllCategoriesPlus() {
    let db = firebase.firestore()
    try {
      const user = firebase.auth().currentUser
      const email = user?.email as string

      let categoriesColors = await db
        .collection("categoriesplus")
        .doc('colors')
        .get()

      let categoriesIcons = await db
        .collection("categoriesplus")
        .doc('icons')
        .get()

        let normalizedColors = [...categoriesColors.data()?.colors].reduce((acc,color)=>{
        acc=[...acc, {['color']:color, id:color}]
 
        return acc
        },[])
      
        let normalizesIcons = [...categoriesIcons.data()?.icons].reduce((acc,icon)=>{
        acc=[...acc, {['icon']:icon, id:icon.slice(-12)}]
        
        return acc
        },[])

        setColors(normalizedColors)
        setIcons(normalizesIcons)
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      })
    }
  }

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        getAllCategories,
        defaultCategory,
        getDefaultCategories,
        option,
        setOption,
        getAllCategoriesPlus,
        colors,
        icons
      }}
    >
      {children}
    </CategoriesContext.Provider>
  )
}

export function useCategories() {
  const context = useContext(CategoriesContext)

  return context
}
