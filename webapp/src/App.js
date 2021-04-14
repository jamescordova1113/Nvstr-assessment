import React, { useState } from "react";
import NavBar from "components/nav/NavBar";
import PortfolioSummary from "components/portfolio/PortfolioSummary";

import "./App.css";

const App = () => {
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="App">
      <NavBar
        setIsLoading={setIsLoading}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      <PortfolioSummary
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        refresh={refresh}
      />
    </div>
  );
};

export default App;
