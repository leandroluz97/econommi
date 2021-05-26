import plusComponent from "../../assets/plusComponent.svg"
import filterImg from "../../assets/filter.svg"
import searchImg from "../../assets/search.svg"
import trash from "../../assets/trash.svg"
import edit from "../../assets/Edit.svg"
import plusImg from "../../assets/plusComponent.svg"
import styles from "./styles.module.scss"
import RoundedButton from "../../components/RoundedButton"
import NewTransactionModal from "../../components/NewTransactionModal"
import { useState } from "react"

const Transactions = () => {
  const [modalIsOpen, setIsOpen] = useState(false)

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
            <tr>
              <td></td>
              <td>Viagem</td>
              <td>Outcome</td>
              <td>02/05/2021</td>
              <td>€ 183,90</td>
              <td>
                <button>
                  <img src={edit} alt='edit' />
                </button>
                <button>
                  <img src={trash} alt='edit' />
                </button>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Viagem</td>
              <td>Outcome</td>
              <td>02/05/2021</td>
              <td>€ 183,90</td>
              <td>
                <button>
                  <img src={edit} alt='edit' />
                </button>
                <button>
                  <img src={trash} alt='edit' />
                </button>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Viagem</td>
              <td>Outcome</td>
              <td>02/05/2021</td>
              <td>€ 183,90</td>
              <td>
                <button>
                  <img src={edit} alt='edit' />
                </button>
                <button>
                  <img src={trash} alt='edit' />
                </button>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Viagem</td>
              <td>Outcome</td>
              <td>02/05/2021</td>
              <td>€ 183,90</td>
              <td>
                <button>
                  <img src={edit} alt='edit' />
                </button>
                <button>
                  <img src={trash} alt='edit' />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <NewTransactionModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </>
  )
}

export default Transactions
