import React, { useEffect, useState } from "react";
import "./Listings.css";
import axios from "axios";
import ListingCardBasic from "./ListingCardBasic";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";
import Map from "./Map";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import HotelIcon from "@material-ui/icons/Hotel";
import BathtubIcon from "@material-ui/icons/Bathtub";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Marker } from "@react-google-maps/api";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";

function Listings() {
  // Might not need context API: Pull the data here, then we can pass it as
  //  prop to new react component(DetailedListing) which would be when a user clicks a listing

  const REALTOR_API_KEY = process.env.REACT_APP_REALTOR_API_KEY;

  const [location, setLocation] = useState("All");
  const [property, setProperty] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000000);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [coordinates, setCoordinates] = useState({
    latitudeMin: "49.007816",
    longitudeMin: "-123.217246",
    latitudeMax: "49.2806",
    longitudeMax: "-121.747719",
  });
  const [listings, setListings] = useState([]);
  const [mlsNumber, setMlsNumber] = useState("");
  const [searchMsg, setSearchMsg] = useState(
    "Use the search bar to begin your search"
  );

  const LoadingIndicator = (props) => {
    const { promiseInProgress } = usePromiseTracker();
    return (
      promiseInProgress && (
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner animation="grow" role="status" variant="primary">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )
    );
  };

  /**
   * Filter the results based on the selections made by the user.
   */
  function filterListings() {
    let options = {};

    if (mlsNumber === "") {
      // When setting the min and max price, we must also apply the
      //  TransactionTypeId with the value of 2 for sale (3 is for rent)
      // PropertySearchTypeId doesnt work with residential (shows storage lockers)
      //  but works with vacant land
      options = {
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
          BedRange: `${bedrooms}-0`,
          BathRange: `${bathrooms}-0`,
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
    } else {
      options = {
        method: "GET",
        url:
          "https://realtor-canadian-real-estate.p.rapidapi.com/properties/list-by-mls",
        params: { ReferenceNumber: mlsNumber, CultureId: "1" },
        headers: {
          "x-rapidapi-key":
            "80e5e06efamsh3721e5506312e5bp154b12jsn1037ae2aee63",
          "x-rapidapi-host": "realtor-canadian-real-estate.p.rapidapi.com",
        },
      };
    }

    trackPromise(
      axios
        .request(options)
        .then(function (response) {
          setListings(response.data.Results);
          console.log(listings);
        })
        .catch(function (error) {
          console.error(error);
        })
    );
  }

  /**
   * Determines the minimum and maximum GPS coordinates of the selected location.
   *
   * @param {string} location Name of area.
   */
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

  function handleSave(fromModal) {
    setBathrooms(fromModal.baths);
    setBedrooms(fromModal.beds);
  }

  const [modalShow, setModalShow] = useState(false);

  function FilterModal(props) {
    const [fromModal, setFromModal] = useState({
      beds: 0,
      baths: 0,
    });

    function save() {
      props.onSave(fromModal);
    }

    function clicked() {
      props.onHide();
      save();
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            More Filters
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Beds and Baths {props.setValues}</h4>
          <Container>
            <Row>
              <Col>
                <p className="mb-1">Bedrooms</p>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <HotelIcon fontSize="small" />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="number"
                    placeholder="Beds"
                    onChange={(e) =>
                      setFromModal({ ...fromModal, beds: e.target.value })
                    }
                    className="withIcon"
                  />
                </InputGroup>
              </Col>
              <Col>
                <p className="mb-1">Bathrooms</p>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <BathtubIcon fontSize="small" />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="number"
                    placeholder="Baths"
                    // onChange={setBath}
                    onChange={(e) =>
                      setFromModal({ ...fromModal, baths: e.target.value })
                    }
                    className="withIcon"
                  />
                </InputGroup>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button onClick={clicked}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div className="listings">
      {/* <div className="listings__title">Listings</div> */}

      <div className="filter">
        <h2 className="filter__title">Search</h2>
        <Container>
          <Row className="mb-3">
            <Col md={3}>
              <p className="mb-1">Search by MLS&#174; Number</p>
              <Form.Control
                type="text"
                placeholder="MLS&#174; Number"
                value={mlsNumber}
                onInput={(e) => setMlsNumber(e.target.value)}
                // className="mlsInput"
                // onChange={(e) => setMinPrice(e.target.value)}
              />
            </Col>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "0 10px",
              }}
            >
              <div
                className="verticalRule"
                style={{
                  width: "1px",
                  height: "50%",
                  backgroundColor: "lightgray",
                }}
              ></div>
              <p style={{ padding: "40% 5%", marginBottom: "0" }}>OR</p>
              <div
                className="verticalRule"
                style={{
                  width: "1px",
                  height: "50%",
                  backgroundColor: "lightgray",
                }}
              ></div>
            </div>

            <Col md={2}>
              <p className="mb-1">Property Type</p>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <HomeWorkIcon fontSize="small" />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  as="select"
                  onChange={(e) => setProperty(e.target.value)}
                  className="withIcon"
                >
                  <option>All</option>
                  <option>House</option>
                  <option>Duplex</option>
                  <option>Triplex</option>
                  <option>Apartment</option>
                  <option>Other</option>
                </Form.Control>
              </InputGroup>
            </Col>
            <Col md={2}>
              <p className="mb-1">Location</p>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <LocationOnIcon fontSize="small" />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  as="select"
                  onChange={(e) => getCoordinates(e.target.value)}
                  className="withIcon"
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
              </InputGroup>
            </Col>
            <Col>
              <p className="mb-1">Min. Price</p>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <AttachMoneyIcon fontSize="small" />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="number"
                  placeholder="Min. Price"
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="withIcon"
                />
              </InputGroup>
            </Col>
            <Col>
              <p className="mb-1">Max. Price</p>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <AttachMoneyIcon fontSize="small" />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="number"
                  placeholder="Max. Price"
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="withIcon"
                />
              </InputGroup>
            </Col>
            <Col className="filterBtn">
              <Button variant="secondary" onClick={() => setModalShow(true)}>
                More Filters
              </Button>
              <FilterModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                // setValues={bathrooms}
                onSave={handleSave}
              />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Button variant="primary" onClick={filterListings}>
              Search
            </Button>
          </Row>
        </Container>
      </div>

      <div className="cards-section">
        {/* {location === "All" ? (
          <h1 className="pl-3">All Listings</h1>
        ) : (
          <h1 className="pl-3">Listings in {location}</h1>
        )} */}

        {/* <p style={{ margin: "10px 0 0 10px", color: "gray", fontSize: "14px" }}>
          Showing {listings.length} results
        </p> */}

        {/* listings?.map((listing) => (
            <ListingCardBasic
              address={listing?.Property?.Address?.AddressText}
              price={listing?.Property?.Price}
              image={listing?.Property?.Photo?.[0]?.HighResPath}
              sqft={listing?.Building?.SizeInterior}
              baths={listing?.Building?.BathroomTotal}
              beds={listing?.Building?.Bedrooms}
            />
          )) */}

        {listings.length === 0 ? (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                color: "gray",
              }}
            >
              {searchMsg}
            </p>
          </div>
        ) : (
          <>
            <LoadingIndicator />
            {listings?.map((listing) => (
              <ListingCardBasic
                address={listing?.Property?.Address?.AddressText}
                price={listing?.Property?.Price}
                image={listing?.Property?.Photo?.[0]?.HighResPath}
                sqft={listing?.Building?.SizeInterior}
                baths={listing?.Building?.BathroomTotal}
                beds={listing?.Building?.Bedrooms}
              />
            ))}
          </>
        )}
      </div>

      <Map />
    </div>
  );
}

export default Listings;
