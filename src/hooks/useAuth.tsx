import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

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
}

//Context
const AuthContext = createContext<ContextProps>({} as ContextProps)

//Provider
export const AuthProvider = ({ children }: AuthProviderType) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  function onSubmitGmail() {
    let provider = new firebase.auth.GoogleAuthProvider()

    return firebase
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
        console.log(error)
      })
  }
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      setIsLoading(false)
    })

    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, isLoading, onSubmitGmail }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
