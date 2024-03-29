import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useState,
} from "react";
import styles from "./styles.module.scss";
import leftArrow from "../../assets/leftArrow.svg";
import rightArrow from "../../assets/rightArrow.svg";
import eLogo from "../../assets/e.svg";
import home from "../../assets/home.svg";
import transaction from "../../assets/transactions.svg";
import category from "../../assets/category.svg";
import planning from "../../assets/planning.svg";
import setting from "../../assets/setting.svg";
import share from "../../assets/share.svg";
import plus from "../../assets/plus.svg";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useUI } from "../../hooks/useUi";
import NewTransactionModal from "../NewTransactionModal";

const Menu = () => {
  const { page, setPage, openMenu, setOpenMenu, setIsOpenAdd } = useUI();

  //handle open modal
  function handleNewTransaction() {
    setIsOpenAdd(true);
  }

  //handle close modal
  function closeModalAdd() {
    setIsOpenAdd(false);
  }

  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname.slice(1);

    setPage(pathname);
  }, [location]);

  return (
    <>
      <div
        className={
          openMenu ? `${styles.menu}` : ` ${styles.menu} ${styles.menu__closed}`
        }
      >
        <div>
          <button onClick={() => setOpenMenu(!openMenu)}>
            {openMenu ? (
              <img src={leftArrow} alt="Left Arrow" />
            ) : (
              <img src={rightArrow} alt="Right Arrow" />
            )}
          </button>
          <div>
            <img src={eLogo} alt="Logo" />
          </div>
        </div>

        <ul>
          <li className={page === "dashboard" ? styles.active : ""}>
            <Link to="/dashboard" onClick={() => setPage("dashboard")}>
              <img src={home} alt="Dashboard" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className={page === "transactions" ? styles.active : ""}>
            <Link to="/transactions" onClick={() => setPage("transactions")}>
              <img src={transaction} alt="Transactions" />
              <span>Transactions</span>
            </Link>
          </li>
          <li className={page === "categories" ? styles.active : ""}>
            <Link to="/categories" onClick={() => setPage("categories")}>
              <img src={category} alt="Category" />
              <span>Categories</span>
            </Link>
          </li>
          <li className={page === "plannings" ? styles.active : ""}>
            <Link to="/plannings" onClick={() => setPage("plannings")}>
              <img src={planning} alt="Plannings" />
              <span>Plannings</span>
            </Link>
          </li>
          <li className={page === "settings" ? styles.active : ""}>
            <Link to="/settings" onClick={() => setPage("settings")}>
              <img src={setting} alt="Settings" />
              <span>Settings</span>
            </Link>
          </li>
          <li className={page === "share" ? styles.active : ""}>
            <Link to="/share" onClick={() => setPage("share")}>
              <img src={share} alt="Share with friends" />
              <span>Share with friends</span>
            </Link>
          </li>
        </ul>

        <button type="button" onClick={handleNewTransaction}>
          <img src={plus} alt="Add transactions" />
        </button>
      </div>
    </>
  );
};

export default Menu;
