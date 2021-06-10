import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import Input from "../Input";
import styles from "./styles.module.scss";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import SelectOptions from "../SelectOptions/";
import { useTransactions } from "../../hooks/useTransactions";
import { useCategories } from "../../hooks/useCategories";

interface NewCategoryTypes {
  name: string;
  type: string;
}

type Categories = {
  name: string;
  type: string;
  color: string;
  icon: string;
  id: string;
};

interface CategoryAdd {
  name: string;
  type: string;
  color: string;
  icon: string;
}

interface NewCategoryModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
}

const EditCategoryModal = ({
  modalIsOpen,
  closeModal,
}: NewCategoryModalProps) => {
  const {
    getAllCategoriesPlus,
    colors,
    icons,
    colorChosen,
    iconChosen,
    setIconChosen,
    setColorChosen,
    addNewCategory,
    editCategoryStorage,
  } = useCategories();

  const typed = editCategoryStorage.type;

  const [type, setType] = useState(typed);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<NewCategoryTypes>();

  useEffect(() => {
    (async function () {
      await getAllCategoriesPlus(true);
    })();
    setValue("name", String(editCategoryStorage.name), {
      shouldValidate: true,
    });
  }, []);

  async function handleAddNewCategory(data: NewCategoryTypes) {
    try {
      const category = {
        name: data.name,
        type: type,
        color: colorChosen.color,
        icon: iconChosen.icon,
      } as CategoryAdd;

      console.log(category);

      //  await addNewCategory(category);

      reset();
      closeModal();
    } catch (error) {
      console.log(error.message);
    }
  }

  console.log(colorChosen.color, editCategoryStorage.color);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="global__modal"
      overlayClassName="global__overlay"
      contentLabel="Profile Configuration"
    >
      <form
        className={styles.form}
        onSubmit={handleSubmit(handleAddNewCategory)}
      >
        <img
          src={closeImg}
          alt="close"
          className={styles.form__close}
          onClick={() => closeModal()}
        />

        <h2>Edit Category</h2>

        <Input
          property={register("name", {
            required: "Invalid Name",
            minLength: {
              value: 2,
              message: "Entre a valid amount",
            },
          })}
          label="Name"
          type="text"
          error={errors.name}
          name="firstName"
        />
        <div>
          <span className={styles.form__label}>
            Colors <span>*</span>
          </span>
          <div className={styles.form__colors}>
            {colors.map((color) => (
              <div
                key={color.id}
                className={
                  colorChosen.color === color.color
                    ? `${styles.form__color} 
              ${styles.form__colorActive}`
                    : `${styles.form__color}`
                }
                onClick={() => setColorChosen(color)}
                style={{
                  backgroundColor: `${color.id}`,
                }}
              ></div>
            ))}
          </div>
        </div>

        <div>
          <span className={styles.form__label}>
            Colors <span>*</span>
          </span>
          <div className={styles.form__icons}>
            {icons.map((icon) => (
              <div
                key={icon.id}
                className={
                  iconChosen.icon === icon.icon
                    ? `${styles.form__icon} 
              ${styles.form__colorActive}`
                    : `${styles.form__icon}`
                }
                onClick={() => setIconChosen(icon)}
              >
                <img src={icon.icon} alt="default" />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.form__buttons}>
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
              type === "expenses"
                ? `${styles.form__buttons__outcome} ${styles.activeOutcome}`
                : `${styles.form__buttons__outcome}`
            }
            onClick={() => setType("expenses")}
          >
            <span>Outcome</span>
            <img src={outcomeImg} alt="outcome" />
          </div>
        </div>

        <div className={styles.form__submit}>
          <input type="submit" value="Add New Transactions" />
        </div>
      </form>
    </Modal>
  );
};

export default EditCategoryModal;
