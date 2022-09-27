import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLink } from "@fortawesome/free-solid-svg-icons";
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
                Fullstack Developer
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
                <span className="js-color bold"> JavaScript</span>,{" "}
                <span className="ts-color bold">TypeScript</span> and
                <span className="react-color bold"> React.js</span>. Although my
                priority currently is the Front-end. I also handle Backend
                Technologies as {/**/}
                <span className="node-color bold">
                  Node.js, Express, MongoDB {/**/}
                </span>
                and <span className="my-color bold">My</span>
                <span className="SQL-color bold">SQL</span>
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
          <HardSkills />
        </div>
      </section>
      <section className="container mt-4 mb-4 glass-card" id="projects">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ height: "inherit" }}
        >
          <h1 className="text-center purple-text mt-2 mb-4 bold">Projects</h1>
          <div className="row d-flex justify-content-center p-2 mb-5">
            <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 d-flex flex-column align-items-center justify-content-start project-title">
              <h5 className="p-2 text-center">
                Nin<span className="js-color ">JS</span>
              </h5>
              <div
                className="d-flex justify-content-center"
                style={{ width: "inherit" }}
              >
                <a
                  href="https://github.com/BrunoMalagoli/NinJS-Vite"
                  target={"_blank"}
                >
                  <FontAwesomeIcon
                    icon={faGithub}
                    style={{ width: "30px", height: "30px", padding: "5px" }}
                    color={"#6745d9"}
                  />
                </a>
                <a href="https://nin-js.netlify.app/" target={"_blank"}>
                  <FontAwesomeIcon
                    icon={faLink}
                    style={{ width: "30px", height: "30px", padding: "5px" }}
                  />
                </a>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-9 col-xl-9 d-flex flex-column">
              <p className="body p-2">
                An educational website with Ninja theme where you can test your
                knowledge in <span className="js-color bold">JavaScript</span>{" "}
                with multiple code quizes. It also provides educational content
                between questions, so you can also learn while answering the
                questions. I made this project with my{" "}
                <span className="react-color bold">Alkemy</span> Team.
              </p>
              <h4 className="text-center">Technologies</h4>
              <div className="d-flex justify-content-evenly mb-2">
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg"
                  alt="React Logo"
                />
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/300px-Typescript_logo_2020.svg.png"
                  alt="TypeScript Logo"
                />
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://cdn.discordapp.com/icons/660863154703695893/3c863d6a98b828fa8b3407d1b4542ccd.webp?size=40"
                  alt="Chakra UI Logo"
                />
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://brandeps.com/logo-download/R/React-Router-logo-vector-01.svg"
                  alt="React Router Logo"
                />
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center p-2 mb-5">
            <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 d-flex flex-column align-items-center justify-content-start project-title">
              <h5 className="p-2 text-center">
                Nin<span className="js-color">JS</span> Backend
              </h5>
              <a
                href="https://github.com/zJaaal/ninjs-backend"
                target={"_blank"}
              >
                <FontAwesomeIcon
                  icon={faGithub}
                  style={{ width: "30px", height: "30px" }}
                  color={"#6745d9"}
                />
              </a>
            </div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-9 col-xl-9 d-flex flex-column">
              <p className="body p-2">
                A <span className="node-color bold">NodeJS</span> service made
                for the <span className="bold">Nin</span>
                <span className="js-color bold">JS</span> Website to handle
                users and their progress. Developed using{" "}
                <span className="ts-color bold">TypeScript</span>, {/**/}
                <span className="node-color bold">Express, MongoDB</span>,
                <span className="react-color bold"> Yup</span> for validation
                and {/* */}
                <span className="bold">JWT</span> to handle user authorization.
              </p>
              <h4 className="text-center">Technologies</h4>
              <div className="d-flex justify-content-evenly mb-2">
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://brandeps.com/logo-download/N/Node-JS-logo-vector-02.svg"
                  alt="Node.js Logo"
                />
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/300px-Typescript_logo_2020.svg.png"
                  alt="TypeScript Logo"
                />
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://cdn.iconscout.com/icon/free/png-256/mongodb-4-1175139.png"
                  alt="MongoDB Logo"
                />
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://jwt.io/img/pic_logo.svg"
                  alt="JWT Logo"
                />
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center p-2 mb-5">
            <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 d-flex flex-column align-items-center justify-content-start project-title">
              <h5 className="p-2 text-center">
                React Responsive Design (Beta)
              </h5>
              <div
                className="d-flex justify-content-center"
                style={{ width: "inherit" }}
              >
                <a
                  href="https://github.com/dandresfg/react-responsive-design"
                  target={"_blank"}
                >
                  <FontAwesomeIcon
                    icon={faGithub}
                    style={{ width: "30px", height: "30px", padding: "5px" }}
                    color={"#6745d9"}
                  />
                </a>
                <a
                  href="https://www.npmjs.com/package/react-responsive-design"
                  target={"_blank"}
                >
                  <FontAwesomeIcon
                    icon={faLink}
                    style={{ width: "30px", height: "30px", padding: "5px" }}
                  />
                </a>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-9 col-xl-9 d-flex flex-column">
              <p className="body p-2">
                This library saves your time when you deal with responsive
                design, we know you have to hide components in desktop or
                mobile, and that might be difficult when you have to mix a lot
                of classNames in the same component. With this library you can
                keep the responsive logic hidden for your components. I'm
                contributing in this library.
              </p>
              <h4 className="text-center">Technologies</h4>
              <div className="d-flex justify-content-evenly mb-2">
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg"
                  alt="React Logo"
                />
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/300px-Typescript_logo_2020.svg.png"
                  alt="TypeScript"
                />
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://vitest.dev/logo.svg"
                  alt="Vitest Logo"
                />
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center p-2 mb-5">
            <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 d-flex flex-column align-items-center justify-content-start project-title">
              <h5 className="p-2 text-center">React Calendar</h5>
              <a
                href="https://github.com/zJaaal/calendar-mern-app"
                target={"_blank"}
              >
                <FontAwesomeIcon
                  icon={faGithub}
                  style={{ width: "30px", height: "30px" }}
                  color={"#6745d9"}
                />
              </a>
            </div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-9 col-xl-9 d-flex flex-column">
              <p className="body p-2">
                A calendar app where you can create events and watch events
                created by other users. This was my first project creating an
                app with the <span className="react-color bold">MERN</span>{" "}
                stack.
              </p>
              <h4 className="text-center">Technologies</h4>
              <div className="d-flex justify-content-evenly mb-2">
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg"
                  alt="React Logo"
                />
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://d33wubrfki0l68.cloudfront.net/0834d0215db51e91525a25acf97433051f280f2f/c30f5/img/redux.svg"
                  alt="React Redux Logo"
                />
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/materialui-colored.svg"
                  alt="MUI Logo"
                />
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://brandeps.com/logo-download/R/React-Router-logo-vector-01.svg"
                  alt="React Router Logo"
                />
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center p-2 mb-5">
            <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 d-flex flex-column align-items-center justify-content-start project-title">
              <h5 className="p-2 text-center">Calendar Backend</h5>
              <a
                href="https://github.com/zJaaal/calendar-backend"
                target={"_blank"}
              >
                <FontAwesomeIcon
                  icon={faGithub}
                  style={{ width: "30px", height: "30px" }}
                  color={"#6745d9"}
                />
              </a>
            </div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-9 col-xl-9 d-flex flex-column">
              <p className="body p-2">
                This is the REST service I made in{" "}
                <span className="node-color bold">Node.js, Express.js</span> and
                <span className="node-color bold"> MongoDB</span>. I used{" "}
                <span className="bold">JWT </span>
                for authentication and{" "}
                <span className="react-color bold">Joi</span> to validate the
                data for React Calendar.
              </p>
              <h4 className="text-center">Technologies</h4>
              <div className="d-flex justify-content-evenly mb-2">
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://brandeps.com/logo-download/N/Node-JS-logo-vector-02.svg"
                  alt="Node.js Logo"
                />
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://cdn.iconscout.com/icon/free/png-256/mongodb-4-1175139.png"
                  alt="MongoDB Logo"
                />
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://jwt.io/img/pic_logo.svg"
                  alt="JWT Logo"
                />
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center p-2 mb-5">
            <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 d-flex flex-column align-items-center justify-content-start project-title">
              <h5 className="p-2 text-center">Journal App</h5>
              <a
                href="https://github.com/zJaaal/journal-react-app"
                target={"_blank"}
              >
                <FontAwesomeIcon
                  icon={faGithub}
                  style={{ width: "30px", height: "30px" }}
                  color={"#6745d9"}
                />
              </a>
            </div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-9 col-xl-9 d-flex flex-column">
              <p className="body p-2">
                This an app to create a Journal about your daylife. I used this
                app to learn <span className="net-color bold">React Redux</span>{" "}
                and
                <span className="net-color bold"> Redux Thunk </span>
                for API requests. I used{" "}
                <span className="firebase-color bold">Firebase</span> as Backend
                in this project.
              </p>
              <h4 className="text-center">Technologies</h4>
              <div className="d-flex justify-content-evenly mb-2">
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg"
                  alt="React Logo"
                />
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://d33wubrfki0l68.cloudfront.net/0834d0215db51e91525a25acf97433051f280f2f/c30f5/img/redux.svg"
                  alt="React Redux Logo"
                />
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/materialui-colored.svg"
                  alt="MUI Logo"
                />
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://brandeps.com/logo-download/R/React-Router-logo-vector-01.svg"
                  alt="React Router Logo"
                />
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://img.icons8.com/color/344/firebase.png"
                  alt="Firebase Logo"
                />
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center p-2 mb-5">
            <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 d-flex flex-column align-items-center justify-content-start project-title">
              <h5 className="p-2 text-center">JS Player</h5>
              <div
                className="d-flex justify-content-center"
                style={{ width: "inherit" }}
              >
                <a href="https://github.com/zJaaal/js-player" target={"_blank"}>
                  <FontAwesomeIcon
                    icon={faGithub}
                    style={{ width: "30px", height: "30px", padding: "5px" }}
                    color={"#6745d9"}
                  />
                </a>
                <a href="https://js-player.netlify.app/" target={"_blank"}>
                  <FontAwesomeIcon
                    icon={faLink}
                    style={{ width: "30px", height: "30px", padding: "5px" }}
                  />
                </a>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-9 col-xl-9 d-flex flex-column">
              <p className="body p-2">
                This is an app where you can listen a 30sec preview of your
                favorite song. I made it with{" "}
                <span className="js-color">Vanilla JS</span> and Deezer API.
                Here I learned the best practices to handle events and create
                templates as components. This project was an introduction of how
                <span className="react-color"> React</span> works.
              </p>
              <h4 className="text-center">Technologies</h4>
              <div className="d-flex justify-content-evenly mb-2">
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/javascript-colored.svg"
                  alt="JS Logo"
                />
                <img
                  style={{ width: "40x", height: "40px" }}
                  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/html5-colored.svg"
                  alt="HTML Logo"
                />
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/css3-colored.svg"
                  alt="CSS Logo"
                />
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center p-2 mb-5">
            <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 d-flex flex-column align-items-center justify-content-start project-title">
              <h5 className="p-2 text-center">JS Todo App</h5>
              <div
                className="d-flex justify-content-center"
                style={{ width: "inherit" }}
              >
                <a
                  href="https://github.com/zJaaal/js-todo-app"
                  target={"_blank"}
                >
                  <FontAwesomeIcon
                    icon={faGithub}
                    style={{ width: "30px", height: "30px", padding: "5px" }}
                    color={"#6745d9"}
                  />
                </a>
                <a
                  href="https://zjaaal.github.io/js-todo-app/"
                  target={"_blank"}
                >
                  <FontAwesomeIcon
                    icon={faLink}
                    style={{ width: "30px", height: "30px", padding: "5px" }}
                  />
                </a>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-9 col-xl-9 d-flex flex-column">
              <p className="body p-2">
                This is an app where you can manage your tasks of the day. I
                made it with
                <span className="js-color"> Vanilla JS</span>. Here I praticed
                creation of events and dynamical rendering.
              </p>
              <h4 className="text-center">Technologies</h4>
              <div className="d-flex justify-content-evenly mb-2">
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/javascript-colored.svg"
                  alt="JS Logo"
                />
                <img
                  style={{ width: "40x", height: "40px" }}
                  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/html5-colored.svg"
                  alt="HTML Logo"
                />
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/css3-colored.svg"
                  alt="CSS Logo"
                />
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center p-2 mb-5">
            <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 d-flex flex-column align-items-center justify-content-start project-title">
              <h5 className="p-2 text-center">JS Calculator</h5>
              <div
                className="d-flex justify-content-center"
                style={{ width: "inherit" }}
              >
                <a
                  href="https://github.com/zJaaal/zJaaal.github.io"
                  target={"_blank"}
                >
                  <FontAwesomeIcon
                    icon={faGithub}
                    style={{ width: "30px", height: "30px", padding: "5px" }}
                    color={"#6745d9"}
                  />
                </a>
                <a href="https://zjaaal.github.io/" target={"_blank"}>
                  <FontAwesomeIcon
                    icon={faLink}
                    style={{ width: "30px", height: "30px", padding: "5px" }}
                  />
                </a>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-9 col-xl-9 d-flex flex-column">
              <p className="body p-2">
                I developed a simple calculator to practice{" "}
                <span className="html-color">HTML </span>
                and <span className="css-color">CSS</span>, also I learned a bit
                about design and color palettes, I can say that the color
                palette I used on this project, is one of my favorites. I made
                it with
                <span className="js-color"> Vanilla JS</span>.
              </p>
              <h4 className="text-center">Technologies</h4>
              <div className="d-flex justify-content-evenly mb-2">
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/javascript-colored.svg"
                  alt="JS Logo"
                />
                <img
                  style={{ width: "40x", height: "40px" }}
                  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/html5-colored.svg"
                  alt="HTML Logo"
                />
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/css3-colored.svg"
                  alt="CSS Logo"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer
        className="container nav-bar glass-card mt-4 mb-1"
        style={{ height: "inherit" }}
      >
        <div
          className="d-flex flex-column justify-content-center align-items-center mt-3"
          style={{ height: "inherit" }}
        >
          <div className="d-flex justify-content-center align-items-center">
            <a href="https://www.github.com/zJaaal" target={"_blank"}>
              <FontAwesomeIcon
                icon={faGithub}
                style={{ width: "42px", height: "42px" }}
                color="#6745d9"
                className={"p-2 pointer"}
              />
            </a>
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

            <a href="mailto:zjaaaldev@gmail.com" target={"_blank"}>
              <FontAwesomeIcon
                icon={faEnvelope}
                color="white"
                style={{ width: "42px", height: "42px" }}
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
