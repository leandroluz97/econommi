import React from "react"
import styles from "./styles.module.scss"
import Signup from "../../components/Signup"
import money from "../../assets/money.png"

const index = () => {
  return (
    <div className={styles.signup}>
      <div className={styles.signup__wrapper}>
        <Signup />
        <div className={styles.signup__content}>
          <img src={money} alt='money' />
        </div>
      </div>
    </div>
  )
}

export default index
