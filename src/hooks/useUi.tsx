import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

interface UiProviderType {
  children: ReactNode
}

interface UiProps {
  isActive: boolean
  setisActive: (isActive: boolean) => void
  passwordEye: boolean
  setPasswordEye: (value: boolean) => void
  repeatEye: boolean
  setRepeat: (value: boolean) => void
}

//Context
const UiContext = createContext<UiProps>({} as UiProps)

//Provider
export const UiProvider = ({ children }: UiProviderType) => {
  const [isActive, setisActive] = useState<boolean>(false)
  const [passwordEye, setPasswordEye] = useState<boolean>(false)
  const [repeatEye, setRepeat] = useState<boolean>(false)

  useEffect(() => {}, [])

  return (
    <UiContext.Provider
      value={{
        isActive,
        setisActive,
        passwordEye,
        setPasswordEye,
        repeatEye,
        setRepeat,
      }}
    >
      {children}
    </UiContext.Provider>
  )
}

export function useUI() {
  const context = useContext(UiContext)

  return context
}
