import React, { Suspense } from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import styles from "./styles.module.scss";

import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import Signin from "../pages/SignIn";
/*
import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";
import Share from "../pages/Share";
import Transactions from "../pages/Transactions";
import Categories from "../pages/Categories";
import Planning from "../pages/Planning";
*/
import Menu from "../components/Menu";
import MobileMenu from "../components/MobileMenu";
import User from "../components/User";
import NewTransactionModal from "../components/NewTransactionModal";
import Spinner from "../components/Spinner";

import { ToastContainer } from "react-toastify";

import { TransactionsProvider } from "../hooks/useTransactions";
import { PlanningProvider } from "../hooks/usePlanning";
import { useAuth } from "../hooks/useAuth";
import { useUI } from "../hooks/useUi";

const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Settings = React.lazy(() => import("../pages/Settings"));
const Share = React.lazy(() => import("../pages/Share"));
const Transactions = React.lazy(() => import("../pages/Transactions"));
const Categories = React.lazy(() => import("../pages/Categories"));
const Planning = React.lazy(() => import("../pages/Planning"));

const Routes = () => {
  const { currentUser } = useAuth();
  const { openMenu, modalIsOpenAdd, setIsOpenAdd } = useUI();

  //handle close modal
  function closeModalAdd() {
    setIsOpenAdd(false);
  }

  //sidebar styles
  const sideBarLayoutStyle = openMenu
    ? `${styles.layout__sidebarExpand}`
    : `${styles.layout__sidebar}`;

  //Public Routes
  let routes = (
    <Switch>
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Redirect to="/signin" />
    </Switch>
  );

  //Private route
  if (currentUser) {
    routes = (
      <TransactionsProvider>
        <PlanningProvider>
          <div className={styles.layout}>
            <div className={sideBarLayoutStyle}>
              <Menu />
            </div>
            <MobileMenu />
            <div className={styles.layout__routes}>
              <User />
              <Suspense fallback={<Spinner />}>
                <Switch>
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route path="/transactions" component={Transactions} />
                  <Route path="/categories" component={Categories} />
                  <Route path="/plannings" component={Planning} />
                  <Route path="/settings" component={Settings} />
                  <Route path="/share" component={Share} />
                  <Redirect to="/dashboard" />
                </Switch>
              </Suspense>
            </div>
          </div>
          <NewTransactionModal
            modalIsOpen={modalIsOpenAdd}
            closeModal={closeModalAdd}
          />
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
