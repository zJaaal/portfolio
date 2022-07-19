import React from "react";
import NavBar from "../components/main/NavBar";
import "../styles/main/MainPage.css";
const MainPage = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center main-page area"
      style={{ height: "100%" }}
    >
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
      <NavBar />
      <section
        className="container-fluid mt-1"
        id={"about-me"}
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
      </section>
      <section className="container-fluid mt-4" id={"skills"}>
        <div
          className="row d-flex align-items-center glass-card"
          style={{ height: "inherit" }}
        >
          <h1 className="text-center purple-text mt-2 bold">Soft Skills</h1>
          <ul className="p-4">
            <li>
              <h3 className="green-text">Problem Solving: </h3>{" "}
              <p className={"body"}>
                I consider myself really good at{" "}
                <span className="green-text">Problem Solving, </span>I
                constantly test myself against problems in{" "}
                <a href="https://www.codewars.com/users/zJaaal" target="_blank">
                  <span className="codewars-color">CodeWars</span>
                </a>{" "}
                . You can find some solutions at my{" "}
                <a href="https://www.github.com/zJaaal" target="_blank">
                  <span className="net-color">GitHub </span>
                </a>
                profile.
              </p>
            </li>
            <li>
              <h3 className="green-text">Curiosity: </h3>
              <p className={"body"}>
                I started learning programming thanks to my natural impulse to
                learn things, curiosity is one of my strengths.
              </p>
            </li>
            <li>
              <h3 className="green-text">Self Management: </h3>
              <p className={"body"}>
                I am able to organize my time and meet my goals on time, I
                consider myself someone quite a planner.
              </p>
            </li>
            <li>
              <h3 className="green-text">Teamwork: </h3>
              <p className={"body"}>
                I have done some projects with friends who have offered
                themselves as mentors who are currently part of this world, I
                have learned a lot about teamwork in this area by developing
                projects with them through the GitHub platform
              </p>
            </li>
            <li>
              <h3 className="green-text">Communication: </h3>
              <p className={"body"}>
                Generally when I don't know something or I have doubts, I turn
                to people with more knowledge to receive guidance, as well as I
                am also willing to support those who need help, I think that the
                basis of a good team should be the ability to communicate doubts
                or be sincere when you don't know about some topic.
              </p>
            </li>
          </ul>
          <h1 className="text-center purple-text mt-2 bold">Hard Skills</h1>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
