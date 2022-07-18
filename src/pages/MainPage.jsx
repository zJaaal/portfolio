import React from "react";
import NavBar from "../components/main/NavBar";
import "../styles/main/MainPage.css";
const MainPage = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center main-page area"
      style={{ height: "100vh" }}
    >
      <ul class="circles">
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
      <NavBar />
      <div className="container-fluid mt-4" id={"about-me"}>
        <div
          className="row d-flex align-items-center glass-card enter"
          style={{ height: "inherit" }}
        >
          <div className="col-lg-6 col-sm-12 col-md-12 col-xs-12">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <img
                className="avatar"
                src="https://avatars.githubusercontent.com/u/63567962?v=4"
                alt="zJaaal Profile Picture"
              />
              <h3>Jalinson Diaz</h3>
              <h4 className="green-text bold text-center">
                Frontend Developer
              </h4>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 col-md-12 col-xs-12">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <p className="text-justify body">
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
      </div>
    </div>
  );
};

export default MainPage;
