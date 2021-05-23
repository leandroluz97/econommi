import React from "react"
import "./styles/global.scss"
import { BrowserRouter as Router } from "react-router-dom"
import Routes from "./routes"
import { UiProvider } from "./hooks/useUi"
import { AuthProvider } from "./hooks/useAuth"
import Modal from "react-modal"

Modal.setAppElement("#root")

function App() {
  return (
    <>
      <AuthProvider>
        <UiProvider>
          <Router>
            <Routes />
          </Router>
        </UiProvider>
      </AuthProvider>
    </>
  )
}

export default App
