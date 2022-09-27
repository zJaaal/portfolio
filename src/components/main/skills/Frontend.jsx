import React from "react";

const Frontend = () => {
  return (
    <div className="row d-flex justify-content-center enter">
      <div className="d-flex flex-column align-items-center col-6 col-sm-6 col-md-3 col-lg-3 p-2">
        <img
          style={{ width: "90px", height: "90px" }}
          src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/javascript-colored.svg"
          alt="JS Logo"
        />
        <h4 className="js-color mt-1">JavaScript</h4>
      </div>
      <div className="d-flex flex-column align-items-center col-6 col-sm-6 col-md-3 col-lg-3 p-2">
        <img
          style={{ width: "90px", height: "90px" }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/300px-Typescript_logo_2020.svg.png"
          alt="TS Logo"
        />
        <h4 className="ts-color mt-1">TypeScript</h4>
      </div>
      <div className="d-flex flex-column align-items-center col-6 col-sm-6 col-md-3 col-lg-3 p-2">
        <img
          style={{ width: "90px", height: "90px" }}
          src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/html5-colored.svg"
          alt="HTML Logo"
        />
        <h4 className="html-color mt-1">HTML</h4>
      </div>
      <div className="d-flex flex-column align-items-center col-6 col-sm-6 col-md-3 col-lg-3 p-2">
        <img
          style={{ width: "90px", height: "90px" }}
          src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/css3-colored.svg"
          alt="CSS Logo"
        />
        <h4 className="css-color mt-1">CSS</h4>
      </div>
      <div className="d-flex flex-column align-items-center col-6 col-sm-6 col-md-3 col-lg-3 p-2">
        <img
          style={{ width: "90px", height: "90px" }}
          src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg"
          alt="React Logo"
        />
        <h4 className="react-color mt-1">React.js</h4>
      </div>
      <div className="d-flex flex-column align-items-center col-6 col-sm-6 col-md-3 col-lg-3 p-2">
        <img
          style={{ width: "90px", height: "90px" }}
          src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/materialui-colored.svg"
          alt="MUI Logo"
        />
        <h4 className="mui-color mt-1">Material UI</h4>
      </div>
      <div className="d-flex flex-column align-items-center col-6 col-sm-6 col-md-3 col-lg-3 p-2">
        <img
          style={{ width: "90px", height: "90px", borderRadius: "50%" }}
          src="https://avatars.githubusercontent.com/u/54212428?s=200&v=4"
          alt="Chakra UI Logo"
        />
        <h4 className="chakra-color mt-1">Chakra UI</h4>
      </div>
      <div className="d-flex flex-column align-items-center col-6 col-sm-6 col-md-3 col-lg-3 p-2">
        <img
          style={{ width: "90px", height: "90px" }}
          src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/bootstrap-colored.svg"
          alt="Bootstrap Logo"
        />
        <h4 className="bootstrap-color mt-1">Bootstrap</h4>
      </div>
    </div>
  );
};

export default Frontend;
