import React from "react"
import Signin from "../../components/Signin"
import styles from "./styles.module.scss"
import money from "../../assets/money.png"

const SignIn = () => {
  return (
    <>
      <div className={styles.signin}>
        <div className={styles.signin__wrapper}>
          <Signin />
          <div className={styles.signin__content}>
            <img src={money} alt='money' />
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
