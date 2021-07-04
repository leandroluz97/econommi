import { useEffect, useState } from "react";

import styles from "./styles.module.scss";
import plusImg from "../../assets/plusComponent.svg";
import edit from "../../assets/Edit.svg";

import NewCategoryModal from "../../components/NewCategoryModal";
import RoundedButton from "../../components/RoundedButton";
import EditCategoryModal from "../../components/EditCategoryModal";

import { useCategories } from "../../hooks/useCategories";

const Categories = () => {
  //Ui states
  const [modalIsOpenAdd, setIsOpenAdd] = useState(false);
  const [modalIsOpenEdit, setIsOpenEdit] = useState(false);

  //hooks
  const { categories, getAllCategories, editCategories } = useCategories();

  useEffect(() => {
    (async function () {
      //Load all categories from firestore
      await getAllCategories();
    })();
  }, []);

  //Open new category modal when plus button clicked
  function handleNewCategory() {
    setIsOpenAdd(true);
  }

  //set  the category to be updated and open edit modal
  function handleEditCategory(id: string) {
    editCategories(id);
    setIsOpenEdit(true);
  }

  //close new category modal
  function closeModalAdd() {
    setIsOpenAdd(false);
  }

  //close edit category modal
  function closeModalEdit() {
    setIsOpenEdit(false);
  }

  return (
    <>
      <div className={styles.categories}>
        <h2>Categories</h2>
        <div className={styles.categories__buttons}>
          <div>
            <RoundedButton
              handleClick={handleNewCategory}
              img={plusImg}
              textAlt="Plus icon"
              labelTitle="New Category"
            />
          </div>
        </div>
        <div className={styles.categories__infos}>
          {categories.length >= 1 ? (
            <table className={styles.categories__table}>
              <thead>
                <tr>
                  <th></th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Icon</th>
                  <th>Color</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td>
                      <span
                        className={styles.categories__icon}
                        style={{
                          backgroundColor: `${category.color}`,
                        }}
                      >
                        <img src={category.icon} alt={category.name} />
                      </span>
                    </td>
                    <td>{category.name}</td>
                    <td>{category.type}</td>
                    <td>
                      <img
                        src={category.icon}
                        alt={category.name}
                        className={styles.categories__insideImg}
                      />
                    </td>
                    <td>
                      <span
                        className={styles.categories__insideColor}
                        style={{
                          backgroundColor: `${category.color}`,
                        }}
                      ></span>
                    </td>

                    <td>
                      <button onClick={() => handleEditCategory(category.id)}>
                        <img src={edit} alt="edit" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h3 className={styles.categories__empty}>Loading categories...</h3>
          )}
        </div>
      </div>

      <NewCategoryModal
        modalIsOpen={modalIsOpenAdd}
        closeModal={closeModalAdd}
      />
      {modalIsOpenEdit && (
        <EditCategoryModal
          modalIsOpen={modalIsOpenEdit}
          closeModal={closeModalEdit}
        />
      )}
    </>
  );
};

export default Categories;
