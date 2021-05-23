import React, { FormEvent, useState } from "react"
import Input from "../Input"
import SliderButtons from "../SliderButtons"
import styles from "./styles.module.scss"
import google from "../../assets/google.svg"
import { useForm } from "react-hook-form"
import { useUI } from "../../hooks/useUi"
import { useAuth } from "../../hooks/useAuth"
import { useHistory } from "react-router-dom"

interface SigninState {
  email: string
  password: string
}

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm<SigninState>()

  const { passwordEye, repeatEye } = useUI()
  const { onSignupPassword, onSubmitGmail } = useAuth()

  let history = useHistory()

  const onSubmit = async (data: SigninState) => {
    try {
      let user = await onSignupPassword(data.email, data.password)

      history.push("/dashboard")
    } catch (error) {
      console.log(error.message)
    }
  }

  async function handleGmailSignup() {
    try {
      await onSubmitGmail()

      history.push("/dashboard")
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className={styles.signin}>
      <SliderButtons />
      <form className={styles.signin__form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.signin__form__inputs}>
          <Input
            property={register("email", {
              required: "Invalid Email",
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
            label='Email'
            type='email'
            error={errors.email}
            name='email'
          />
          <Input
            property={register("password", {
              required: "You must specify a password",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
            })}
            label='Password'
            type={passwordEye ? "text" : "password"}
            name='password'
            error={errors.password}
            visible={passwordEye}
          />

          <span className={styles.signin__form__forgot}>
            Forgot your password? <a href='#'>Click here</a>.
          </span>
        </div>

        <div className={styles.signin__form__submit}>
          <input type='submit' value='Signin!' />
        </div>
      </form>

      <button
        type='button'
        className={styles.signin__google}
        onClick={() => handleGmailSignup()}
      >
        <img src={google} alt='Google Logo' />
        Signin With Google
      </button>

      <p className={styles.signin__policy}>
        By clicking on the button above, you agree with our
        <a href='#'> terms of Service</a> and <a href='#'> Privacy Policy</a> .
      </p>
    </div>
  )
}

export default Signin
