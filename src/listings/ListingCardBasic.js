import React from "react";
import "./ListingCardBasic.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import HotelIcon from "@material-ui/icons/Hotel";
import BathtubIcon from "@material-ui/icons/Bathtub";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

function ListingCardBasic({ address, price, image, sqft, beds, baths }) {
  const [title, cityWithPostalCode] = address?.split("|");
  const [city] = cityWithPostalCode.split(",");
  const [sqftSize] = sqft.split(" ");

  return (
    <div className="card-basic">
      <div className="card__image">
        <img src={image} alt="house" className="propertyImage" />
      </div>

      <div className="card__details">
        <span className="details__title">{title}</span>

        <div className="details__info">
          <span className="info__sqft">
            {sqftSize} ft<sup>2</sup>
          </span>
          <span className="info__beds">{beds} Bedrooms</span>
          <span className="info__baths">{baths} Bathrooms</span>
        </div>

        <div className="details__priceAndLocation">
          <span className="details__price">{price}</span>
          <div className="details__location">
            <LocationOnIcon fontSize="small" className="icon" />
            {city}, BC
          </div>
        </div>
      </div>

      <div className="separator">
        <hr
          style={{
            // position: "absolute",
            // bottom: "0",
            width: "100%",
            margin: "0",
          }}
        />
      </div>
    </div>
  );
}

export default ListingCardBasic;
