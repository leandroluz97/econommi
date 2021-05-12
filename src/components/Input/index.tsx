import { FormEvent } from "react"
import { useForm } from "react-hook-form"
import styles from "./styles.module.scss"

interface InputProps {
  type: string
  label: string
}

const Input = ({ label, teste, error, type }: any) => {
  return (
    <div className={styles.input__group}>
      <label>
        {label} <span>{true && "*"}</span>
      </label>
      <input {...teste} type={type} />
      <span>{error && error.message}</span>
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
