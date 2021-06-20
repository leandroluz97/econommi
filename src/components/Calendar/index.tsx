import React from "react";
import styles from "./styles.module.scss";
import Modal from "react-modal";

interface CalendarModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
}

const Calendar = ({ modalIsOpen, closeModal }: CalendarModalProps) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="global__modal"
      overlayClassName="global__overlay"
      contentLabel="Profile Configuration"
    >
      <form className={styles.form}>
        <div className={styles.calendar}>
          <div className={styles.calendar__month}></div>
          <div>
            <button>JAN</button>
          </div>
          <div>
            <button>FEV</button>
          </div>
          <div>
            <button>MAR</button>
          </div>
          <div>
            <button>ABR</button>
          </div>
          <div>
            <button>MAY</button>
          </div>
          <div>
            <button>JUN</button>
          </div>
          <div>
            <button>JUL</button>
          </div>
          <div>
            <button>AGO</button>
          </div>
          <div>
            <button>SEP</button>
          </div>
          <div>
            <button>OCT</button>
          </div>
          <div>
            <button>NOV</button>
          </div>
          <div>
            <button>DEC</button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default Calendar;
