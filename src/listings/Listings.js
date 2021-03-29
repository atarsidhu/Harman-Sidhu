import React, { useEffect, useState } from "react";
import "./Listings.css";
import { data } from "../api/realtor";
import { useDataLayerValue } from "../DataLayer";
import axios from "axios";
import ListingCardBasic from "./ListingCardBasic";
// import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";

function Listings() {
  // Might not need context API: Pull the data here, then we can pass it as
  //  prop to new react component(DetailedListing) which would be when a user clicks a listing

  const REALTOR_API_KEY = process.env.REACT_APP_REALTOR_API_KEY;

  // const [{ properties }, dispatch] = useDataLayerValue();

  const [location, setLocation] = useState("All");
  const [property, setProperty] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [coordinates, setCoordinates] = useState({
    latitudeMin: "",
    longitudeMin: "",
    latitudeMax: "",
    longitudeMax: "",
  });

  // Vancouver Area
  // Bottom left: lat N/S 49.200255, long E/W -123.219011
  // top right: 49.297520, -123.023318

  // useEffect(() => {
  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       // console.log(response.data.results);
  //       // data(response.data.Results);

  //       dispatch({
  //         type: "SET_SEARCH",
  //         properties: response.data.Results,
  //       });
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });

  //   console.log(properties);
  // }, []);

  // 0-No Preference|1-House|2-Duplex|3-Triplex|5-Residential Commercial Mix|
  // 6-Mobile Home|12-Special Purpose|14-Other|16-Row / Townhouse|17-Apartment|
  // 19-Fourplex|20-Garden Home|26-Modular|27-Manufactured Home/Mobile|
  // 28-Commercial Apartment|29-Manufactured Home

  function filterListings() {
    // Call function here to get lang and lat of locations
    getCoordinates(location);

    // When setting the min and max price, we must also apply the
    //  TransactionTypeId with the value of 2 for sale (3 is for rent)
    // PropertySearchTypeId doesnt work with residential (shows storage lockers)
    //  but works with vacant land
    const options = {
      method: "GET",
      url:
        "https://realtor-canadian-real-estate.p.rapidapi.com/properties/list-residential",
      params: {
        CurrentPage: "1",
        LatitudeMin: coordinates.latitudeMin,
        LongitudeMax: coordinates.longitudeMax,
        RecordsPerPage: "50",
        LongitudeMin: coordinates.longitudeMin,
        LatitudeMax: coordinates.latitudeMax,
        BedRange: `${bedrooms}-${bedrooms}`,
        BathRange: `${bathrooms}-${bathrooms}`,
        NumberOfDays: "0",
        CultureId: "1",
        PriceMin: `${minPrice}`,
        PriceMax: `${maxPrice}`,
        TransactionTypeId: "2",
        PropertySearchTypeId: "0",
        SortBy: "1",
        BuildingTypeId: "1",
        SortOrder: "A",
        RentMin: "0",
      },
      headers: {
        "x-rapidapi-key": REALTOR_API_KEY,
        "x-rapidapi-host": "realtor-canadian-real-estate.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.Results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function getCoordinates(location) {
    switch (location) {
      case "All":
        setCoordinates({
          latitudeMin: "49.007816",
          longitudeMin: "-123.217246",
          latitudeMax: "49.2806",
          longitudeMax: "-121.747719",
        });
        break;
      case "Vancouver":
        setCoordinates({
          latitudeMin: "49.200255",
          longitudeMin: "-123.219011",
          latitudeMax: "49.297520",
          longitudeMax: "-123.023318",
        });
        break;
      case "Richmond":
        setCoordinates({
          latitudeMin: "49.120320",
          longitudeMin: "-123.210096",
          latitudeMax: "49.197989",
          longitudeMax: "-123.029324",
        });
        break;
      case "Surrey":
        setCoordinates({
          latitudeMin: "49.00326",
          longitudeMin: "-122.901107",
          latitudeMax: "49.201550",
          longitudeMax: "-122.681594",
        });
        break;
      case "White Rock":
        setCoordinates({
          latitudeMin: "49.014395",
          longitudeMin: "-122.847289",
          latitudeMax: "49.031205",
          longitudeMax: "-122.778968",
        });
        break;
      case "Langley":
        setCoordinates({
          latitudeMin: "49.002801",
          longitudeMin: "-122.680786",
          latitudeMax: "49.172319",
          longitudeMax: "-122.462232",
        });
        break;
      case "Burnaby":
        setCoordinates({
          latitudeMin: "49.183382",
          longitudeMin: "-123.024095",
          latitudeMax: "49.292325",
          longitudeMax: "-122.893632",
        });
        break;
      case "Abbotsford":
        setCoordinates({
          latitudeMin: "49.003030",
          longitudeMin: "-122.459614",
          latitudeMax: "49.145869",
          longitudeMax: "-122.076790",
        });
        break;
      case "Chilliwack":
        setCoordinates({
          latitudeMin: "49.046068",
          longitudeMin: "-122.083096",
          latitudeMax: "49.212312",
          longitudeMax: "-121.786465",
        });
        break;
    }
  }

  return (
    <div className="listings">
      <div className="filter">
        <h2 className="filter__title">Filter</h2>
        <Container>
          <Row className="mb-3">
            <p className="mb-1">Location</p>
            <Form.Control
              as="select"
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Vancouver">Vancouver</option>
              <option value="Richmond">Richmond</option>
              <option value="Surrey">Surrey</option>
              <option value="White Rock">White Rock</option>
              <option value="Langley">Langley</option>
              <option value="Burnaby">Burnaby</option>
              <option value="Abbotsford">Abbotsford</option>
              <option value="Chilliwack">Chilliwack</option>
            </Form.Control>
          </Row>
          <Row className="mb-3">
            <p className="mb-1">Property Type</p>
            <Form.Control
              as="select"
              onChange={(e) => setProperty(e.target.value)}
            >
              <option>All</option>
              <option>House</option>
              <option>Duplex</option>
              <option>Triplex</option>
              <option>Apartment</option>
              <option>Other</option>
            </Form.Control>
          </Row>
          <Row className="mb-3">
            <p className="mb-1">Minimum Price</p>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="number"
                placeholder="Min. Price"
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </InputGroup>
          </Row>
          <Row className="mb-3">
            <p className="mb-1">Maximum Price</p>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="number"
                placeholder="Max. Price"
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </InputGroup>
          </Row>
          <Row className="mb-3">
            <p className="mb-1">Bedrooms</p>
            <Form.Control
              type="number"
              placeholder="Beds"
              onChange={(e) => setBedrooms(e.target.value)}
            />
          </Row>
          <Row className="mb-4">
            <p className="mb-1">Bathrooms</p>
            <Form.Control
              type="number"
              placeholder="Baths"
              onChange={(e) => setBathrooms(e.target.value)}
            />
          </Row>
          <Row className="justify-content-center">
            <Button variant="primary" onClick={filterListings}>
              Search
            </Button>
          </Row>
        </Container>
      </div>
      <div className="cards-section">
        <h1>{coordinates.latitudeMax}</h1>
        {/* <ListingCardBasic title={} price={} location={} /> */}
        {/* <div className="card">
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
        </div> */}
      </div>
      <div className="google">
        <h1>Maps Section</h1>
      </div>
    </div>
  );
}

export default Listings;
