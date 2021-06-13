import React from "react";
import styles from "./styles.module.scss";
import currency from "../../utils/currency";

interface AmountCardProps {
  type: string;
  amount: number;
  img: string;
  cardTitle?: string;
}
const AmountCard = ({ type, amount, img, cardTitle }: AmountCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__info}>
        <p>{type}</p>
        <p>{currency(amount)}</p>
      </div>

      <img src={img} alt={img} />

      {cardTitle && <span className={styles.card__cardTitle}>{cardTitle}</span>}
    </div>
  );
};

export default AmountCard;
