import React from "react";
import "./ListingCardBasic.css";

function ListingCardBasic() {
  return (
    <div className="card-basic">
      <img src="/images/house-3.jpg" alt="house" className="propertyImage" />
      <span className="card__title">13220 62A Ave</span>
      <span className="card__price">$999,999</span>
      <span className="card__location">White Rock, BC</span>
    </div>
  );
}

export default ListingCardBasic;
