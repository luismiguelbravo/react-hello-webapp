import React from "react";
import starWarLogo from "../../img/Star_Wars_Logo.png"
import "../../styles/home.css";

export const Home = () => (
  <div className='container'>
    <div className="text-center mt-5">
      <img className="star-war-logo" src={starWarLogo} />
    </div>
  </div>
);