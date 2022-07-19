import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import NavBar from "../components/main/NavBar";
import HardSkills from "../components/main/HardSkills";
import SoftSkills from "../components/main/SoftSkills";

import "../styles/main/MainPage.css";

const MainPage = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center main-page area">
      <NavBar />
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <section
        className="container mt-1"
        id="about-me"
        style={{ height: "100vh" }}
      >
        <div
          className="row d-flex align-content-center glass-card enter"
          style={{ height: "inherit" }}
        >
          <div className="col-lg-6 col-sm-12 col-md-12 col-xs-12">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <img
                className="avatar"
                src="https://avatars.githubusercontent.com/u/63567962?v=4"
                alt="zJaaal Profile Picture"
              />
              <h3 className="mt-1">Jalinson Diaz</h3>
              <h4 className="green-text bold text-center">
                Frontend Developer
              </h4>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 col-md-12 col-xs-12">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <p className="text-justify body ">
                Passionate about technology and driven by curiosity, I have been
                learning programming since 2020, starting with part of the
                <span className="net-color bold"> .NET</span> stack,
                specifically,
                <span className="net-color bold"> Blazor</span> and{" "}
                <span className="asp-net-color bold"> ASP.NET</span> all from
                the <span className="net-color bold"> C#</span> language, but
                since 2022 I started to learn the{" "}
                <span className="react-color bold"> MERN</span> stack, which I
                have solid knowledge in
                <span className="html-color bold"> HTML</span>,
                <span className="css-color bold"> CSS</span>,{" "}
                <span className="js-color bold"> JavaScript</span>, and
                <span className="react-color bold"> React.js</span>. Although my
                priority currently is the Front-end. I have basic knowledge in{" "}
                <span className="green-text bold">
                  Node.js, Express and MongoDB
                </span>
                . And I am open to the possibility of expanding my horizons to
                other branches such as: Backend, Mobile and DevOps.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="container mt-4 mb-4" id="skills">
        <div
          className="row d-flex align-items-center justify-content-center glass-card"
          style={{ height: "inherit" }}
        >
          <h1 className="text-center purple-text mt-2 mb-4 bold">
            Soft Skills
          </h1>
          <SoftSkills />
        </div>
        <div
          className="row d-flex align-items-center justify-content-center glass-card mt-4"
          style={{ height: "inherit" }}
        >
          <h1 className="text-center purple-text mt-2 mb-4 bold">
            Hard Skills
          </h1>
          <div className="row d-flex justify-content-center">
            <HardSkills />
          </div>
        </div>
      </section>
      <section className="container mt-4 mb-4 glass-card" id="projects">
        <div
          className="row d-flex align-items-center justify-content-center"
          style={{ height: "inherit" }}
        >
          <h1 className="text-center purple-text mt-2 mb-4 bold">Projects</h1>
        </div>
      </section>
      <footer
        className="container nav-bar glass-card mt-4 mb-1"
        style={{ height: "inherit" }}
      >
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "inherit" }}
        >
          <div className="d-flex justify-content-center align-items-center">
            <a
              href="https://www.linkedin.com/in/jalinson-diaz"
              target={"_blank"}
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                color="#0067ee"
                className={"p-2 pointer"}
                style={{ width: "42px", height: "42px" }}
              />
            </a>

            <a href="https://www.github.com/zJaaal" target={"_blank"}>
              <FontAwesomeIcon
                icon={faGithub}
                style={{ width: "42px", height: "42px" }}
                color="#6745d9"
                className={"p-2 pointer"}
              />
            </a>
            <div className="p-2 pointer">
              <a href="https://www.codewars.com/users/zJaaal" target={"_blank"}>
                <img
                  src="https://www.codewars.com/packs/assets/logo.61192cf7.svg"
                  alt="Codewars Icon"
                  style={{ width: "42px", height: "42px" }}
                />
              </a>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <p className="body green-text bold">
              Powered by <span className="italic net-color">zJaaal</span>{" "}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
