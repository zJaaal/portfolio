import React from "react";
import {
  buildStyles,
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import VisibilitySensor from "react-visibility-sensor";
import NavBar from "../components/main/NavBar";
import "react-circular-progressbar/dist/styles.css";
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
          <h1 className="text-center purple-text mt-2 bold">Soft Skills</h1>
          <ul className="pl-4" style={{ color: "white" }}>
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
          <div className="row d-flex justify-content-center">
            <VisibilitySensor>
              {({ isVisible }) => {
                const percentage = isVisible ? 95 : 0;
                return (
                  <div className="col-6 col-sm-6 col-md-3 col-lg-3 p-2">
                    <CircularProgressbar
                      minValue={0}
                      value={percentage}
                      text={`JavaScript ${percentage}%`}
                      strokeWidth={4}
                      styles={buildStyles({
                        pathColor: "#fedf1e",
                        trailColor: "#16161A",
                        textColor: "#fedf1e",
                        textSize: "10px",
                      })}
                    />
                  </div>
                );
              }}
            </VisibilitySensor>
            <VisibilitySensor>
              {({ isVisible }) => {
                const percentage = isVisible ? 80 : 0;
                return (
                  <div className="col-6 col-sm-6 col-md-3 col-lg-3 p-2">
                    <CircularProgressbar
                      minValue={0}
                      value={percentage}
                      text={`HTML ${percentage}%`}
                      strokeWidth={4}
                      styles={buildStyles({
                        pathColor: "#fe5b00",
                        trailColor: "#16161A",
                        textColor: "#fe5b00",
                        textSize: "10px",
                      })}
                    />
                  </div>
                );
              }}
            </VisibilitySensor>
            <VisibilitySensor>
              {({ isVisible }) => {
                const percentage = isVisible ? 75 : 0;
                return (
                  <div className="col-6 col-sm-6 col-md-3 col-lg-3 p-2">
                    <CircularProgressbar
                      minValue={0}
                      value={percentage}
                      text={`CSS ${percentage}%`}
                      strokeWidth={4}
                      styles={buildStyles({
                        pathColor: "#0067ee",
                        trailColor: "#16161A",
                        textColor: "#0067ee",
                        textSize: "10px",
                      })}
                    />
                  </div>
                );
              }}
            </VisibilitySensor>
            <VisibilitySensor>
              {({ isVisible }) => {
                const percentage = isVisible ? 60 : 0;
                return (
                  <div className="col-6 col-sm-6 col-md-3 col-lg-3 p-2">
                    <CircularProgressbar
                      minValue={0}
                      value={percentage}
                      text={`React ${percentage}%`}
                      strokeWidth={4}
                      styles={buildStyles({
                        pathColor: "#01a0cb",
                        trailColor: "#16161A",
                        textColor: "#01a0cb",
                        textSize: "10px",
                      })}
                    />
                  </div>
                );
              }}
            </VisibilitySensor>
            <VisibilitySensor>
              {({ isVisible }) => {
                const percentage = isVisible ? 90 : 0;
                return (
                  <div className="col-6 col-sm-6 col-md-3 col-lg-3 p-2">
                    <CircularProgressbar
                      minValue={0}
                      value={percentage}
                      text={`Material UI ${percentage}%`}
                      strokeWidth={4}
                      styles={buildStyles({
                        pathColor: "#01a0cb",
                        trailColor: "#16161A",
                        textColor: "#01a0cb",
                        textSize: "10px",
                      })}
                    />
                  </div>
                );
              }}
            </VisibilitySensor>
            <VisibilitySensor>
              {({ isVisible }) => {
                const percentage = isVisible ? 90 : 0;
                return (
                  <div className="col-6 col-sm-6 col-md-3 col-lg-3 p-2">
                    <CircularProgressbar
                      minValue={0}
                      value={percentage}
                      text={`Bootstrap ${percentage}%`}
                      strokeWidth={4}
                      styles={buildStyles({
                        pathColor: "#B115E0",
                        trailColor: "#16161A",
                        textColor: "#B115E0",
                        textSize: "10px",
                      })}
                    />
                  </div>
                );
              }}
            </VisibilitySensor>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
