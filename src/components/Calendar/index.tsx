import React, { RefObject, useState } from "react";
import styles from "./styles.module.scss";
import Modal from "react-modal";
import yearArrowLeft from "../../assets/yearArrowLeft.svg";
import yearArrowRight from "../../assets/yearArrowRight.svg";
import firebase from "../../config/firebase-config";

interface CalendarModalProps {
  refCalendar: any;
}

const Calendar = () => {
  const [year, setYear] = useState(2021);
  const [months, setMonths] = useState([
    { id: "jan", month: "JAN", numeric: 1 },
    { id: "fev", month: "FEV", numeric: 2 },
    { id: "mar", month: "MAR", numeric: 3 },
    { id: "abr", month: "ABR", numeric: 4 },
    { id: "may", month: "MAY", numeric: 5 },
    { id: "jun", month: "JUN", numeric: 6 },
    { id: "jul", month: "JUL", numeric: 7 },
    { id: "aug", month: "AUG", numeric: 8 },
    { id: "oct", month: "OCT", numeric: 9 },
    { id: "sep", month: "SEP", numeric: 10 },
    { id: "nov", month: "NOV", numeric: 11 },
    { id: "dec", month: "DEC", numeric: 12 },
  ]);

  function handleFilterByMonth(monthId: number) {
    const date = new Date();
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth();

    const totalDayOfMonth = new Date(year, monthId, 0).getDate();

    const startOfMonth = `${year}-${monthId}-${1}`;
    //const endOfMonth = `${totalDayOfMonth}-${monthId}-${year}`;
    const endOfMonth = `${year}-${monthId}-${totalDayOfMonth}`;

    const timestampStartOfMonth = firebase.firestore.Timestamp.fromDate(
      new Date(startOfMonth)
    );
    const timestampEndOfMonth = firebase.firestore.Timestamp.fromDate(
      new Date(endOfMonth)
    );

    console.log(timestampStartOfMonth, timestampEndOfMonth);
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.calendar__header}>
        <img src={yearArrowLeft} alt="left arrow" />
        <h3>{year}</h3>
        <img src={yearArrowRight} alt="right arrow" />
      </div>
      <div className={styles.calendar__months}>
        {months.map((mon) => (
          <div key={mon.id} onClick={() => handleFilterByMonth(mon.numeric)}>
            <p>{mon.month}</p>
          </div>
        ))}
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
