import React, { useEffect, useState } from "react"
import RoundedButton from "../../components/RoundedButton"
import styles from './styles.module.scss'
import plusImg from "../../assets/plusComponent.svg"
import filterImg from "../../assets/filter.svg"
import { useTransactions } from "../../hooks/useTransactions"
import { useCategories } from "../../hooks/useCategories"
import NewCategoryModal from "../../components/NewCategoryModal"


const Categories = () => {

  const [modalIsOpenAdd, setIsOpenAdd] = useState(false)
  const [modalIsOpenEdit, setIsOpenEdit] = useState(false)
  const { transactions, deleteTransaction,editTransaction } = useTransactions()
  const { categories,getAllCategories} = useCategories()

  useEffect(() => {
   (async function () {
     await getAllCategories()
   })()
  }, [])

  function handleNewCategory() {
    setIsOpenAdd(true)
  }
  function handleEditCategory(id:string) {


    setIsOpenEdit(true)
  }

  function closeModalAdd() {
    setIsOpenAdd(false)
  }
  function closeModalEdit() {
    setIsOpenEdit(false)
  }
  return ( 
    <>
    <div className={styles.categories}>
      <h2>Categories</h2>
      <div className={styles.categories__buttons}>
        <div>
          <RoundedButton handleClick={handleNewCategory} img={plusImg} textAlt='Plus icon' />
        </div>
      </div>
      <div className={styles.categories__infos} >
      {transactions.length > 1 ? (
        <table className={styles.categories__table}>
          <thead>
            <tr>
              <th></th>
              <th>Category</th>
              <th>Type</th>
              <th>Icon</th>
              <th>Color</th>
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
                    <img
                      src={category.icon}
                      alt={category.name}
                    />
                  </span>
                </td>
                <td>{category.name}</td>
                <td>{category.type}</td>
                <td><img src={category.icon} alt={category.name} className={styles.categories__insideImg} /></td>
                <td><span className={styles.categories__insideColor} style={{
                      backgroundColor: `${category.color}`,
                    }}></span></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3 className={styles.transactions__empty}>
          You don't have any transactions.
        </h3>
      )}
      </div>
    </div>
    
    <NewCategoryModal modalIsOpen={modalIsOpenAdd} closeModal={closeModalAdd} />
  </>
)
}

export default Categories
