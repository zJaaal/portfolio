import React from "react";

const Backend = () => {
  return (
    <div className="row d-flex justify-content-center enter">
      <div className="d-flex flex-column align-items-center col-6 col-sm-6 col-md-3 col-lg-3 p-2">
        <img
          style={{ width: "90px", height: "90px" }}
          src="https://brandeps.com/logo-download/N/Node-JS-logo-vector-02.svg"
          alt="NodeJS Logo"
        />
        <h4 className="node-color mt-1">NodeJS</h4>
      </div>
      <div className="d-flex flex-column align-items-center col-6 col-sm-6 col-md-3 col-lg-3 p-2">
        <img
          style={{ width: "90px", height: "90px" }}
          src="https://cdn.iconscout.com/icon/free/png-256/mongodb-4-1175139.png"
          alt="MongoDB Logo"
        />
        <h4 className="mongo-color mt-1">MongoDB</h4>
      </div>
      <div className="d-flex flex-column align-items-center col-6 col-sm-6 col-md-3 col-lg-3 p-2">
        <img
          style={{ width: "90px", height: "90px" }}
          src="https://avatars.githubusercontent.com/u/7552965?s=280&v=4"
          alt="Mongoose Logo"
        />
        <h4 className="mongoose-color mt-1 text-center">Mongoose (ODM)</h4>
      </div>
      <div className="d-flex flex-column align-items-center col-6 col-sm-6 col-md-3 col-lg-3 p-2">
        <img
          style={{ width: "90px", height: "90px" }}
          src="https://www.freepnglogos.com/uploads/logo-mysql-png/logo-mysql-mysql-logo-png-images-are-download-crazypng-21.png"
          alt="MySQL Logo"
        />
        <h4 className="my-color mt-1">
          My<span className="SQL-color">SQL</span>
        </h4>
      </div>
      <div className="d-flex flex-column align-items-center col-6 col-sm-6 col-md-3 col-lg-3 p-2">
        <img
          style={{ width: "90px", height: "90px" }}
          src="https://knexjs.org/knex-logo.png"
          alt="Knex Logo"
        />
        <h4 className="knex-color mt-1">Knex (ORM)</h4>
      </div>
    </div>
  );
};

export default Backend;
