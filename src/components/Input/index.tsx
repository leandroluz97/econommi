import { FormEvent } from "react"
import styles from "./styles.module.scss"
interface InputProps {
  type: string
  label: string
  value: string
  name: string
  require: boolean
  handleInput: (e: FormEvent<HTMLInputElement>) => void
}
const Input = ({
  type,
  label,
  value,
  require,
  handleInput,
  name,
}: InputProps) => {
  return (
    <div className={styles.input__group}>
      <label>
        {label} <span>{require && "*"}</span>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => handleInput(e)}
      />
    </div>
  )
}

export default Input
