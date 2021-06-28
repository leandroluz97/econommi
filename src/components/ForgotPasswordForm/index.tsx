import React, { FormEvent, useEffect, useState } from "react";
import Input from "../Input";
import SliderButtons from "../SliderButtons";
import styles from "./styles.module.scss";
import google from "../../assets/google.svg";
import { useForm } from "react-hook-form";
import { useUI } from "../../hooks/useUi";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

interface SigninState {
  email: string;
  password: string;
}

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninState>();

  useEffect(() => {
    console.log("signin");
  }, []);

  const { passwordEye } = useUI();
  const { onSubmitGmail, onSigninPassword } = useAuth();

  let history = useHistory();

  const onSubmit = async (data: SigninState) => {
    try {
      await onSigninPassword(data.email, data.password);

      history.push("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  async function handleGmailSignup() {
    try {
      await onSubmitGmail();

      history.push("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className={styles.signin}>
      <h1>Password Reset</h1>
      <form className={styles.signin__form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.signin__form__inputs}>
          <Input
            property={register("email", {
              required: "Invalid Email",
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
            label="Email"
            type="email"
            error={errors.email}
            name="email"
          />
        </div>

        <div className={styles.signin__form__submit}>
          <input type="submit" value="Reset Password" />
        </div>
      </form>

      <div className={styles.signin__backToSingIn}>
        <Link to="/signin">Back To SignIn</Link>
      </div>

      <p className={styles.signin__policy}>
        By clicking on the button above, you agree with our
        <a href="/"> terms of Service</a> and <a href="/"> Privacy Policy</a> .
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
