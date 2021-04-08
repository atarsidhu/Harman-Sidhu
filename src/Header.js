import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const [sticky, setSticky] = useState(false);
  let location = useLocation();

  const handleScroll = () => {
    const offset = window.scrollY;

    if (offset > 60) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={
        location.pathname !== "/"
          ? sticky
            ? "header headerNotHomeSticky"
            : "header headerNotHome"
          : sticky
          ? "header sticky-background"
          : "header"
      }
    >
      <div className="header__logo">
        <h3 className="logo">Harman Sidhu</h3>
      </div>
      <div className="header__nav">
        <NavLink to="/" className="link">
          <p
            className={
              location.pathname !== "/"
                ? "header__option stick-text"
                : sticky
                ? "header__option stick-text"
                : "header__option"
            }
          >
            Home
          </p>
        </NavLink>
        <NavLink to="/listings" className="link" activeClassName="selected">
          <p
            className={
              location.pathname !== "/"
                ? "header__option stick-text"
                : sticky
                ? "header__option stick-text"
                : "header__option"
            }
          >
            Listings
          </p>
        </NavLink>
        <p
          className={
            location.pathname !== "/"
              ? "header__option stick-text"
              : sticky
              ? "header__option stick-text"
              : "header__option"
          }
        >
          About
        </p>
        <p
          className={
            location.pathname !== "/"
              ? "header__option stick-text"
              : sticky
              ? "header__option stick-text"
              : "header__option"
          }
        >
          Contact
        </p>
      </div>
    </div>
  );
}

export default Header;
