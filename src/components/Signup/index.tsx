import React, { ChangeEvent, FormEvent, useState } from "react"
import Input from "../Input"
import SliderButtons from "../SliderButtons"
import styles from "./styles.module.scss"
import google from "../../assets/google.svg"
import { useForm } from "react-hook-form"
import { useUI } from "../../hooks/useUi"
import { useAuth } from "../../hooks/useAuth"

interface SignupState {
  firstName: string
  lastName: string
  email: string
  password: string
  repeatPassword: string
}

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    reset,
  } = useForm<SignupState>()

  const { passwordEye, repeatEye } = useUI()
  const { onSubmitGmail, onSignupPassword } = useAuth()

  async function onSubmit(data: SignupState) {
    try {
      const user = await onSignupPassword(data.email, data.password)

      reset()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className={styles.signup}>
      <SliderButtons />
      <form className={styles.signup__form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.signup__form__inputs}>
          <div className={styles.signup__form__util}>
            <Input
              property={register("firstName", {
                required: "Invalid First Name",
                minLength: {
                  value: 2,
                  message: "Must have 8 characters",
                },
              })}
              label='First Name'
              type='text'
              error={errors.firstName}
              name='firstName'
            />
            <Input
              property={register("lastName", {
                required: "Invalid Last Name",
                minLength: {
                  value: 2,
                  message: "Must have 8 characters",
                },
              })}
              label='Last Name'
              type='text'
              error={errors.lastName}
              name='lastName'
            />
          </div>

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
          <Input
            property={register("repeatPassword", {
              validate: (value) =>
                value === getValues("password") || "The passwords do not match",
            })}
            label='Repeat Password'
            type={repeatEye ? "text" : "password"}
            name='repeatPassword'
            error={errors.repeatPassword}
            visible={repeatEye}
          />
        </div>

        <div className={styles.signup__form__submit}>
          <input type='submit' value='Signup!' />
        </div>
      </form>
      <button
        type='button'
        className={styles.signup__google}
        onClick={() => onSubmitGmail()}
      >
        <img src={google} alt='Google Logo' />
        Signup With Google
      </button>

      <p className={styles.signup__policy}>
        By clicking on the button above, you agree with our
        <a href='#'> terms of Service</a> and <a href='#'> Privacy Policy</a> .
      </p>
    </div>
  )
}

export default Signup
