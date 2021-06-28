import React from "react";
import "./styles/global.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import { UiProvider } from "./hooks/useUi";
import { AuthProvider } from "./hooks/useAuth";
import Modal from "react-modal";
import { CategoriesProvider } from "./hooks/useCategories";

Modal.setAppElement("#root");

function App() {
  return (
    <>
      <AuthProvider>
        <CategoriesProvider>
          <UiProvider>
            <Router>
              <Routes />
            </Router>
          </UiProvider>
        </CategoriesProvider>
      </AuthProvider>
    </>
  );
}

export default App;
