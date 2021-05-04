import React from "react";
import "./ListingCardBasic.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import HotelIcon from "@material-ui/icons/Hotel";
import BathtubIcon from "@material-ui/icons/Bathtub";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SquareFootIcon from "@material-ui/icons/SquareFoot";
import { Link } from "react-router-dom";
import DetailedListing from "./DetailedListing";

function ListingCardBasic({ sqft, listing }) {
  let title,
    cityWithPostalCode,
    city,
    sqftSize = "";

  if (listing?.Property?.Address?.AddressText !== "Address not available") {
    [title, cityWithPostalCode] = listing?.Property?.Address?.AddressText.split(
      "|"
    );
    [city] = cityWithPostalCode.split(",");
  }

  if (typeof sqft === "string") {
    [sqftSize] = sqft?.split(" ");
  }

  // console.log(listing);

  /**
   * Open new page and put listing into local storage to retrieve in DetailedListing component
   */
  function openNewPage() {
    let listingData = JSON.parse(localStorage.getItem(listing?.Id));

    if (listingData === null) {
      listingData = [];
    }

    // If property listing isn't in local storare, then store it
    if (localStorage.getItem(listing?.Id) === null) {
      listingData.push(listing);
      localStorage.setItem(listing?.Id, JSON.stringify(listingData));
    }

    window.open(`/listing/${listing?.Id}`);
    // localStorage.clear();
  }

  return (
    // <Link
    //   to={{
    //     pathname: `/listing/${listing?.Id}`,
    //     state: { address: listing?.Property?.Address?.AddressText },
    //   }}
    //   target="_blank"
    //   rel="noopener noreferrer"
    //   style={{ textDecoration: "none", color: "black" }}
    // >
    <div className="card-basic" onClick={openNewPage}>
      {/* <div className="wrapper"> */}
      <img
        src={
          listing?.Property?.Photo?.[0]?.HighResPath
            ? listing?.Property?.Photo?.[0]?.HighResPath
            : "./images/unavailable.jpg"
        }
        alt={title}
        className="propertyImage"
      />
      {/* <div className="address-wrapper"> */}
      <span className="address">{title}</span>
      {/* </div> */}

      {listing?.Building?.Bedrooms > 0 ? (
        <div className="info-wrapper">
          <div className="wrapper__details">
            <div className="details__info">
              <span>{listing?.Building?.Bedrooms}</span>
              <HotelIcon className="card-icon" />
            </div>
            Bedrooms
          </div>
          <div className="wrapper__details">
            <div className="details__info">
              <span>{listing?.Building?.BathroomTotal}</span>
              <BathtubIcon className="card-icon" />
            </div>
            Bathrooms
          </div>
          <div className="wrapper__details">
            <div className="details__info-sqft">
              <span>{sqftSize}</span>
              <SquareFootIcon className="card-icon" />
            </div>
            Sqft
          </div>
        </div>
      ) : sqftSize > 0 ? (
        <div className="info-wrapper" style={{ justifyContent: "normal" }}>
          <div className="wrapper__details no-beds">
            <div className="details__info-sqft">
              <span>{sqftSize}</span>
              <SquareFootIcon className="card-icon" />
            </div>
            Sqft
          </div>
          <span className="desc-content">{listing?.PublicRemarks}</span>
        </div>
      ) : (
        <div className="listing__desc">
          <span className="desc-content">{listing?.PublicRemarks}</span>
        </div>
      )}

      <div className="bottom-wrapper">
        <span className="location">
          <LocationOnIcon fontSize="small" className="icon" />
          {city}, BC
        </span>
        <span className="price">{listing?.Property?.Price}</span>
      </div>
      {/* </div> */}

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
    // </Link>
  );
}

export default ListingCardBasic;
