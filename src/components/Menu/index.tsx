import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useState,
} from "react"
import styles from "./styles.module.scss"
import leftArrow from "../../assets/leftArrow.svg"
import rightArrow from "../../assets/rightArrow.svg"
import eLogo from "../../assets/e.svg"
import home from "../../assets/home.svg"
import transaction from "../../assets/transactions.svg"
import category from "../../assets/category.svg"
import notification from "../../assets/notification.svg"
import setting from "../../assets/setting.svg"
import share from "../../assets/share.svg"
import plus from "../../assets/plus.svg"
import { Link, useHistory, useLocation } from "react-router-dom"
import { useUI } from "../../hooks/useUi"

const Menu = () => {
  const { page, setPage, openMenu, setOpenMenu } = useUI()

  const location = useLocation()

  useEffect(() => {
    const pathname = location.pathname.slice(1)

    setPage(pathname)
  }, [location])

  return (
    <div
      className={
        openMenu ? `${styles.menu}` : ` ${styles.menu} ${styles.menu__closed}`
      }
    >
      <div>
        <button onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? (
            <img src={leftArrow} alt='Left Arrow' />
          ) : (
            <img src={rightArrow} alt='Right Arrow' />
          )}
        </button>
        <div>
          <img src={eLogo} alt='Logo' />
        </div>
      </div>

      <ul>
        <li className={page === "dashboard" ? styles.active : undefined}>
          <Link to='/dashboard' onClick={() => setPage("dashboard")}>
            <img src={home} alt='Dashboard' />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className={page === "transactions" ? styles.active : undefined}>
          <Link to='/transactions' onClick={() => setPage("transactions")}>
            <img src={transaction} alt='Transactions' />
            <span>Transactions</span>
          </Link>
        </li>
        <li className={page === "categories" ? styles.active : undefined}>
          <Link to='/categories' onClick={() => setPage("categories")}>
            <img src={category} alt='Category' />
            <span>Category</span>
          </Link>
        </li>
        <li className={page === "notifications" ? styles.active : undefined}>
          <Link to='/notifications' onClick={() => setPage("notifications")}>
            <img src={notification} alt='Notification' />
            <span>Notifications</span>
          </Link>
        </li>
        <li className={page === "settings" ? styles.active : undefined}>
          <Link to='/settings' onClick={() => setPage("settings")}>
            <img src={setting} alt='Settings' />
            <span>Settings</span>
          </Link>
        </li>
        <li className={page === "share" ? styles.active : undefined}>
          <Link to='share' onClick={() => setPage("share")}>
            <img src={share} alt='Share with friends' />
            <span>Share with friends</span>
          </Link>
        </li>
      </ul>

      <button type='button'>
        <img src={plus} alt='Add transactions' />
      </button>
    </div>
  )
}

export default Menu
