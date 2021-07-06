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

interface CategoriesProviderType {
  children: ReactNode;
}

type Categories = {
  name: string;
  type: string;
  color: string;
  icon: string;
  id: string;
};

type CategoriesAdd = {
  name: string;
  type: string;
  color: string;
  icon: string;
};

interface IconsType {
  id: string;
  icon: string;
}
interface ColorsType {
  id: string;
  color: string;
}

interface ContextProps {
  categories: Categories[];
  getAllCategories: () => Promise<void>;
  getDefaultCategories: () => Promise<void>;
  option: Categories;
  setOption: (option: Categories) => void;
  getAllCategoriesPlus: (edit: boolean) => Promise<void>;
  icons: IconsType[];
  colors: ColorsType[];
  colorChosen: ColorsType;
  setColorChosen: (option: ColorsType) => void;
  iconChosen: IconsType;
  setIconChosen: (option: IconsType) => void;
  addNewCategory: (data: CategoriesAdd) => void;
  editCategories: (id: string) => void;
  editCategoryStorage: Categories;
  updateCategories: (data: CategoriesAdd) => Promise<void>;
}

//Context
const CategoriesContext = createContext<ContextProps>({} as ContextProps);

//Provider
export const CategoriesProvider = ({ children }: CategoriesProviderType) => {
  const [categories, setCategories] = useState<Categories[]>([]);
  /*
  const [defaultCategory, setDefaultCategory] = useState<Categories>(
    {} as Categories
  );
  */

  const [option, setOption] = useState<Categories>({} as Categories);
  const [icons, setIcons] = useState<IconsType[]>([]);
  const [colors, setColors] = useState<ColorsType[]>([]);

  const [colorChosen, setColorChosen] = useState<ColorsType>({} as ColorsType);
  const [iconChosen, setIconChosen] = useState<IconsType>({} as IconsType);

  const [editCategoryStorage, setEditCategoryStorage] = useState<Categories>(
    {} as Categories
  );

  useEffect(() => {
    (async function () {
      await getDefaultCategories();
      //await getAllCategoriesPlus();
    })();
  }, []);

  async function getAllCategories() {
    //initialize firebase firestore
    let db = firebase.firestore();

    try {
      //get the authenticate user
      const user = firebase.auth().currentUser;

      //get all user categories
      let userCategories = await db
        .collection("users")
        .doc(user?.uid)
        .collection("categories")
        .where("color", "!=", null)
        .get();

      //array of categories with an specified id
      let categoriesArray = [] as Categories[];
      userCategories.forEach((snap) => {
        categoriesArray.push({ ...snap.data(), id: snap.id } as Categories);
      });

      //Get the first category as a default
      let defaultCategory = {} as Categories;
      defaultCategory = categoriesArray[0];

      //set default and all category
      setOption(defaultCategory);
      setCategories(categoriesArray);
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async function getDefaultCategories() {
    //initialize firebase firestore
    let db = firebase.firestore();

    try {
      //get the authenticate user
      const user = firebase.auth().currentUser;

      let defaultCategoryAsync = await db
        .collection("categories")
        .where("color", "!=", null)
        .get();

      let catDefault = {} as Categories;
      defaultCategoryAsync.forEach((cat) => {
        if (cat.data().name == "Salary") {
          catDefault = { id: cat.id, ...cat.data() } as Categories;
        }
      });

      //setOption(catDefault);
      //setDefaultCategory(catDefault);
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async function getAllCategoriesPlus(edit: boolean) {
    //initialize firebase firestore
    let db = firebase.firestore();

    try {
      //get the authenticate user
      const user = firebase.auth().currentUser;

      //get all plus categories colors from firestore
      let categoriesColors = await db
        .collection("categoriesplus")
        .doc("colors")
        .get();

      //get all plus categories icons from firestore
      let categoriesIcons = await db
        .collection("categoriesplus")
        .doc("icons")
        .get();

      //normalize color inside array of object with id
      let normalizedColors = [...categoriesColors.data()?.colors].reduce(
        (acc, color) => {
          acc = [...acc, { ["color"]: color, id: color }];

          return acc;
        },
        []
      );

      //normalize color inside array of object with id
      let normalizesIcons = [...categoriesIcons.data()?.icons].reduce(
        (acc, icon) => {
          acc = [...acc, { ["icon"]: icon, id: icon.slice(-12) }];

          return acc;
        },
        []
      );

      //set plus color and icons
      setColors(normalizedColors);
      setIcons(normalizesIcons);

      //if its from editin page request set the first item of array as default
      if (!edit) {
        setColorChosen(normalizedColors[0]);
        setIconChosen(normalizesIcons[0]);
      }
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  async function addNewCategory(data: CategoriesAdd) {
    //initialize firebase firestore
    let db = firebase.firestore();

    try {
      //get the authenticate user
      const user = firebase.auth().currentUser;

      //get current user by uid
      let docRef = db.collection("users").doc(user?.uid);

      //get cageroy with same name
      let checkCategory = await docRef
        .collection("categories")
        .where("name", "==", data.name)
        .get();

      //get empty state (true or false)
      let exist = await checkCategory.empty;

      //if category with that categories doesn't exist create new caregory
      //other wise do nothing
      if (exist) {
        //add new category to firestore
        const newCategory = await docRef.collection("categories").add(data);

        //get new category from firestore
        const newCategoryId = await newCategory.get();

        //create category with id
        let category = {
          ...newCategoryId.data(),
          id: newCategoryId.id,
        } as Categories;

        //get all categories from state and append new category
        let allCategories = [category, ...categories];

        //set categories updated
        setCategories(allCategories);

        toast.success("Category Added! 😉", {
          bodyClassName: "toastify",
          className: "toastify__success",
        });
      } else {
        toast.error("Category name already Exists", {
          bodyClassName: "toastify__error",
          className: "toastify",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  function editCategories(id: string) {
    //find category to update in state
    const editCategory = categories.find((category) => category.id === id);

    //if category exist set it to edit category storage state
    //other wise do nothing
    if (editCategory) {
      setEditCategoryStorage(editCategory);

      setColorChosen({ color: editCategory.color, id: editCategory.color });
      setIconChosen({
        icon: editCategory.icon,
        id: editCategory.icon.slice(-12),
      });
    }
  }

  async function updateCategories(data: CategoriesAdd) {
    //initialize firebase firestore
    let db = firebase.firestore();

    try {
      //get the authenticate user
      const user = firebase.auth().currentUser;

      //get user document from firestore by uid
      let docRef = db.collection("users").doc(user?.uid);

      //set updated category to firestore
      const updatedCategory = await docRef
        .collection("categories")
        .doc(editCategoryStorage.id)
        .set(data);

      //updated category in state
      let allCategories = categories.map((category) => {
        //get category in state with the same id as updated category  id
        if (category.id === editCategoryStorage.id) {
          return { id: editCategoryStorage.id, ...data };
        }

        return category;
      }) as Categories[];

      setCategories(allCategories);
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
  }

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        getAllCategories,
        getDefaultCategories,
        option,
        setOption,
        getAllCategoriesPlus,
        colors,
        icons,
        colorChosen,
        iconChosen,
        setColorChosen,
        setIconChosen,
        addNewCategory,
        editCategories,
        editCategoryStorage,
        updateCategories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

//custom hooks
export function useCategories() {
  const context = useContext(CategoriesContext);

  return context;
}
