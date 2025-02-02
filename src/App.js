// src/App.js
import React from "react";
import PortfolioPage from "./pages/PortfolioPage";
// If you have a MatrixBackground component, import it too
import MatrixBackground from "./components/MatrixBackground";

function App() {
  return (
    <div>
      <MatrixBackground />
      <PortfolioPage />
    </div>
  );
}

export default App;
