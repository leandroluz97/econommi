import React, { FormEvent, useState } from "react"
import Input from "../Input"
import SliderButtons from "../SliderButtons"
import styles from "./styles.module.scss"
import google from "../../assets/google.svg"

interface SignupState {
  firstName: string
  lastName: string
  email: string
  password: string
  repeatPassword: string
}

const Signup = () => {
  const [inputValues, setInputValues] = useState<SignupState>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  })

  const handleInputValue = (event: FormEvent<HTMLInputElement>) => {
    let allInputValues = {
      ...inputValues,
      [event.currentTarget.name]: event.currentTarget.value,
    }

    setInputValues(allInputValues)
  }
  return (
    <div className={styles.signup}>
      <SliderButtons />
      <form className={styles.signup__form}>
        <div className={styles.signup__form__inputs}>
          <div className={styles.signup__form__util}>
            <Input
              type='text'
              name='firstName'
              value={inputValues.firstName}
              label='First Name'
              require
              handleInput={handleInputValue}
            />
            <Input
              type='text'
              name='lastName'
              value={inputValues.lastName}
              label='Last Name'
              require
              handleInput={handleInputValue}
            />
          </div>

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
          <Input
            type='password'
            name='repeatPassword'
            value={inputValues.repeatPassword}
            label='Repeat Password'
            require
            handleInput={handleInputValue}
          />

          <span className={styles.signup__form__forgot}>
            Forgot your password? <a href='#'>Click here</a>.
          </span>
        </div>

        <div className={styles.signup__form__buttons}>
          <button type='button'>Signup!</button>
          <button type='button'>
            <img src={google} alt='Google Logo' />
            Signup With Google
          </button>
        </div>
      </form>

      <p className={styles.signup__policy}>
        By clicking on the button above, you agree with our
        <a href='#'> terms of Service</a> and <a href='#'> Privacy Policy</a> .
      </p>
    </div>
  )
}

export default Signup
