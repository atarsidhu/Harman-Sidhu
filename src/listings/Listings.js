import React from "react";
import "./Listings.css";

function Listings() {
  return (
    <div className="listings">
      <div className="filter">
        <h1>FilterSection</h1>
      </div>
      <div className="cards-section">
        <h1>Listings</h1>
        <div className="card">
          <img
            src="/images/house-3.jpg"
            alt="house"
            className="propertyImage"
          />
          <span className="card__title">13220 62A Ave</span>
          <span className="card__price">$999,999</span>
          <span className="card__location">White Rock, BC</span>
        </div>
        <div className="card">
          <img
            src="/images/house-3.jpg"
            alt="house"
            className="propertyImage"
          />
          <span className="card__title">13220 62A Ave</span>
          <span className="card__price">$999,999</span>
          <span className="card__location">White Rock, BC</span>
        </div>
      </div>
      <div className="google">
        <h1>Maps Section</h1>
      </div>
    </div>
  );
}

export default Listings;
