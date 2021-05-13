import { FormEvent, Ref } from "react"
import {
  useForm,
  ValidationRule,
  UseFormRegisterReturn,
  FieldError,
} from "react-hook-form"
import styles from "./styles.module.scss"

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
}

const Input = ({ label, property, error, type }: InputProps) => {
  console.log(property)

  return (
    <div className={styles.input__group}>
      <label>
        {label} <span>{true && "*"}</span>
      </label>
      <input {...property} type={type} />
      <span className={styles.input__error}>{error && error.message}</span>
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
