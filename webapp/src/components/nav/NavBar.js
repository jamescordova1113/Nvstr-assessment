import React from "react";
import "./NavBar.css";

const NavBar = (props) => {
  const { refresh, setRefresh, setIsLoading } = props;

  return (
    <div className="nav-bar">
      <button
        className="nav-bar__button"
        onClick={() => {
          setRefresh(!refresh);
          setIsLoading(true);
        }}
      >
        Refresh
      </button>
    </div>
  );
};

export default NavBar;
