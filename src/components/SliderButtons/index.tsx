import React, { useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { useHistory, useLocation } from "react-router-dom"
import { useUI } from "../../hooks/useUi"

interface ActiveType {
  isActive: boolean
}
const SliderButtons = () => {
  const { isActive, setisActive } = useUI()

  let history = useHistory()
  let location = useLocation()

  useEffect(() => {
    let localURL = location.pathname.slice(1)

    if (localURL === "signin") setisActive(true)
    if (localURL === "signup") setisActive(false)
  }, [])

  const handleSignup = () => {
    setisActive(false)
    history.push("/signup")
  }

  const handleSignin = () => {
    setisActive(true)
    history.push("/signin")
  }
  return (
    <div className={styles.SliderButtons}>
      <button
        className={isActive ? styles.active : ""}
        onClick={() => handleSignin()}
      >
        Signin
      </button>
      <button
        className={!isActive ? styles.active : ""}
        onClick={() => handleSignup()}
      >
        Signup
      </button>
    </div>
  )
}

export default SliderButtons
