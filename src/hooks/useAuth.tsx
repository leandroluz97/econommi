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
import Categories from "../pages/Categories";

interface AuthProviderType {
  children: ReactNode;
}
interface User {
  displayName: string;
  photoURL: string;
  email: string;
  userId?: string;
  firstName?: string | null;
  lastName?: string | null;
}
interface EditSettingsTypes {
  displayname: string;
  firstname: string;
  lastname: string;
  profileImage: string;
}

interface ContextProps {
  currentUser: User | null;
  setCurrentUser: (value: User | null) => void;
  isLoading: boolean;
  onSubmitGmail: () => void;
  onSignupPassword: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => void;
  onSigninPassword: (email: string, password: string) => void;
  updateSettings: (data: EditSettingsTypes) => void;
}

//Context
const AuthContext = createContext<ContextProps>({} as ContextProps);

//Provider
export const AuthProvider = ({ children }: AuthProviderType) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  //Sign in or Sign up  with google
  async function onSubmitGmail() {
    let provider = new firebase.auth.GoogleAuthProvider();
    let db = firebase.firestore();

    try {
      const userAuth = await firebase.auth().signInWithPopup(provider);
      const result = userAuth;

      let credential = result.credential as firebase.auth.OAuthCredential;

      // The signed-in user info.
      let user = result.user;

      //get user by email
      let docRef = db.collection("users").doc(user?.email as string);
      const doc = await docRef.get();

      let catRef = await db.collection("categories").get();

      //check if user exists
      if (!doc.exists) {
        const ref = db.collection("users");
        let userData = {
          userId: user?.uid,
          photoURL: user?.photoURL,
          email: user?.email,
          displayName: user?.displayName,
          firstName: null,
          lastName: null,
        } as User;

        //create user doc w/ email index
        ref.doc(user?.email as string).set(userData);

        //add all category to user
        catRef.forEach((category) => {
          ref
            .doc(user?.email as string)
            .collection("categories")
            .add(category.data());
        });

        setCurrentUser(userData);
      }
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  //Sign up with password and email
  async function onSignupPassword(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    let db = firebase.firestore();

    try {
      let docRef = db.collection("users").doc(email);
      let catRef = await db.collection("categories").get();

      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const userCredential = user.credential;

      const doc = await docRef.get();

      if (!doc.exists) {
        // doc.data() will be undefined in this case

        const ref = db.collection("users");
        let userData = {
          userId: user.user?.uid,
          photoURL: user.user?.photoURL,
          email: user.user?.email,
          displayName: user.user?.displayName,
          firstName: firstName,
          lastName: lastName,
        } as User;

        //create user doc w/ email index
        ref.doc(user.user?.email as string).set(userData);

        //add all category to user
        catRef.forEach((category) => {
          ref
            .doc(user.user?.email as string)
            .collection("categories")
            .add(category.data());
        });

        setCurrentUser(userData);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  //Sign in with password and email
  async function onSigninPassword(email: string, password: string) {
    try {
      const userAuth = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      // Signed in
      let userCredential = userAuth.user;
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user as User);
      setIsLoading(false);

      (async function () {
        let db = firebase.firestore();

        let docRef = db.collection("users").doc(user?.email as string);
        const doc = await docRef.get();

        setCurrentUser(doc.data() as User);
      })();
    });

    return unsubscribe;
  }, []);

  async function updateSettings(data: EditSettingsTypes) {
    let db = firebase.firestore();

    try {
      const user = firebase.auth().currentUser;
      const email = user?.email as string;

      const updatedUserData = {
        displayName: data.displayname,
        photoURL: data.profileImage,
        email: email,
        userId: currentUser?.userId,
        firstName: data.firstname,
        lastName: data.lastname,
      };

      let docRef = await db.collection("users").doc(email).set(updatedUserData);

      setCurrentUser(updatedUserData);
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isLoading,
        onSubmitGmail,
        onSignupPassword,
        onSigninPassword,
        updateSettings,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
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
