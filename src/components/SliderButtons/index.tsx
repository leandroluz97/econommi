import React, { useState } from "react"
import styles from "./styles.module.scss"

interface ActiveType {
  isActive: boolean
}
const SliderButtons = () => {
  const [isActive, setisActive] = useState<boolean>(false)
  return (
    <div className={styles.SliderButtons}>
      <button
        className={isActive ? styles.active : ""}
        onClick={() => setisActive(true)}
      >
        Signin
      </button>
      <button
        className={!isActive ? styles.active : ""}
        onClick={() => setisActive(false)}
      >
        Signup
      </button>
    </div>
  )
}

export default SliderButtons
