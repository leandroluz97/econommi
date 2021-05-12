import React, { FormEvent, useState } from "react"
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

  const onSubmit = (data: any) => console.log(data)
  return (
    <div className={styles.signup}>
      <SliderButtons />
      <form className={styles.signup__form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.signup__form__inputs}>
          <div className={styles.signup__form__util}>
            <Input
              teste={register("firstName", {
                required: "Please. Enter a valid Name!",
                minLength: 2,
              })}
              label='First Name'
              type='text'
              error={errors.firstName}
            />
            <Input
              teste={register("lastName", {
                required: "Please. Enter a valid Name",
                minLength: 2,
              })}
              label='Last Name'
              type='text'
              error={errors.firstName}
            />
          </div>

          <Input
            teste={register("email", {
              required: "Invalid Email",
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
            label='Email'
            type='email'
            error={errors.email}
          />
          <Input
            teste={register("password")}
            label='Password'
            type='password'
          />
          <Input
            teste={register("repeatPassword")}
            label='Repeat Password'
            type='password'
          />
        </div>

        {/*<div className={styles.signup__form__buttons}>
          <button type='button'>Signup!</button>
  </div>*/}

        <input type='submit' value='submit' />
      </form>
      {/* <button type='button'>
        <img src={google} alt='Google Logo' />
        Signup With Google
  </button>*/}

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
