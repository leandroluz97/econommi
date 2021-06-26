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

  useEffect(() => {}, []);

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
