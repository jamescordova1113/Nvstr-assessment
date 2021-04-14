import React from "react";
import NavBar from "components/nav/NavBar";
import PortfolioSummary from "components/portfolio/PortfolioSummary";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <PortfolioSummary />
    </div>
  );
}

export default App;
