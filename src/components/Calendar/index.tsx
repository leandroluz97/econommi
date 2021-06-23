import React, { RefObject, useState } from "react";
import styles from "./styles.module.scss";
import Modal from "react-modal";
import yearArrowLeft from "../../assets/yearArrowLeft.svg";
import yearArrowRight from "../../assets/yearArrowRight.svg";
import firebase from "../../config/firebase-config";
import { useTransactions } from "../../hooks/useTransactions";
import { usePlanning } from "../../hooks/usePlanning";

interface CalendarModalProps {
  closeCalendar: () => void;
}

interface handleFilterByMonthTypes {
  monthId: number;
  monthName: string;
}

const Calendar = ({ closeCalendar }: CalendarModalProps) => {
  const [year, setYear] = useState(2021);
  const [months, setMonths] = useState([
    { id: "jan", month: "JAN", numeric: 1, name: "January" },
    { id: "fev", month: "FEV", numeric: 2, name: "February" },
    { id: "mar", month: "MAR", numeric: 3, name: "March" },
    { id: "abr", month: "ABR", numeric: 4, name: "April" },
    { id: "may", month: "MAY", numeric: 5, name: "May" },
    { id: "jun", month: "JUN", numeric: 6, name: "June" },
    { id: "jul", month: "JUL", numeric: 7, name: "July" },
    { id: "aug", month: "AUG", numeric: 8, name: "August" },
    { id: "oct", month: "OCT", numeric: 9, name: "September" },
    { id: "sep", month: "SEP", numeric: 10, name: "October" },
    { id: "nov", month: "NOV", numeric: 11, name: "November" },
    { id: "dec", month: "DEC", numeric: 12, name: "December" },
  ]);

  const { chosenMonth, setChosenMonth, filterTransactionsByMonth } =
    useTransactions();
  const { filterPlanningByMonth } = usePlanning();

  function handleFilterByMonth({
    monthId,
    monthName,
  }: handleFilterByMonthTypes) {
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

    localStorage.setItem(
      "@econommi:currentMonthName",
      JSON.stringify(monthName)
    );
    localStorage.setItem("@econommi:currentMonthId", JSON.stringify(monthId));

    filterTransactionsByMonth({ timestampStartOfMonth, timestampEndOfMonth });
    filterPlanningByMonth({ timestampStartOfMonth, timestampEndOfMonth });
    setChosenMonth(monthName);
    closeCalendar();
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
          <div
            key={mon.id}
            onClick={() =>
              handleFilterByMonth({ monthId: mon.numeric, monthName: mon.name })
            }
          >
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
