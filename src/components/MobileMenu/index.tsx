import home from "../../assets/home.svg"
import transaction from "../../assets/transactions.svg"
import category from "../../assets/category.svg"
import notification from "../../assets/notification.svg"
import setting from "../../assets/setting.svg"
import share from "../../assets/share.svg"
import plus from "../../assets/plus.svg"
import { Link } from "react-router-dom"
import { useUI } from "../../hooks/useUi"

import styles from "./styles.module.scss"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const MobileMenu = () => {
  const { page, setPage } = useUI()

  useEffect(()=> {
    console.log('mobile');
    
  },[])

  return (
    <div className={styles.mobileMenu}>
      <ul>
        <li className={page === "dashboard" ? styles.active : undefined}>
          <Link to='/' onClick={() => setPage("dashboard")}>
            <img src={home} alt='Dashboard' />
            <span></span>
          </Link>
        </li>
        <li className={page === "transactions" ? styles.active : undefined}>
          <Link to='transactions' onClick={() => setPage("transactions")}>
            <img src={transaction} alt='Transactions' />
            <span></span>
          </Link>
        </li>
        <li className={page === "categories" ? styles.active : undefined}>
          <Link to='categories' onClick={() => setPage("categories")}>
            <img src={category} alt='Category' />
            <span></span>
          </Link>
        </li>
        <li className={page === "notifications" ? styles.active : undefined}>
          <Link to='notifications' onClick={() => setPage("notifications")}>
            <img src={notification} alt='Notification' />
            <span></span>
          </Link>
        </li>
        <li className={page === "settings" ? styles.active : undefined}>
          <Link to='settings' onClick={() => setPage("settings")}>
            <img src={setting} alt='Settings' />
            <span></span>
          </Link>
        </li>
        <li className={page === "share" ? styles.active : undefined}>
          <Link to='share' onClick={() => setPage("share")}>
            <img src={share} alt='Share with friends' />
            <span></span>
          </Link>
        </li>
      </ul>

      <button type='button'>
        <img src={plus} alt='Add transactions' />
      </button>
    </div>
  )
}

export default MobileMenu
