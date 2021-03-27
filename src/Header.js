import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [sticky, setSticky] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;

    if (offset > 100) {
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
    <div className={sticky ? "header sticky-background" : "header"}>
      <div className="header__logo">
        <h3 className="logo">Harman Sidhu</h3>
      </div>
      <div className="header__nav">
        <Link to="/" className="link">
          <p
            className={sticky ? "header__option stick-text" : "header__option"}
          >
            Home
          </p>
        </Link>
        <Link to="/listings" className="link">
          <p
            className={sticky ? "header__option stick-text" : "header__option"}
          >
            Listings
          </p>
        </Link>
        <p className={sticky ? "header__option stick-text" : "header__option"}>
          About
        </p>
        <p className={sticky ? "header__option stick-text" : "header__option"}>
          Contact
        </p>
      </div>
    </div>
  );
}

export default Header;
