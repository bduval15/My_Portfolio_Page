// src/App.js
import React from "react";
import PortfolioPage from "./pages/PortfolioPage";
import MatrixBackground from "./components/MatrixBackground";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Exo 2', sans-serif;
  }
`;

function App() {
  return (
    <div>
      <GlobalStyle />
      <MatrixBackground />
      <PortfolioPage />
    </div>
  );
}

export default App;
