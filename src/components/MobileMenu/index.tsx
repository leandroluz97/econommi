import home from "../../assets/home.svg";
import transaction from "../../assets/transactions.svg";
import category from "../../assets/category.svg";
import notification from "../../assets/notification.svg";
import setting from "../../assets/setting.svg";
import share from "../../assets/share.svg";
import plus from "../../assets/plus.svg";
import planning from "../../assets/planning.svg";
import { Link } from "react-router-dom";
import { useUI } from "../../hooks/useUi";
import NewTransactionModal from "../NewTransactionModal";

import styles from "./styles.module.scss";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const MobileMenu = () => {
  const { page, setPage, openMenu, setOpenMenu, setIsOpenAdd, modalIsOpenAdd } =
    useUI();

  //handle open modal
  function handleNewTransaction() {
    setIsOpenAdd(true);
  }

  //handle close modal
  function closeModalAdd() {
    setIsOpenAdd(false);
  }

  useEffect(() => {
    //console.log('mobile');
  }, []);

  return (
    <>
      <div className={styles.mobileMenu}>
        <ul>
          <li className={page === "dashboard" ? styles.active : ""}>
            <Link to="/" onClick={() => setPage("dashboard")}>
              <img src={home} alt="Dashboard" />
              <span></span>
            </Link>
          </li>
          <li className={page === "transactions" ? styles.active : ""}>
            <Link to="/transactions" onClick={() => setPage("transactions")}>
              <img src={transaction} alt="Transactions" />
              <span></span>
            </Link>
          </li>
          <li className={page === "categories" ? styles.active : ""}>
            <Link to="/categories" onClick={() => setPage("categories")}>
              <img src={category} alt="Category" />
              <span></span>
            </Link>
          </li>
          <li className={page === "plannings" ? styles.active : ""}>
            <Link to="/plannings" onClick={() => setPage("plannings")}>
              <img src={planning} alt="Plannings" />
              <span></span>
            </Link>
          </li>
          <li className={page === "settings" ? styles.active : ""}>
            <Link to="/settings" onClick={() => setPage("settings")}>
              <img src={setting} alt="Settings" />
              <span></span>
            </Link>
          </li>
          <li className={page === "share" ? styles.active : ""}>
            <Link to="/share" onClick={() => setPage("share")}>
              <img src={share} alt="Share with friends" />
              <span></span>
            </Link>
          </li>
        </ul>

        <button type="button" onClick={handleNewTransaction}>
          <img src={plus} alt="Add transactions" />
        </button>
      </div>

      <NewTransactionModal
        modalIsOpen={modalIsOpenAdd}
        closeModal={closeModalAdd}
      />
    </>
  );
};

export default MobileMenu;
