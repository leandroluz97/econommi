import React from "react"
import { Switch, Route } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Signup from "../pages/Signup"

const Routes = () => {
  return (
    <>
      <Switch>
        <Route path='/signup' component={Signup} />
        <Route exact path='/' component={Dashboard} />
      </Switch>
    </>
  )
}

export default Routes
