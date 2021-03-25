import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="header__logo">
        <h3 className="logo">Harman Sidhu</h3>
      </div>
      <div className="header__nav">
        <Link to="/" className="link">
          <p className="header__option">Home</p>
        </Link>
        <Link to="/listings" className="link">
          <p className="header__option">Listings</p>
        </Link>
        <p className="header__option">About</p>
        <p className="header__option">Contact</p>
      </div>
    </div>
  );
}

export default Header;
