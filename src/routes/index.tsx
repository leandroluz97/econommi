import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Signup from "../pages/Signup"
import Signin from "../pages/SignIn"
import Menu from "../components/Menu"
import styles from "./styles.module.scss"
import MobileMenu from "../components/MobileMenu"
import User from "../components/User"
import { useAuth } from "../hooks/useAuth"

const Routes = () => {
  const { currentUser } = useAuth()

  let routes = (
    <Switch>
      <Route path='/signup' component={Signup} />
      <Route path='/signin' component={Signin} />
      <Redirect to='/signin' />
    </Switch>
  )

  if (currentUser) {
    routes = (
      <div className={styles.layout}>
        <Menu />
        <MobileMenu />
        <User />
        <Switch>
          <Route exact path='/dashboard' component={Dashboard} />
          *<Redirect to='/dashboard' />
        </Switch>
      </div>
    )
  }
  return <>{routes}</>
}

export default Routes
