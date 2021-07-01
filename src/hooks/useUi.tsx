import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface UiProviderType {
  children: ReactNode;
}

interface UiProps {
  isActive: boolean;
  setisActive: (isActive: boolean) => void;
  passwordEye: boolean;
  setPasswordEye: (value: boolean) => void;
  repeatEye: boolean;
  setRepeat: (value: boolean) => void;
  page: string;
  setPage: (value: string) => void;
  openMenu: boolean;
  setOpenMenu: (value: boolean) => void;
  modalIsOpenAdd: boolean;
  setIsOpenAdd: (value: boolean) => void;
}

//Context
const UiContext = createContext<UiProps>({} as UiProps);

//Provider
export const UiProvider = ({ children }: UiProviderType) => {
  const [isActive, setisActive] = useState<boolean>(false);
  const [passwordEye, setPasswordEye] = useState<boolean>(false);
  const [repeatEye, setRepeat] = useState<boolean>(false);
  const [page, setPage] = useState<string>("dashboard");
  const [openMenu, setOpenMenu] = useState(true);
  const [modalIsOpenAdd, setIsOpenAdd] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    //colors
    const colorLight = [
      "--gray-100: #f7fafb;",
      "--gray-200: #dcdcdc;",
      "--gray-300: #dadada;",
      "--gray-400: #afafaf;",
      "--gray-450: #a4a4a4;",
      "--gray-500: #72818d;",
      "--gray-550: #959595;",
      "--gray-600: #7d7d7d;",
      "--gray-700: #5a646d;",
      "--gray-900: #434343;",
    ];
    const colorDark = [
      "--background: #121721",
      " --card: #19202d",
      "--text: #FFFFFF",
      "--border: #313743",
    ];

    //root css variables
    const root = document.getElementsByTagName("html")[0];
    root.style.cssText = !darkTheme
      ? colorDark.join(";")
      : colorLight.join(";");
  }, [darkTheme]);

  //handle set theme
  function handleSwitchTheme() {
    setDarkTheme(!darkTheme);
  }

  return (
    <UiContext.Provider
      value={{
        isActive,
        setisActive,
        passwordEye,
        setPasswordEye,
        repeatEye,
        setRepeat,
        page,
        setPage,
        openMenu,
        setOpenMenu,
        setIsOpenAdd,
        modalIsOpenAdd,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

export function useUI() {
  const context = useContext(UiContext);

  return context;
}
