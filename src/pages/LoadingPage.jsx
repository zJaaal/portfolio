import { useContext, useState } from "react";
import Console from "../components/loading/Console";
import Typing from "../components/loading/Typing";
import RunButton from "../components/loading/RunButton";
import "../styles/loading/LoadingPage.css";

const LoadingPage = () => {
  const [showButton, setShowButton] = useState(false);
  setTimeout(() => setShowButton(true), 2000);
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center loading-page"
      style={{ height: "100vh" }}
    >
      <div className="d-flex flex-grow-1 justify-content-center align-items-center">
        <Typing />
      </div>
      <div className="d-flex align-items-start console-container">
        <Console />
      </div>
      {showButton && <RunButton />}
    </div>
  );
};

export default LoadingPage;
