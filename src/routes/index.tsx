import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import Signin from "../pages/SignIn";
import Menu from "../components/Menu";
import styles from "./styles.module.scss";
import MobileMenu from "../components/MobileMenu";
import User from "../components/User";
import { useAuth } from "../hooks/useAuth";
import { ToastContainer } from "react-toastify";
import Transactions from "../pages/Transactions";
import Categories from "../pages/Categories";
import Settings from "../pages/Settings";
import Share from "../pages/Share";
import { useUI } from "../hooks/useUi";
import { TransactionsProvider } from "../hooks/useTransactions";
import { PlanningProvider } from "../hooks/usePlanning";
import Planning from "../pages/Planning";

const Routes = () => {
  const { currentUser } = useAuth();
  const { openMenu } = useUI();

  let routes = (
    <Switch>
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Redirect to="/signin" />
    </Switch>
  );

  if (currentUser) {
    routes = (
      <TransactionsProvider>
        <PlanningProvider>
          <div className={styles.layout}>
            <div
              className={
                openMenu
                  ? `${styles.layout__sidebarExpand}`
                  : `${styles.layout__sidebar}`
              }
            >
              <Menu />
            </div>
            <MobileMenu />
            <div className={styles.layout__routes}>
              <User />
              <Switch>
                <Route exact path="/dashboard" component={Dashboard} />
                <Route path="/transactions" component={Transactions} />
                <Route path="/categories" component={Categories} />
                <Route path="/planning" component={Planning} />
                <Route path="/settings" component={Settings} />
                <Route path="/share" component={Share} />
                <Redirect to="/dashboard" />
              </Switch>
            </div>
          </div>
        </PlanningProvider>
      </TransactionsProvider>
    );
  }
  return (
    <>
      <ToastContainer autoClose={5000} />
      {routes}
    </>
  );
};

export default Routes;
