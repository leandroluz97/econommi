import plusComponent from "../../assets/plusComponent.svg"
import filterImg from "../../assets/filter.svg"
import searchImg from "../../assets/search.svg"
import trash from "../../assets/trash.svg"
import edit from "../../assets/Edit.svg"
import plusImg from "../../assets/plusComponent.svg"
import styles from "./styles.module.scss"
import RoundedButton from "../../components/RoundedButton"
import NewTransactionModal from "../../components/NewTransactionModal"
import { useEffect, useState } from "react"
import { useTransactions } from "../../hooks/useTransactions"
import { useCategories } from "../../hooks/useCategories"

const Transactions = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const { transactions } = useTransactions()
  const { getAllCategories, categories, getDefaultCategories } = useCategories()

  useEffect(() => {
    /*
    ;(async function () {
      await getAllCategories()
      await getDefaultCategories()
    })()
    */
    console.log("Transf")
  }, [])

  function handleNewTransactions() {
    setIsOpen(true)
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }
  return (
    <>
      <div className={styles.transactions}>
        <div className={styles.transactions__buttons}>
          <div>
            <RoundedButton handleClick={handleNewTransactions} img={plusImg} />
          </div>

          <div>
            <RoundedButton
              handleClick={handleNewTransactions}
              img={searchImg}
            />
            <RoundedButton
              handleClick={handleNewTransactions}
              img={filterImg}
            />
          </div>
        </div>

        {transactions !== null ? (
          <table className={styles.transactions__table}>
            <thead>
              <tr>
                <th></th>
                <th>Category</th>
                <th>Type</th>
                <th>Date</th>
                <th>Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>
                    <span
                      className={styles.transactions__icon}
                      style={{
                        backgroundColor: `${transaction.category[0].color}`,
                      }}
                    >
                      <img
                        src={transaction.category[0].icon}
                        alt={transaction.category[0].name}
                      />
                    </span>
                  </td>
                  <td>{transaction.category[0].name}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.date}</td>
                  <td>€ {transaction.amount}</td>
                  <td>
                    <button>
                      <img src={edit} alt='edit' />
                    </button>
                    <button>
                      <img src={trash} alt='edit' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2 className={styles.transactions__empty}>
            You don't have any transactions.
          </h2>
        )}
      </div>
      <NewTransactionModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </>
  )
}

export default Transactions
