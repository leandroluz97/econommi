import { FormEvent, Ref } from "react"
import {
  useForm,
  ValidationRule,
  UseFormRegisterReturn,
  FieldError,
} from "react-hook-form"
import styles from "./styles.module.scss"
import closeEyes from "../../assets/closeEyes.svg"
import openEyes from "../../assets/openEyes.svg"
import { useUI } from "../../hooks/useUi"

interface PropertyProps {
  onChange: () => void
  onClick: () => void
  ref: () => void
}
interface InputProps {
  rules?: ValidationRule
  name: string
  label: string
  type: "text" | "email" | "number" | "password"
  property: UseFormRegisterReturn
  error: FieldError | undefined
  visible?: boolean
  setVisibility?: (value: boolean) => void
}

const Input = ({ label, property, error, type, name }: InputProps) => {
  const { passwordEye, repeatEye, setPasswordEye, setRepeat } = useUI()

  let eye = <span></span>
  if (name === "password") {
    eye = (
      <span
        className={styles.input__eye}
        onClick={() => setPasswordEye(!passwordEye)}
      >
        <img src={passwordEye ? closeEyes : openEyes} alt='eyes' />
      </span>
    )
  }
  if (name === "repeatPassword") {
    eye = (
      <span className={styles.input__eye} onClick={() => setRepeat(!repeatEye)}>
        <img src={repeatEye ? closeEyes : openEyes} alt='eyes' />
      </span>
    )
  }

  return (
    <div className={styles.input__group}>
      <label htmlFor={name}>
        {label} <span>{true && "*"}</span>
      </label>
      <input {...property} type={type} id={name} />
      <span className={styles.input__error}>{error && error.message}</span>
      {eye}
    </div>
  )
}

export default Input

/*

interface InputProps {
  type: string
  label: string
  value: string
  name: string
  require: boolean
  handleInput: (e: FormEvent<HTMLInputElement>) => void
}
*/
