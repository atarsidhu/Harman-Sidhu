import React from "react";
import "./ListingCardBasic.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import HotelIcon from "@material-ui/icons/Hotel";
import BathtubIcon from "@material-ui/icons/Bathtub";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

function ListingCardBasic({ address, price, image, sqft, beds, baths }) {
  let title,
    cityWithPostalCode,
    city,
    sqftSize = "";

  if (address !== "Address not available") {
    [title, cityWithPostalCode] = address?.split("|");
    [city] = cityWithPostalCode.split(",");
  }

  // [sqftSize] = sqft?.split(" ");

  return (
    <div className="card-basic">
      <div className="wrapper">
        <div className="address-wrapper">
          <span className="address">{title}</span>
        </div>

        <img
          src={
            image
              ? image
              : "https://cdn.realtor.ca/listings/TS637533235340900000/reb6/highres/9/R2560309_1.jpg"
          }
          alt={title}
          className="propertyImage"
        />
        <div className="bottom-wrapper">
          <span className="price">{price}</span>
          <span className="location">
            <LocationOnIcon fontSize="small" className="icon" />
            {city}, BC
          </span>
        </div>
      </div>

      {/* <div className="card__details">
        <span className="details__title">{title}</span>

        <div className="details__info">
          {typeof sqft === "undefined" ? null : (
            <span className="info__sqft">
              &#9679; &nbsp; {sqft}
              ft<sup>2</sup>
            </span>
          )}
          {typeof beds === "undefined" ? null : (
            <>
              <span className="info__beds"> &#9679; &nbsp; {beds} Beds</span>
              <span className="info__baths">
                {" "}
                &#9679; &nbsp; {baths} Baths
              </span>{" "}
            </>
          )}
        </div>

        <div className="details__priceAndLocation">
          <span className="details__price">{price}</span>
          <div className="details__location">
            <LocationOnIcon fontSize="small" className="icon" />
            {city}, BC
          </div>
        </div>
      </div> */}

      {/* <div className="separator">
        <hr
          style={{
            // position: "absolute",
            // bottom: "0",
            width: "100%",
            margin: "0",
          }}
        />
      </div> */}
    </div>
  );
}

export default ListingCardBasic;
