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
        {/* <h3 className="logo">Harman Sidhu</h3> */}
        <img src="/images/HarmanSidhuLogo4Gold.png" alt="" className="logo" />
      </div>
      <div className="header__nav">
        <NavLink exact to="/" className="link" activeClassName="selected">
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
        {/* <NavLink
          to="/exclusive-listings"
          className="link"
          activeClassName="selected"
        >
          <p
            className={
              location.pathname !== "/"
                ? "header__option stick-text"
                : sticky
                ? "header__option stick-text"
                : "header__option"
            }
          >
            Exclusive Listings
          </p>
        </NavLink> */}
        <NavLink to="/about" className="link" activeClassName="selected">
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
        </NavLink>
        <NavLink to="/contact" className="link" activeClassName="selected">
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
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
