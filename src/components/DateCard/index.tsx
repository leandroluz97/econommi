import React, { useEffect, useRef, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import styles from "./styles.module.scss";
import Calendar from "../Calendar";
import caretdownBig from "../../assets/caretdownBig.svg";
import caretdownUp from "../../assets/caretdownUp.svg";

const DateCard = () => {
  const [calendarModalIsOpen, setCalendarModalIsOpen] = useState(false);
  const { chosenMonth, setChosenMonth } = useTransactions();

  let calendarRef = useRef({} as HTMLDivElement);

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      event.stopImmediatePropagation();
      if (!calendarRef.current?.contains(event.target as HTMLElement)) {
        console.log(event.target, calendarRef.current);
        setCalendarModalIsOpen(false);
      }
    });
  }, []);

  function calendarCloseModal() {
    setCalendarModalIsOpen(false);
  }
  function handleOpenCalendarModal() {
    setCalendarModalIsOpen(true);
  }
  return (
    <div className={styles.date} ref={calendarRef}>
      <p>{chosenMonth}</p>
      {calendarModalIsOpen ? (
        <span onClick={calendarCloseModal}>
          <img src={caretdownUp} alt="Caret Up" />
        </span>
      ) : (
        <span onClick={handleOpenCalendarModal}>
          <img src={caretdownBig} alt="Caret Down" />
        </span>
      )}

      {calendarModalIsOpen && <Calendar closeCalendar={calendarCloseModal} />}
    </div>
  );
};

export default DateCard;
