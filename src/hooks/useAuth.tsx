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
  resetPassword: (email: string) => void;
}

//Context
const AuthContext = createContext<ContextProps>({} as ContextProps);

//Provider
export const AuthProvider = ({ children }: AuthProviderType) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user as User);
      setIsLoading(false);

      (async function () {
        let db = firebase.firestore();

        let docRef = db.collection("users").doc(user?.uid);
        const doc = await docRef.get();

        setCurrentUser(doc.data() as User);
      })();
    });

    return unsubscribe;
  }, []);

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
      let docRef = db.collection("users").doc(user?.uid);
      const doc = await docRef.get();

      //get all categories
      let catRef = await db
        .collection("categories")
        .where("color", "!=", null)
        .get();

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
        ref.doc(user?.uid).set(userData);

        //add all category to user
        catRef.forEach((category) => {
          ref.doc(user?.uid).collection("categories").add(category.data());
        });

        //set current user
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
      //get user
      let docRef = db.collection("users").where("email", "==", email);

      //get all categories
      let catRef = await db
        .collection("categories")
        .where("color", "!=", null)
        .get();

      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const userCredential = user.credential;

      //get user with signup email
      const doc = await docRef.get();

      //is user doesn't exists create user
      if (doc.empty) {
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
        ref.doc(user.user?.uid).set(userData);

        //add all category to user
        catRef.forEach((category) => {
          ref.doc(user.user?.uid).collection("categories").add(category.data());
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

  async function updateSettings(data: EditSettingsTypes) {
    //initialize firestore
    let db = firebase.firestore();

    try {
      //current user
      const user = firebase.auth().currentUser;
      const email = user?.email as string;

      //updated user data
      const updatedUserData = {
        displayName: data.displayname,
        photoURL: data.profileImage,
        email: email,
        userId: user?.uid,
        firstName: data.firstname,
        lastName: data.lastname,
      };

      //set new user information in firestore
      let docRef = await db
        .collection("users")
        .doc(user?.uid)
        .set(updatedUserData);

      setCurrentUser(updatedUserData);
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async function resetPassword(email: string) {
    try {
      //send reset email to user
      const auth = await firebase.auth().sendPasswordResetEmail(email);

      toast.success("Resete Email link sended! 😉", {
        bodyClassName: "toastify",
        className: "toastify__success",
      });
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
        resetPassword,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

//custom  useAuth hook
export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
