import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import VisibilitySensor from "react-visibility-sensor";
const HardSkills = () => {
  return (
    <>
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
      </VisibilitySensor>{" "}
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
      </VisibilitySensor>{" "}
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
      </VisibilitySensor>{" "}
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
      </VisibilitySensor>{" "}
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
      </VisibilitySensor>{" "}
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
    </>
  );
};

export default HardSkills;