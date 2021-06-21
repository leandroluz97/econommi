import React, { RefObject, useState } from "react";
import styles from "./styles.module.scss";
import Modal from "react-modal";
import yearArrowLeft from "../../assets/yearArrowLeft.svg";
import yearArrowRight from "../../assets/yearArrowRight.svg";

interface CalendarModalProps {
  refCalendar: any;
}

const Calendar = () => {
  const [year, setYear] = useState(2021);
  return (
    <div className={styles.calendar}>
      <div className={styles.calendar__header}>
        <img src={yearArrowLeft} alt="left arrow" />
        <h3>{year}</h3>
        <img src={yearArrowRight} alt="right arrow" />
      </div>
      <div className={styles.calendar__months}>
        <div>
          <p>JAN</p>
        </div>
        <div>
          <p>FEV</p>
        </div>
        <div>
          <p>MAR</p>
        </div>
        <div>
          <p>ABR</p>
        </div>
        <div>
          <p>MAY</p>
        </div>
        <div>
          <p>JUN</p>
        </div>
        <div>
          <p>JUL</p>
        </div>
        <div>
          <p>AGO</p>
        </div>
        <div>
          <p>SEP</p>
        </div>
        <div>
          <p>OCT</p>
        </div>
        <div>
          <p>NOV</p>
        </div>
        <div>
          <p>DEC</p>
        </div>
      </div>

      <div className={styles.calendar__footer}>
        <button>Filter</button>
      </div>
    </div>
  );
};

export default Calendar;

/*isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={styles.calendar__modal}
      overlayClassName={styles.calendar__backdrop}
      contentLabel="Profile Configuration" */
