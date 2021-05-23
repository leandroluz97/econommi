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
        console.log(error.message)
      })
  }

  //Sign up with password and email
  async function onSignupPassword(email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        let user = userCredential.user
        console.log(user)

        // ...
      })
      .catch((error) => {
        let errorCode = error.code
        let errorMessage = error.message
        // ..
      })
  }

  //Sign in with password and email
  async function onSigninPassword(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        let user = userCredential.user
        // ...
      })
      .catch((error) => {
        let errorCode = error.code
        let errorMessage = error.message
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
