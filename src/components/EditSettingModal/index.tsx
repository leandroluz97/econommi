import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import Input from "../Input";
import styles from "./styles.module.scss";
import closeImg from "../../assets/close.svg";
import { useAuth } from "../../hooks/useAuth";
import Spinner from "../../components/Spinner";

interface EditSettingsTypes {
  displayname: string;
  firstname: string;
  lastname: string;
  profileImage: string;
}

interface EditSettingsModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
}

const EditSettingsModal = ({
  modalIsOpen,
  closeModal,
}: EditSettingsModalProps) => {
  const { currentUser, updateSettings } = useAuth();
  const [isLoanding, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<EditSettingsTypes>();

  useEffect(() => {
    /*
    (async function () {
      await getAllCategories();
      await getDefaultCategories();
    })();
    */
    setValue("displayname", String(currentUser?.displayName), {
      shouldValidate: true,
    });
    setValue("firstname", String(currentUser?.firstName), {
      shouldValidate: true,
    });
    setValue("lastname", String(currentUser?.lastName), {
      shouldValidate: true,
    });
    setValue("profileImage", String(currentUser?.photoURL), {
      shouldValidate: true,
    });
  }, []);

  async function addNewTransaction(data: EditSettingsTypes) {
    setIsLoading(true);
    try {
      const newPlanning = {
        displayname: data.displayname,
        firstname: data.firstname,
        lastname: data.lastname,
        profileImage: data.profileImage,
      } as EditSettingsTypes;

      await updateSettings(newPlanning);
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

        <h2>Edit Profile</h2>

        <Input
          property={register("displayname", {
            required: "Invalid display name",
            minLength: {
              value: 1,
              message: "Entre a valid display name",
            },
          })}
          label="Display Name"
          type="text"
          error={errors.displayname}
          name="displayname"
        />
        <Input
          property={register("firstname", {
            required: "Invalid First Name",
            minLength: {
              value: 3,
              message: "Entre a valid First Name",
            },
          })}
          label="First Name"
          type="text"
          error={errors.firstname}
          name="firstname"
        />
        <Input
          property={register("lastname", {
            required: "Invalid Last Name",
            minLength: {
              value: 3,
              message: "Entre a valid Last Name",
            },
          })}
          label="Last Name"
          type="text"
          error={errors.lastname}
          name="lastname"
        />

        <Input
          property={register("profileImage", {
            required: "Invalid url image",
            pattern: /^((ftp|http|https):\/\/)/i,
          })}
          label="Profile Image Url"
          type="text"
          error={errors.profileImage}
          name="profileImage"
        />

        <div className={styles.form__submit}>
          {!isLoanding && <input type="submit" value={"UPDATE SETTINGS"} />}
          {isLoanding && <Spinner />}
        </div>
      </form>
    </Modal>
  );
};

export default EditSettingsModal;
