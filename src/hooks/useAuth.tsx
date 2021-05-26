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

interface AuthProviderType {
  children: ReactNode
}
interface User {}

interface ContextProps {
  currentUser: User | null
  setCurrentUser: (value: User | null) => void
  isLoading: boolean
  onSubmitGmail: () => void
  onSignupPassword: (email: string, password: string) => void
  onSigninPassword: (email: string, password: string) => void
}

//Context
const AuthContext = createContext<ContextProps>({} as ContextProps)

//Provider
export const AuthProvider = ({ children }: AuthProviderType) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  //Sign in or Sign up  with google
  async function onSubmitGmail() {
    let provider = new firebase.auth.GoogleAuthProvider()

    const fire = firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        let credential = result.credential as firebase.auth.OAuthCredential

        // This gives you a Google Access Token. You can use it to access the Google API.
        let token = credential.accessToken
        // The signed-in user info.
        let user = result.user

        //setCurrentUser(user)
      })
      .catch((error) => {
        toast.error(error.message, {
          bodyClassName: "toastify__error",
          className: "toastify",
        })
      })
    return fire
  }

  //Sign up with password and email
  async function onSignupPassword(email: string, password: string) {
    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      const userCredential = user.credential

      console.log(user)
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      })
    }
    /*
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        let user = userCredential.user
      })
      .catch((error) => {
        toast.error(error.message, {
          bodyClassName: "toastify__error",
          className: "toastify",
        })
      })
      */
  }

  //Sign in with password and email
  async function onSigninPassword(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        let user = userCredential.user
      })
      .catch((error) => {
        toast.error(error.message, {
          bodyClassName: "toastify__error",
          className: "toastify",
        })
      })
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      let db = firebase.firestore()

      setCurrentUser(user)
      setIsLoading(false)
    })

    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isLoading,
        onSubmitGmail,
        onSignupPassword,
        onSigninPassword,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}

/*
    let db = firebase.firestore()

    const user = { nome: "leandro", idade: 23, nacionalidade: "cavoverdiano" }
    const ref = db.collection("users")

    ref.add(user)
*/

/*
      async function saveUserToDB() {
        let docRef = db.collection("users").doc(user?.email as string)
        try {
          const doc = await docRef.get()

          if (doc.exists) {
            //console.log("Document data:", doc.data())
          } else {
            // doc.data() will be undefined in this case
            //console.log("No such document!")

            const ref = db.collection("users")
            let userData = {
              userId: user?.uid,
              photoURL: user?.photoURL,
              email: user?.email,
              displayName: user?.displayName,
            }

            ref.doc(user?.email as string).set(userData)
          }
        } catch (error) {
          console.log(error)
        }
      }

      if (user) {
        saveUserToDB()
      }
      */
//console.log(user)
