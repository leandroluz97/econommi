import React, { ChangeEvent, FormEvent, useState } from "react"
import Input from "../Input"
import SliderButtons from "../SliderButtons"
import styles from "./styles.module.scss"
import google from "../../assets/google.svg"
import { useForm } from "react-hook-form"

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

  //console.log(watch())

  /*
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
*/

  const onSubmit = (data: any) => {
    console.log(data)

    reset()
  }

  //
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
            type='password'
            name='password'
            error={errors.password}
          />
          <Input
            property={register("repeatPassword", {
              validate: (value) =>
                value === getValues("password") || "The passwords do not match",
            })}
            label='Repeat Password'
            type='password'
            name='password'
            error={errors.repeatPassword}
          />
        </div>

        <div className={styles.signup__form__submit}>
          <input type='submit' value='Signup!' />
        </div>
      </form>
      <button type='button' className={styles.signup__google}>
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

/*
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
        </div>

        <div className={styles.signup__form__buttons}>
          <button type='button'>Signup!</button>
        </div>
      </form>
      <button type='button'>
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
*/
