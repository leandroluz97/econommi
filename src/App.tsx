import React from "react"
import "./styles/global.scss"
import { BrowserRouter as Router } from "react-router-dom"
import Routes from "./routes"
import { UiProvider } from "./hooks/useUi"

function App() {
  return (
    <>
      <UiProvider>
        <Router>
          <Routes />
        </Router>
      </UiProvider>
    </>
  )
}

export default App
