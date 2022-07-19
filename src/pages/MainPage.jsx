import React from "react";
import NavBar from "../components/main/NavBar";
import HardSkills from "../components/main/HardSkills";
import "../styles/main/MainPage.css";
import SoftSkills from "../components/main/SoftSkills";
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
      <section className="container mt-4 mb-4" id="skills">
        <div
          className="row d-flex align-items-center justify-content-center"
          style={{ height: "inherit" }}
        >
          <h1 className="text-center purple-text mt-2 mb-4 bold">Projects</h1>
        </div>
      </section>
      <footer></footer>
    </div>
  );
};

export default MainPage;
