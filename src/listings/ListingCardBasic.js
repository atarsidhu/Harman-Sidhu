import React from "react";
import "./ListingCardBasic.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import HotelIcon from "@material-ui/icons/Hotel";
import BathtubIcon from "@material-ui/icons/Bathtub";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

function ListingCardBasic({ address, price, image, sqft }) {
  const [title, cityWithPostalCode] = address?.split("|");
  const [city] = cityWithPostalCode.split(",");
  const [sqftSize] = sqft.split(" ");

  return (
    <div className="card-basic">
      <img src={image} alt="house" className="propertyImage" />
      <span className="card__title">{title}</span>
      <span className="card__sqft">{sqftSize} sq. ft.</span>
      <span className="card__price">{price}</span>
      <div className="card__location">
        <LocationOnIcon fontSize="small" className="icon" />
        {city}, BC
      </div>
    </div>
  );
}

export default ListingCardBasic;
