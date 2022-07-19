import React from "react";
import "../../styles/main/NavBar.css";
const NavBar = () => {
  return (
    <div className="nav-bar container-fluid glass-card">
      <div
        className="d-flex justify-content-evenly align-items-center"
        style={{ height: "inherit" }}
      >
        <a className="pointer" href="#about-me">
          <h5 className="nav-btn">About Me</h5>
        </a>
        <a className="pointer" href="#skills">
          <h5 className="nav-btn">Skills</h5>
        </a>
        <a className="pointer" href="#projects">
          <h5 className="nav-btn">Projects</h5>
        </a>
      </div>
    </div>
  );
};

export default NavBar;
