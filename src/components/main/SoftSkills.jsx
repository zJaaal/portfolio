import React from "react";

const SoftSkills = () => {
  return (
    <ul className="pl-4" style={{ color: "white" }}>
      <li>
        <h3 className="green-text">Problem Solving: </h3>{" "}
        <p className={"body"}>
          I consider myself really good at{" "}
          <span className="green-text bold">Problem Solving, </span>I constantly
          test myself against problems in{" "}
          <a href="https://www.codewars.com/users/zJaaal" target="_blank">
            <span className="codewars-color bold">CodeWars</span>
          </a>
          . You can find some solutions at my{" "}
          <a href="https://www.github.com/zJaaal" target="_blank">
            <span className="net-color bold">GitHub </span>
          </a>
          profile.
        </p>
      </li>
      <li>
        <h3 className="green-text">Curiosity: </h3>
        <p className={"body"}>
          I started learning programming thanks to my natural impulse to learn
          things,<span className="green-text bold"> Curiosity</span> is one of
          my strengths.
        </p>
      </li>
      <li>
        <h3 className="green-text">Self Management: </h3>
        <p className={"body"}>
          I am able to organize my time and meet my goals on time, I consider
          myself someone quite a{" "}
          <span className="green-text bold">Planner</span>.
        </p>
      </li>
      <li>
        <h3 className="green-text">Teamwork: </h3>
        <p className={"body"}>
          I have done some projects with friends who have offered themselves as
          mentors who are currently part of this world, I have learned a lot
          about
          <span className="green-text bold"> Teamwork </span> in this area by
          developing projects with them through the GitHub platform
        </p>
      </li>
      <li>
        <h3 className="green-text">Communication: </h3>
        <p className={"body"}>
          Generally when I don't know something or I have doubts, I turn to
          people with more knowledge to receive guidance, as well as I am also
          willing to support those who need help, I think that the basis of a
          good team should be the ability to
          <span className="green-text bold"> Communicate</span> doubts or be
          sincere when you don't know about some topic.
        </p>
      </li>
    </ul>
  );
};

export default SoftSkills;
