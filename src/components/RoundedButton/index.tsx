import React from "react"
import styles from "./styles.module.scss"

interface RoundedButtonProps {
  img: string
  handleClick: () => void
}
const RoundedButton = ({ img, handleClick }: RoundedButtonProps) => {
  return (
    <button onClick={() => handleClick()} className={styles.roudedButton}>
      <img src={img} alt='' />
    </button>
  )
}

export default RoundedButton
