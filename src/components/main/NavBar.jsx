import React from "react";
import "../../styles/main/NavBar.css";
const NavBar = () => {
  return (
    <div className="nav-bar">
      <div
        className="d-flex justify-content-evenly align-items-center"
        style={{ height: "inherit" }}
      >
        <h4 className="pointer nav-btn">About Me</h4>
        <h4 className="pointer nav-btn">Skills</h4>
        <h4 className="pointer nav-btn">Projects</h4>
      </div>
    </div>
  );
};

export default NavBar;
