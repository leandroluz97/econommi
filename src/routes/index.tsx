import React from "react"
import { Switch, Route } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Signup from "../pages/Signup"
import Signin from "../pages/SignIn"
import Menu from "../components/Menu"
import styles from "./styles.module.scss"

const Routes = () => {
  return (
    <>
      <Switch>
        <Route path='/signup' component={Signup} />
        <Route path='/signin' component={Signin} />

        <div className={styles.layout}>
          <Menu />
          <Route exact path='/' component={Dashboard} />
        </div>
      </Switch>
    </>
  )
}

export default Routes
