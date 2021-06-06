import React from "react"
import styles from "./styles.module.scss"

interface RoundedButtonProps {
  img: string
  handleClick: () => void
  textAlt: string
}
const RoundedButton = ({ img, handleClick,textAlt }: RoundedButtonProps) => {
  return (
    <button onClick={() => handleClick()} className={styles.roudedButton}>
      <img src={img} alt={textAlt} />
    </button>
  )
}

export default RoundedButton
