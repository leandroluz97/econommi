import { type } from "os";
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

interface PlanningProviderType {
  children: ReactNode;
}

type Categories = {
  name: string;
  type: string;
  color: string;
  icon: string;
  id: string;
};

interface Planning {
  category: Categories[];
  createdAt: string;
  amount: number;
  id: string;
}
type PlanningAdd = {
  category: Categories[];
  createdAt: string;
  amount: number;
};
interface ContextProps {
  plannings: Planning[];
  addNewPlanning: (data: PlanningAdd) => Promise<void>;
  deletePlanning: (id: string) => Promise<void>;
  editPlanning: (id: string) => void;
  planEditStorage: Planning;
  updatePlanning: (data: PlanningAdd) => Promise<void>;
}

//Context
const PlanningContext = createContext<ContextProps>({} as ContextProps);

//Provider
export const PlanningProvider = ({ children }: PlanningProviderType) => {
  const [plannings, setPlannings] = useState<Planning[]>([]);
  const [planEditStorage, setPlanEditStorage] = useState<Planning>(
    {} as Planning
  );

  useEffect(() => {
    (async function () {
      await getAllPlanning();
    })();
  }, []);

  async function getAllPlanning() {
    let db = firebase.firestore();
    try {
      const user = firebase.auth().currentUser;
      const email = user?.email as string;

      let userPlannings = await db
        .collection("users")
        .doc(email)
        .collection("plannings")
        .orderBy("createdAt", "desc")
        .get();

      let planningsArray = [] as Planning[];
      userPlannings.forEach((snap) => {
        planningsArray.push({ ...snap.data(), id: snap.id } as Planning);
      });

      setPlannings(planningsArray);
    } catch (error) {}
  }

  async function addNewPlanning(data: PlanningAdd) {
    let db = firebase.firestore();

    try {
      const user = firebase.auth().currentUser;
      const email = user?.email as string;

      let docRef = db.collection("users").doc(email);

      const newPlan = await docRef.collection("plannings").add(data);

      const newTransactionId = await newPlan.get();

      let planning = {
        ...newTransactionId.data(),
        id: newTransactionId.id,
      } as Planning;

      let allPlanning = [planning, ...plannings];

      setPlannings(allPlanning);

      toast.success("Planning Created! 😉", {
        bodyClassName: "toastify",
        className: "toastify__success",
      });
    } catch (error) {
      console.log(error);

      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }
  async function deletePlanning(id: string) {
    let db = firebase.firestore();

    try {
      const user = firebase.auth().currentUser;
      const email = user?.email as string;

      let docRef = db.collection("users").doc(email);

      const deletePlanning = await docRef
        .collection("plannings")
        .doc(id)
        .delete();

      const allPlanning = plannings.filter((plan) => plan.id !== id);

      setPlannings(allPlanning);

      toast.success("Plan deleted 😉", {
        bodyClassName: "toastify",
        className: "toastify__success",
      });
    } catch (error) {
      console.log(error);

      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  function editPlanning(id: string) {
    const editPlanning = plannings.find((plan) => plan.id === id);
    if (editPlanning) {
      setPlanEditStorage(editPlanning);
    }
  }

  async function updatePlanning(data: PlanningAdd) {
    let db = firebase.firestore();

    try {
      const user = firebase.auth().currentUser;
      const email = user?.email as string;

      let docRef = db.collection("users").doc(email);

      const updatedPlanning = await docRef
        .collection("plannings")
        .doc(planEditStorage.id)
        .set(data);

      let allPlannings = plannings.map((plan) => {
        if (plan.id === planEditStorage.id) {
          return { id: planEditStorage.id, ...data };
        }

        return plan;
      }) as Planning[];

      setPlannings(allPlannings);
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  return (
    <PlanningContext.Provider
      value={{
        plannings,
        addNewPlanning,
        deletePlanning,
        editPlanning,
        planEditStorage,
        updatePlanning,
      }}
    >
      {children}
    </PlanningContext.Provider>
  );
};

export function usePlanning() {
  const context = useContext(PlanningContext);

  return context;
}
