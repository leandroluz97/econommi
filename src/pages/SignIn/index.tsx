import styles from "./styles.module.scss";

import money from "../../assets/money.png";
import econommi from "../../assets/econommi.svg";

import Signin from "../../components/Signin";

const SignIn = () => {
  return (
    <>
      <div className={styles.signin}>
        <div className={styles.signin__wrapper}>
          <Signin />
          <div className={styles.signin__content}>
            <div className={styles.signin__title}>
              <img src={econommi} alt="Econommi logo" />
              <p>
                A platform where you can manage and keep <br /> track of your
                Income and Expenses <br /> to achieve your
                <span> financial freedom</span>.
              </p>
            </div>

            <img src={money} alt="money" />
            <div className={styles.signin__quote}>
              <p>
                “Nobody spends somebody else's money <br />
                as wisely as he spends his own.”
              </p>
              <p>
                <i>-Milton Friedman</i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
