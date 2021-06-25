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
  timestamp?: firebase.firestore.Timestamp;
}
type PlanningAdd = {
  category: Categories[];
  createdAt: string;
  amount: number;
  timestamp?: firebase.firestore.Timestamp;
};

interface filterPlanningByMonthType {
  timestampStartOfMonth: firebase.firestore.Timestamp;
  timestampEndOfMonth: firebase.firestore.Timestamp;
}

interface ContextProps {
  plannings: Planning[];
  addNewPlanning: (data: PlanningAdd) => Promise<void>;
  deletePlanning: (id: string) => Promise<void>;
  editPlanning: (id: string) => void;
  planEditStorage: Planning;
  updatePlanning: (data: PlanningAdd) => Promise<void>;
  filterPlanningByMonth: (data: filterPlanningByMonthType) => Promise<void>;
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
      //get atual date
      const date = new Date();
      const day = date.getDate();
      const year = date.getFullYear();
      let month = date.getMonth() + 1;

      //get the last day of the atual month ( 1-31)
      const totalDayOfMonth = new Date(year, month + 1, 0).getDate();

      //check if localstorage doesn't have any dated
      const storagedDate = localStorage.getItem("@econommi:currentMonthId");
      if (storagedDate) {
        month = Number(JSON.parse(storagedDate));
      }

      //first and last day of the month
      const startOfMonth = `${year}-${month}-${1}`;
      const endOfMonth = `${year}-${month}-${totalDayOfMonth}`;
      //const startOfMonth = `${year}-${month + 1}-${21}`;
      //const endOfMonth = `${totalDayOfMonth}-${monthId}-${year}`;

      //convert the start day of month to firestore timpstamp
      const timestampStartOfMonth = firebase.firestore.Timestamp.fromDate(
        new Date(startOfMonth)
      );

      //convert the last day of month to firestore timpstamp
      const timestampEndOfMonth = firebase.firestore.Timestamp.fromDate(
        new Date(endOfMonth)
      );

      await getAllPlanning({ timestampStartOfMonth, timestampEndOfMonth });
    })();
  }, []);

  async function getAllPlanning({
    timestampStartOfMonth,
    timestampEndOfMonth,
  }: filterPlanningByMonthType) {
    //Instance of firebase firestore
    let db = firebase.firestore();
    try {
      //get the authenticate user
      const user = firebase.auth().currentUser;
      const email = user?.email as string;

      //get planning from firestore
      let userPlannings = await db
        .collection("users")
        .doc(user?.uid)
        .collection("plannings")
        .where("createdAt", ">", timestampStartOfMonth)
        .where("createdAt", "<", timestampEndOfMonth)
        .orderBy("createdAt", "desc")
        .get();

      //iterate through the array data from firestore
      let planningsArray = [] as Planning[];
      userPlannings.forEach((snap) => {
        //convert firestore time to js date
        const date = new Date(snap.data().createdAt.toDate().getTime());

        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        planningsArray.push({
          ...snap.data(),
          id: snap.id,
          createdAt: `${day}/${month + 1}/${year}`,
          timestamp: snap.data().createdAt,
        } as Planning);
      });

      //set the array of planning
      setPlannings(planningsArray);
    } catch (error) {
      //Show error message
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async function filterPlanningByMonth({
    timestampStartOfMonth,
    timestampEndOfMonth,
  }: filterPlanningByMonthType) {
    //Instance of firebase firestore
    let db = firebase.firestore();
    try {
      //get the authenticate user
      const user = firebase.auth().currentUser;
      const email = user?.email as string;

      //get planning from firestore
      let userPlannings = await db
        .collection("users")
        .doc(user?.uid)
        .collection("plannings")
        .where("createdAt", ">", timestampStartOfMonth)
        .where("createdAt", "<", timestampEndOfMonth)
        .orderBy("createdAt", "desc")
        .get();

      //iterate through the array data from firestore
      let planningsArray = [] as Planning[];
      userPlannings.forEach((snap) => {
        const date = new Date(snap.data().createdAt.toDate().getTime());

        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        planningsArray.push({
          ...snap.data(),
          id: snap.id,
          createdAt: `${day}/${month + 1}/${year}`,
          timestamp: snap.data().createdAt,
        } as Planning);
      });

      setPlannings(planningsArray);
    } catch (error) {
      //Show error message
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async function addNewPlanning(data: PlanningAdd) {
    //Instance of firebase firestore
    let db = firebase.firestore();

    try {
      //get the authenticate user
      const user = firebase.auth().currentUser;
      const email = user?.email as string;

      //convert js date to firebase timestamp date
      const timestamp = firebase.firestore.Timestamp.fromDate(
        new Date(data.createdAt)
      );

      //new plan with firestore timestamp date
      const newData = {
        ...data,
        createdAt: timestamp,
      };

      //add new plan to plannnig firestore
      const newPlan = await db
        .collection("users")
        .doc(user?.uid)
        .collection("plannings")
        .add(newData);

      //returned plan from firestore
      const newPlanningData = await newPlan.get();

      //firestore timestamp date to js date
      const date = new Date(
        newPlanningData.data()?.createdAt.toDate().getTime()
      );

      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      //new planning
      let planning = {
        ...newPlanningData.data(),
        id: newPlanningData.id,
        createdAt: `${day}/${month + 1}/${year}`,
        timestamp: newPlanningData.data()?.createdAt,
      } as Planning;

      //all planning updated for ui
      let allPlanning = [planning, ...plannings];

      //set updated ui
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
    //Instance of firebase firestore
    let db = firebase.firestore();

    try {
      //get the authenticate user
      const user = firebase.auth().currentUser;
      const email = user?.email as string;

      //delete plan in firestore
      const deletePlanning = await db
        .collection("users")
        .doc(user?.uid)
        .collection("plannings")
        .doc(id)
        .delete();

      //remove deleted from ui
      const allPlanning = plannings.filter((plan) => plan.id !== id);

      //set all plan to ui
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
    //find plan to edit and store it
    const editPlanning = plannings.find((plan) => plan.id === id);

    //check plan otherwise do nothing
    if (editPlanning) {
      setPlanEditStorage(editPlanning);
    }
  }

  async function updatePlanning(data: PlanningAdd) {
    //Instance of firebase firestore
    let db = firebase.firestore();

    try {
      const user = firebase.auth().currentUser;
      const email = user?.email as string;

      const updatedData = {
        amount: data.amount,
        category: data.category,
        createdAt: data.timestamp,
      };

      //update plan in firestore
      const updatedPlanning = await db
        .collection("users")
        .doc(user?.uid)
        .collection("plannings")
        .doc(planEditStorage.id)
        .set(updatedData);

      //update plan in state
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
        filterPlanningByMonth,
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
