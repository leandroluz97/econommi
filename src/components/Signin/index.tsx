import React, { FormEvent, useState } from "react"
import Input from "../Input"
import SliderButtons from "../SliderButtons"
import styles from "./styles.module.scss"
import google from "../../assets/google.svg"

interface SignupState {
  email: string
  password: string
}

const Signin = () => {
  const [inputValues, setInputValues] = useState<SignupState>({
    email: "",
    password: "",
  })

  const handleInputValue = (event: FormEvent<HTMLInputElement>) => {
    let allInputValues = {
      ...inputValues,
      [event.currentTarget.name]: event.currentTarget.value,
    }

    setInputValues(allInputValues)
  }

  return (
    <div className={styles.signin}>
      <SliderButtons />
      <form className={styles.signin__form}>
        <div className={styles.signin__form__inputs}>
          <Input
            type='email'
            name='email'
            value={inputValues.email}
            label='Email'
            require
            handleInput={handleInputValue}
          />
          <Input
            type='password'
            name='password'
            value={inputValues.password}
            label='Password'
            require
            handleInput={handleInputValue}
          />

          <span className={styles.signin__form__forgot}>
            Forgot your password? <a href='#'>Click here</a>.
          </span>
        </div>

        <div className={styles.signin__form__buttons}>
          <button type='button'>Signin!</button>
          <button type='button'>
            <img src={google} alt='Google Logo' />
            Signin With Google
          </button>
        </div>
      </form>

      <p className={styles.signin__policy}>
        By clicking on the button above, you agree with our
        <a href='#'> terms of Service</a> and <a href='#'> Privacy Policy</a> .
      </p>
    </div>
  )
}

export default Signin
