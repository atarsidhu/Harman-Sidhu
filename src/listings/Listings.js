import React, { useEffect } from "react";
import "./Listings.css";
import { data } from "../api/realtor";
import { useDataLayerValue } from "../DataLayer";
import axios from "axios";

function Listings() {
  // Might not need context API: Pull the data here, then we can pass it as
  //  prop to new react component(DetailedListing) which would be when a user clicks a listing

  const apiKey = "80e5e06efamsh3721e5506312e5bp154b12jsn1037ae2aee63";
  const [{ properties }, dispatch] = useDataLayerValue();

  // Bottom left: lat N/S 49.200255, long E/W -123.219011
  // top right: 49.297520, -123.023318

  const options = {
    method: "GET",
    url:
      "https://realtor-canadian-real-estate.p.rapidapi.com/properties/list-residential",
    params: {
      CurrentPage: "1",
      LatitudeMin: "49.200255",
      LongitudeMax: "-123.023318",
      RecordsPerPage: "50",
      LongitudeMin: "-123.219011",
      LatitudeMax: "49.297520",
      BedRange: "0-0",
      BathRange: "0-0",
      NumberOfDays: "0",
      CultureId: "1",
      PriceMin: "0",
      SortBy: "1",
      SortOrder: "A",
      RentMin: "0",
    },
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": "realtor-canadian-real-estate.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        // console.log(response.data.results);
        // data(response.data.Results);

        dispatch({
          type: "SET_SEARCH",
          properties: response.data.Results,
        });
      })
      .catch(function (error) {
        console.error(error);
      });

    console.log(properties);
  }, []);

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
