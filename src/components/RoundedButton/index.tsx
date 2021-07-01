import React from "react";
import styles from "./styles.module.scss";

interface RoundedButtonProps {
  img: string;
  handleClick: () => void;
  textAlt: string;
  labelTitle?: string;
}
const RoundedButton = ({
  img,
  handleClick,
  textAlt,
  labelTitle,
}: RoundedButtonProps) => {
  return (
    <div className={styles.rounded}>
      <button onClick={() => handleClick()} className={styles.rounded__button}>
        <img src={img} alt={textAlt} />
      </button>
      <span className={styles.rounded__title}>{labelTitle}</span>
    </div>
  );
};

export default RoundedButton;
