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
    <button
      onClick={() => handleClick()}
      className={styles.roudedButton}
      label-title={labelTitle}
    >
      <img src={img} alt={textAlt} />
    </button>
  );
};

export default RoundedButton;
