import React from "react";
import "./pages.css";

const About = () => {
  return (
    <div className="about container">
      <div className="about-container">
        <h1>About</h1>
        <hr className="about-line" />
        <p>
        In the application, the developer lacks a unified place where the developer can 
        change the configurations of the microservices.
        It was a time taking process to update any changes in the particular service.
        So we built a configuration center to serve the microservices through the backend APIs & the frontend which enables the developer to provide centralized configuration for  all the microservices.
        We can easily select any services from the provided list of services and select the particular configuration type to access all the saved configurations, here we can also
        add new configurations or edit/delete already present ones.

        </p>
        <p>
          We have also created a playground where developer can receive 
          the json response for the selected service or configuration
          type.

        </p>
      </div>
    </div>
  );
};

export default About;
