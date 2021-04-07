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

  const [property, setProperty] = useState("0");
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
  const [modalShow, setModalShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLand, setIsLand] = useState(false);

  /**
   * Loading indicator for when the API is being called
   */
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
    const newErrors = findErrors();
    console.log(property);

    if (property === "4" || property === "6") {
      setIsLand(true);
    } else {
      setIsLand(false);
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      let options = {};
      let newOptions = {};

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

        if (property === "0") {
          // If All is selected, set values to 0 to show all
          newOptions = {
            ...options,
            params: {
              ...options.params,
              BuildingTypeId: 0,
              PropertySearchTypeId: 0,
            },
          };
        } else if (property === "1") {
          // If house if selected, set values to 1,0 to show houses
          newOptions = {
            ...options,
            params: {
              ...options.params,
              BuildingTypeId: 1,
              PropertySearchTypeId: 0,
            },
          };
        } else {
          // If house or all is not selected, set the PropertySearchTypeId value to the selected value
          newOptions = {
            ...options,
            params: {
              ...options.params,
              BuildingTypeId: 0,
              PropertySearchTypeId: property,
            },
          };
        }
      } else {
        // MLS Search

        newOptions = {
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
          .request(newOptions)
          .then(function (response) {
            setListings(response.data.Results);
            console.log(listings);
          })
          .catch(function (error) {
            console.error(error);
          })
      );
    }
  }

  const findErrors = () => {
    const newErrors = {};

    if (
      (mlsNumber.length > 0 && mlsNumber.length < 8) ||
      mlsNumber.length > 8 ||
      (mlsNumber > 0 && mlsNumber.charAt(0) !== "R")
    ) {
      newErrors.mls = "Invalid MLS number!";
    }

    if (maxPrice < minPrice) {
      newErrors.price = "Max Price cannot be less than Min Price!";
    }

    return newErrors;
  };

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

  /**
   * Determines the designated integer for the selected property
   * @param {String} type - The type of property selected by the user
   */
  // function propertyType(type) {
  //   switch (type) {
  //     case "All":
  //       setProperty(0);
  //       break;
  //     case "House":
  //       setProperty(1);
  //       break;
  //     case "Condo/Strata":
  //       setProperty(3);
  //       break;
  //     case "Agriculture":
  //       setProperty(4);
  //       break;
  //     case "Vacant Land":
  //       setProperty(6);
  //       break;
  //     case "Multi Family":
  //       setProperty(8);
  //       break;
  //   }
  // }

  /**
   * Set the data from the modal to the parent variables
   * @param {Object} fromModal - Data returned from modal
   */
  function handleSave(fromModal) {
    setBathrooms(fromModal.baths);
    setBedrooms(fromModal.beds);
  }

  /**
   * Display the more filters modal and save the data
   * @param {*} props - Props to be passed to the modal
   * @returns More filters modal
   */
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
                isInvalid={!!errors.mls}
                // className="mlsInput"
                // onChange={(e) => setMinPrice(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.mls}
              </Form.Control.Feedback>
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
                  <option value="0">All</option>
                  <option value="1">House</option>
                  <option value="3">Condo/Strata</option>
                  <option value="4">Agriculture</option>
                  <option value="6">Vacant Land</option>
                  <option value="8">Multi Family</option>
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
                  isInvalid={!!errors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </InputGroup>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Button variant="secondary" onClick={() => setModalShow(true)}>
              More Filters
            </Button>
            <FilterModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              onSave={handleSave}
            />
            <Button
              variant="primary"
              onClick={filterListings}
              style={{ marginLeft: "15px" }}
            >
              Search
            </Button>
          </Row>
        </Container>
      </div>

      <div className="cards-section">
        {/* <p style={{ margin: "10px 0 0 10px", color: "gray", fontSize: "14px" }}>
          Showing {listings.length} results
        </p> */}

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
            {/* EVERYTIME YOU CHANGE PROPERTY, IT LOADS NEW SQFT. NEED TO CHANGE TO SEARCH */}
            {listings?.map((listing) => (
              <ListingCardBasic
                address={listing?.Property?.Address?.AddressText}
                price={listing?.Property?.Price}
                image={listing?.Property?.Photo?.[0]?.HighResPath}
                sqft={
                  isLand
                    ? listing?.Land?.SizeTotal
                    : listing?.Building?.SizeInterior
                }
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

// if (property === 4 || property === 6) {
//   // Agriculture or Vacant Land
//   // Nothing in Building obj
//   //  SQFT is in Land.SizeTotal
// } else {
//   // Houses
//   // Multi Family has no beds and baths in Building
//   // Property === 3 (Condo/Strata contains a lot of lockers (as its sorted by price - lockers are the cheapest))
// }

export default Listings;
