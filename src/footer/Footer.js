import React from "react";
import "./Footer.css";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";

function Footer() {
  return (
    <div className="footer">
      <h3>Logo</h3>
      <h3>Something</h3>
      <div className="footer__contact">
        <h3>Contact</h3>
        <div className="contact__office">
          <img
            src="/images/remax-blueprint.png"
            className="footer-img"
            alt=""
          />
          <p className="contact-content">
            RE/MAX Blueprint Realty<br></br>305 -15288 54A Avenue<br></br>{" "}
            Surrey, British Columbia V3S6T4
          </p>
        </div>
        <div className="contact__personal">
          <div className="personal__phone">
            <PhoneIcon className="footer__icon" />
            <p className="contact-content pl-3">604-593-6188</p>
          </div>
          <div className="personal__email">
            <EmailIcon className="footer__icon" />
            <p className="contact-content pl-3">harman@harmansidhu.ca</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
