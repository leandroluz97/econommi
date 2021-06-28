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
import Spinner from "../../components/Spinner";

interface emailType {
  email: string;
}

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<emailType>();

  const { resetPassword } = useAuth();

  let history = useHistory();

  const onSubmit = async (data: emailType) => {
    setIsLoading(true);
    try {
      await resetPassword(data.email);

      setIsLoading(false);
      // history.push("/signin");
    } catch (error) {
      console.log("aqui", error.message);
    }
  };

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
          {isLoading ? (
            <div className={styles.spin}>
              <Spinner />
            </div>
          ) : (
            <input type="submit" value="Reset Password" />
          )}
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
