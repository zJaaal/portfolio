import { useState } from "react";
import Extras from "./skills/Extras";
import Frontend from "./skills/Frontend";
import Backend from "./skills/Backend";

const HardSkills = () => {
  const [skills, setSkills] = useState("Frontend");
  return (
    <div className="row d-flex justify-content-center">
      <div className="d-flex justify-content-evenly mb-4">
        <h4
          className="skills-btn"
          style={{
            color: skills == "Frontend" ? "#B115E0" : "#2CB67D",
          }}
          onClick={() => setSkills("Frontend")}
        >
          Frontend
        </h4>
        <h4
          className="skills-btn"
          style={{
            color: skills == "Backend" ? "#B115E0" : "#2CB67D",
          }}
          onClick={() => setSkills("Backend")}
        >
          Backend
        </h4>
        <h4
          className="skills-btn"
          style={{
            color: skills == "Extras" ? "#B115E0" : "#2CB67D",
          }}
          onClick={() => setSkills("Extras")}
        >
          Extras
        </h4>
      </div>

      {skills == "Frontend" && <Frontend />}
      {skills == "Backend" && <Backend />}
      {skills == "Extras" && <Extras />}
    </div>
  );
};

export default HardSkills;
