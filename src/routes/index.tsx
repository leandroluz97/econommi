import React from "react"
import { Switch, Route } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Signup from "../pages/Signup"
import Signin from "../pages/SignIn"

const Routes = () => {
  return (
    <>
      <Switch>
        <Route path='/signup' component={Signup} />
        <Route path='/signin' component={Signin} />
        <Route exact path='/' component={Dashboard} />
      </Switch>
    </>
  )
}

export default Routes
