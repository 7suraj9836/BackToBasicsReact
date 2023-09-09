import React, { useState, useEffect } from "react";
import logo from "../../../assets/images/logo.svg";

const LoginLeftSidebar = () => {
  return (
    <div className="col-sm-12 col-lg-4 login-setup-left">
      <div className="logo-box">
        <img className="img-fluid" src={logo} alt="" />
      </div>

      <div
        id="setup-slides"
        className="slideWrap carousel slide"
        data-bs-ride="false"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#setup-slides"
            data-bs-slide-to="0"
            className="active rounded-circle"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#setup-slides"
            data-bs-slide-to="1"
            className="rounded-circle"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#setup-slides"
            data-bs-slide-to="2"
            className="rounded-circle"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <h2>Start your Journey with us.</h2>
            <p>Amet minim mollit non deserunt ulaliqsint.</p>
          </div>
          <div className="carousel-item">
            <h2>Start your Journey with us.</h2>
            <p>Amet minim mollit non deserunt ulaliqsint.</p>
          </div>
          <div className="carousel-item">
            <h2>Start your Journey with us.</h2>
            <p>Amet minim mollit non deserunt ulaliqsint.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginLeftSidebar;
