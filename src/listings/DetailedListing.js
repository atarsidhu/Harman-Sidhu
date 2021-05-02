import React from "react";
import "./DetailedListing.css";
import { useLocation } from "react-router-dom";
import Map from "./Map";
import ContactForm from "../ContactForm";

function DetailedListing() {
  let location = useLocation();
  let id = location.pathname.split("/")[2];
  // console.log(id);

  let listing = localStorage.getItem(id);
  listing = JSON.parse(listing);
  console.log(listing[listing.length - 1]);
  listing = listing[0];

  //   localStorage.removeItem("listing");

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

  const position = {
    lat: parseFloat(listing?.Property?.Address?.Latitude),
    lng: parseFloat(listing?.Property?.Address?.Longitude),
  };

  return (
    <div className="detailed">
      <div className="detailed__title">
        <h1 className="display-4">{title}</h1>
        <h1
          className="display-4"
          style={{ color: "#939343", fontWeight: "400" }}
        >
          {listing?.Property?.Price}
        </h1>
      </div>

      <div className="detailed__overview">
        <img
          src={
            listing?.Property?.Photo?.[0]?.HighResPath
              ? listing?.Property?.Photo?.[0]?.HighResPath
              : "../images/unavailable.jpg"
          }
          alt={title}
          className="detailedImage"
        />

        <div className="overview__info">
          <h2 style={{ paddingLeft: "10px", fontWeight: "300" }}>Walk Score</h2>
          <hr style={{ borderTop: "1px solid #939343", margin: "0" }} />
          <div
            id="ws-walkscore-tile"
            style={{
              position: "relative",
              textAlign: "left",
              textDecoration: "none",
              padding: "0px",
              fontStretch: "normal",
              fontStyle: "normal",
              fontVariant: "normal",
              letterSpacing: "normal",
              wordSpacing: "normal",
              textTransform: "none",
              verticalAlign: "baseline",
              textIndent: "0px",
              textShadow: "none",
              whiteSpace: "normal",
              backgroundImage: "none",
              backgroundColor: "transparent",
              height: "620px",
              width: "100%",
              // gridColumn: "1/4",
            }}
          >
            <iframe
              marginHeight={0}
              marginWidth={0}
              height={"620px"}
              frameBorder={0}
              scrolling={"no"}
              title={"Walk Score"}
              style={{
                margin: "0px",
                outline: "none",
                textAlign: "left",
                textDecoration: "none",
                padding: "0px",
                fontStretch: "normal",
                fontStyle: "normal",
                fontVariant: "normal",
                letterSpacing: "normal",
                wordSpacing: "normal",
                textTransform: "none",
                verticalAlign: "baseline",
                textIndent: "0px",
                textShadow: "none",
                whiteSpace: "normal",
                backgroundImage: "none",
                backgroundColor: "transparent",
                border: "0px",
              }}
              width="100%"
              src={`https://www.walkscore.com/serve-walkscore-tile.php?wsid=3c29105a68a939531c22e84d304b67d3&lat=${listing?.Property?.Address?.Latitude}&lng=${listing?.Property?.Address?.Longitude}&o=h&c=f&h=400&fh=0&w=320`}
            ></iframe>
          </div>
        </div>
      </div>
      {/* <hr
        style={{
          width: "100%",
          margin: "50px 0",
          borderTop: "1px solid lightgray",
        }}
      /> */}
      <div className="detailed__additional">
        <h2
          style={{
            gridColumn: "1/4",
            fontWeight: "300",
            paddingTop: "50px",
            marginBottom: "0",
          }}
        >
          Details & Description
        </h2>
        <hr
          style={{
            gridColumn: "1/4",
            paddingBottom: "20px",
            borderTop: "1px solid #939343",
          }}
        />
        <table>
          <tbody>
            <tr>
              <td className="tableTitle">MLS&#174; Number:</td>
              <td className="tableValue">{listing?.MlsNumber}</td>
            </tr>
            <tr>
              <td className="tableTitle">Address:</td>
              <td className="tableValue">{title}</td>
            </tr>
            <tr>
              <td className="tableTitle">Area:</td>
              <td className="tableValue">{city}</td>
            </tr>
            {listing?.Building?.SizeInterior ? (
              <tr>
                <td className="tableTitle">Square Footage:</td>
                <td className="tableValue">
                  {listing?.Building?.SizeInterior}
                </td>
              </tr>
            ) : null}
            {listing?.Land?.SizeTotal ? (
              <tr>
                <td className="tableTitle">Land Size:</td>
                <td className="tableValue">{listing?.Land?.SizeTotal}</td>
              </tr>
            ) : null}
            {listing?.Building?.Bedrooms > 0 ? (
              <>
                <tr>
                  <td className="tableTitle">Bedrooms:</td>
                  <td className="tableValue">{listing?.Building?.Bedrooms}</td>
                </tr>
                <tr>
                  <td className="tableTitle">Bathrooms:</td>
                  <td className="tableValue">
                    {listing?.Building?.BathroomTotal}
                  </td>
                </tr>
              </>
            ) : null}
            {listing?.Building?.Ammenities ? (
              <tr>
                <td className="tableTitle">Ammenities:</td>
                <td className="tableValue">{listing?.Building?.Ammenities}</td>
              </tr>
            ) : null}
            {listing?.Property?.AmmenitiesNearBy ? (
              <tr>
                <td className="tableTitle">Ammenities Near By:</td>
                <td className="tableValue">
                  {listing?.Property?.AmmenitiesNearBy}
                </td>
              </tr>
            ) : null}
            {listing?.Building?.Type ? (
              <tr>
                <td className="tableTitle">Type:</td>
                <td className="tableValue">{listing?.Building?.Type}</td>
              </tr>
            ) : listing?.Property?.Type ? (
              <tr>
                <td className="tableTitle">Type:</td>
                <td className="tableValue">{listing?.Property?.Type}</td>
              </tr>
            ) : null}
            {listing?.Individual[0]?.Organization?.Name ? (
              <tr>
                <td className="tableTitle">Listing Brokerage:</td>
                <td className="tableValue">
                  {listing?.Individual[0]?.Organization?.Name}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
        <p className="lead">{listing?.PublicRemarks}</p>
        <h2
          style={{
            gridColumn: "1/4",
            fontWeight: "300",
            paddingTop: "50px",
            marginBottom: "0",
          }}
        >
          Location & Contact
        </h2>
        <hr
          style={{
            gridColumn: "1/4",
            paddingBottom: "20px",
            borderTop: "1px solid #939343",
          }}
        />
        <Map position={position} address={title} />
        <div className="wrapper__info">
          <h4>Book a showing or request more info!</h4>
          <div className="info__general">
            {/* <div className="general__text">
              <p className="info-title">Phone Number</p>
              <p className="lead">604-600-5854</p>
              <p className="info-title">Email Address</p>
              <p className="lead">harman@harmansidhu.ca</p>
            </div>
            <p className="info-title">Office Location</p>
            <p className="lead">
              305 -15288 54A Avenue Surrey, British Columbia V3S6T4
            </p>
            <img
              src="../images/harmansidhu-picture.jpg"
              alt=""
              className="listing-image"
            /> */}
            <ContactForm fromListing={true} address={title} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailedListing;
