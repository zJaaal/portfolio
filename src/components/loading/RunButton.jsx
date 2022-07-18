import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../store/AppContext";
import { types } from "../../types/types";

import "../../styles/loading/RunButton.css";

const RunButton = () => {
  const { dispatch } = useContext(AppContext);

  const handleClick = () => {
    dispatch({ type: types.isLoaded });
  };

  return (
    <div className="run-container pointer" onClick={handleClick}>
      <div className="d-flex flex-columun align-items-center justify-content-center">
        <FontAwesomeIcon icon={faPlay} color={"#e7b902"} />
      </div>
    </div>
  );
};

export default RunButton;
