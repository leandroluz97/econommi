import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import Input from "../Input";
import styles from "./styles.module.scss";
import closeImg from "../../assets/close.svg";
import SelectOptions from "../SelectOptions/";
import { useCategories } from "../../hooks/useCategories";
import { usePlanning } from "../../hooks/usePlanning";
import Spinner from "../../components/Spinner";

interface NewPlanningTypes {
  amount: string;
  category: string;
}

type Categories = {
  name: string;
  type: string;
  color: string;
  icon: string;
  id: string;
};

interface PlanningAdd {
  category: Categories[];
  createdAt: string;
  amount: number;
}

interface NewPlanningModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
}

const NewPlanningModal = ({
  modalIsOpen,
  closeModal,
}: NewPlanningModalProps) => {
  const { addNewPlanning } = usePlanning();

  const {
    getAllCategories,
    categories,
    getDefaultCategories,
    option,
    setOption,
  } = useCategories();

  //const [type, setType] = useState("income");
  const [isLoanding, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      await getAllCategories();
      await getDefaultCategories();
    })();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewPlanningTypes>();

  async function addNewTransaction(data: NewPlanningTypes) {
    setIsLoading(true);
    try {
      const newPlanning = {
        amount: Number(data.amount),
        category: [{ ...option }],
        createdAt: String(new Date()),
      } as PlanningAdd;

      await addNewPlanning(newPlanning);

      reset();
      closeModal();
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="global__modal"
      overlayClassName="global__overlay"
      contentLabel="Profile Configuration"
    >
      <form className={styles.form} onSubmit={handleSubmit(addNewTransaction)}>
        <img
          src={closeImg}
          alt="close"
          className={styles.form__close}
          onClick={() => closeModal()}
        />

        <h2>New Plan</h2>

        <div className={styles.form__select}>
          <SelectOptions
            options={categories}
            option={option}
            setOption={setOption}
          />
        </div>

        <Input
          property={register("amount", {
            required: "Invalid amount",
            minLength: {
              value: 1,
              message: "Entre a valid amount",
            },
          })}
          label="Limit Amount"
          type="number"
          error={errors.amount}
          name="amount"
        />

        {/* <Input
          property={register("description", {
            required: "Invalid Description",
            minLength: {
              value: 2,
              message: "Must have 8 characters",
            },
          })}
          label="Description"
          type="text"
          error={errors.description}
          name="description"
        />*/}
        {/*<div className={styles.form__buttons}>
          <div
            className={
              type === "income"
                ? `${styles.form__buttons__income} ${styles.activeIncome}`
                : `${styles.form__buttons__income}`
            }
            onClick={() => setType("income")}
          >
            <span>Income</span>
            <img src={incomeImg} alt="income" />
          </div>
          <div
            className={
              type === "outcome"
                ? `${styles.form__buttons__outcome} ${styles.activeOutcome}`
                : `${styles.form__buttons__outcome}`
            }
            onClick={() => setType("outcome")}
          >
            <span>Outcome</span>
            <img src={outcomeImg} alt="outcome" />
          </div>
        </div>*/}

        <div className={styles.form__submit}>
          {!isLoanding && <input type="submit" value={" NEW PLAN"} />}
          {isLoanding && <Spinner />}
        </div>
      </form>
    </Modal>
  );
};

export default NewPlanningModal;
