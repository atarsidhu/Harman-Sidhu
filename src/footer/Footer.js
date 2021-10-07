import React from "react";
import "./Footer.css";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import { useHistory } from "react-router-dom";

function Footer() {
  const history = useHistory();
  return (
    <div className="footer">
      {/* <h3>Logo</h3> */}
      <div className="footer__logo">
        <img
          src="/images/HarmanSidhuLogo4GoldWhite.png"
          alt=""
          className="footer-logo"
        />
      </div>
      <div className="footer__links">
        <h4 className="mb-3">Navigate</h4>
        <a onClick={() => history.push("/")} className="footer-link">
          Home
        </a>
        <a onClick={() => history.push("/listings")} className="footer-link">
          Listings
        </a>
        {/* <a href="/exclusive-listings" className="footer-link">
          Exclusive Listings
        </a> */}
        <a onClick={() => history.push("/about")} className="footer-link">
          About
        </a>
        <a onClick={() => history.push("/contact")} className="footer-link">
          Contact
        </a>
      </div>
      <div className="footer__contact">
        <h4 className="mb-3">Contact</h4>
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
            <p className="contact-content pl-3">604-600-5854</p>
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
