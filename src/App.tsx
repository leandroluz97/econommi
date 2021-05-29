import React from "react"
import "./styles/global.scss"
import { BrowserRouter as Router } from "react-router-dom"
import Routes from "./routes"
import { UiProvider } from "./hooks/useUi"
import { AuthProvider } from "./hooks/useAuth"
import Modal from "react-modal"
import { TransactionsProvider } from "./hooks/useTransactions"

Modal.setAppElement("#root")

function App() {
  return (
    <>
      <AuthProvider>
        <TransactionsProvider>
          <UiProvider>
            <Router>
              <Routes />
            </Router>
          </UiProvider>
        </TransactionsProvider>
      </AuthProvider>
    </>
  )
}

export default App
