import React, { useState } from "react";
import "./Contact.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Map from "../listings/Map";
import ContactForm from "../ContactForm";

function Contact() {
  const position = {
    lat: 49.10166,
    lng: -122.79844,
  };

  return (
    <div className="contact">
      <div className="page__header">
        <h1 className="header-title display-3">CONTACT</h1>
        <div className="header__image">
          <img
            src="/images/remax.png"
            alt=""
            className="page-header-background"
          />
        </div>
      </div>
      <div className="contact__body  scene_element scene_element--fadein">
        <h1 className="contact-title">Let's Connect</h1>
        <div className="contact__wrapper">
          <div className="wrapper__form">
            <h3 className="wrapper-question">Got a Question?</h3>
            <ContactForm />
          </div>

          <div className="wrapper__info">
            <div className="info__general">
              <h4>General Information</h4>
              <p className="info-title">Phone Number</p>
              <p className="lead">604-600-5854</p>
              <p className="info-title">Email Address</p>
              <p className="lead">harman@harmansidhu.ca</p>
              <p className="info-title">Office Location</p>
              <p className="lead">
                305 -15288 54A Avenue Surrey, British Columbia V3S6T4
              </p>
            </div>
            <Map
              position={position}
              address={"305 -15288 54A Avenue Surrey, British Columbia V3S6T4"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
