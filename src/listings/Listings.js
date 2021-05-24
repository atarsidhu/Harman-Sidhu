import React, { useEffect, useState, useRef } from "react";
import "./Listings.css";
import axios from "axios";
import ListingCardBasic from "./ListingCardBasic";
import Pagination from "./Pagination";
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
import LocationOnIcon from "@material-ui/icons/LocationOn";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import HotelIcon from "@material-ui/icons/Hotel";
import BathtubIcon from "@material-ui/icons/Bathtub";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
// import puppeteer from "puppeteer";

function Listings() {
  const REALTOR_API_KEY = process.env.REACT_APP_REALTOR_API_KEY;

  const [property, setProperty] = useState("0");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000000);
  // const [bedrooms, setBedrooms] = useState(0);
  // const [bathrooms, setBathrooms] = useState(0);
  const bedrooms = useRef(0);
  const bathrooms = useRef(0);
  const [coordinates, setCoordinates] = useState({
    latitudeMin: "49.007816",
    longitudeMin: "-123.217246",
    latitudeMax: "49.2806",
    longitudeMax: "-121.747719",
  });
  const [area, setArea] = useState("All");
  const [listings, setListings] = useState([]);
  const [mlsNumber, setMlsNumber] = useState("");
  const [searchMsg, setSearchMsg] = useState("Use the search bar to begin");
  const [modalShow, setModalShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLand, setIsLand] = useState(false);
  const [paging, setPaging] = useState({
    totalPages: 0,
    maxRecords: 0,
    recordsPerPage: 0,
  });
  const sort = useRef("A");
  const currentPage = useRef(1);
  let fromStart = true;
  let searchResults = {};
  let searchFieldValues = `${property}${area}${minPrice}${maxPrice}${bathrooms}${bedrooms}`;
  let cardsSection = document.getElementsByClassName("cards-section");
  // const puppeteer = require("puppeteer");

  // (async () => {
  //   const browser = await puppeteer.launch();
  //   console.log(browser.wsEndpoint());
  // })();

  // (async function main() {
  //   try {
  //     const browser = await puppeteer.launch({ headless: false });
  //     const page = await browser.newPage();
  //     page.setUserAgent(
  //       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
  //     );

  //     await page.goto(
  //       "https://www.realtor.ca/agent/2044451/harman-sidhu-305--15288-54a-avenue-surrey-british-columbia-v3s6t4"
  //     );
  //     await page.waitForSelector(".cardCon");

  //     console.log("showing");
  //   } catch (e) {
  //     console.log("error", e);
  //   }
  // })();

  /**
   * Loading indicator for when the API is being called
   */
  const LoadingIndicator = () => {
    const { promiseInProgress } = usePromiseTracker();
    return (
      promiseInProgress && (
        <div
          style={{
            height: "calc(100vh - 290px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "100vh",
            gridColumn: "1/4",
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
  function filterListings(fromStart) {
    window.scrollTo(0, 170);
    const newErrors = findErrors();
    // console.log(property);

    if (property === "4" || property === "6") {
      setIsLand(true);
    } else {
      setIsLand(false);
    }

    if (fromStart) {
      currentPage.current = 1;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      let options = {};
      let newOptions = {};

      if (mlsNumber === "") {
        options = {
          method: "GET",
          url: "https://realtor-canadian-real-estate.p.rapidapi.com/properties/list-residential",
          params: {
            CurrentPage: `${currentPage.current}`,
            LatitudeMin: coordinates.latitudeMin,
            LongitudeMax: coordinates.longitudeMax,
            RecordsPerPage: "50",
            LongitudeMin: coordinates.longitudeMin,
            LatitudeMax: coordinates.latitudeMax,
            BedRange: `${bedrooms.current}-0`,
            BathRange: `${bathrooms.current}-0`,
            NumberOfDays: "0",
            CultureId: "1",
            PriceMin: `${minPrice}`,
            PriceMax: `${maxPrice}`,
            TransactionTypeId: "2",
            PropertySearchTypeId: "0",
            SortBy: "1",
            BuildingTypeId: "1",
            SortOrder: sort.current,
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
          url: "https://realtor-canadian-real-estate.p.rapidapi.com/properties/list-by-mls",
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
            console.log(response.data.Results);

            setPaging({
              ...paging,
              totalPages: response.data.Paging.TotalPages,
              maxRecords: response.data.Paging.RecordsShowing,
              recordsPerPage:
                response.data.Paging.RecordsShowing < 50
                  ? response.data.Paging.RecordsShowing
                  : response.data.Paging.RecordsPerPage,
            });

            if (response.data.Results.length == 0) {
              setSearchMsg("No results found");
            }

            // console.log(searchFieldValues);

            // Ask about API price before spending time implementing this.
            // searchResults:
            //    searchFieldValues: {pageNumber: listings},
            // searchResults.searchFieldValues = {
            //   pageNumber: listings,
            // };

            // console.log(searchResults);
          })
          .catch(function (error) {
            console.error(error);
            setSearchMsg("The service is temporarily unavailable.");
          })
      );
    }
  }

  /**
   * Set the current page number
   *
   * @param {number} pageNumber The current page number
   */
  const paginate = (pageNumber) => {
    currentPage.current = pageNumber;
    fromStart = false;
    filterListings(fromStart);
    fromStart = true;
  };

  /**
   * Determines if the filter fields contain any errors
   *
   * @returns New errors if any are present.
   */
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
   * Required for API.
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
    setArea(location);
  }

  function handleSort(e) {
    if (e.target.value === "price high") {
      sort.current = "D";
      filterListings(true);
    } else if (e.target.value === "price low") {
      sort.current = "A";
      filterListings(true);
    }
  }

  /**
   * Set the data from the modal to the parent variables
   * @param {Object} fromModal - Data returned from modal
   */
  function handleSave(fromModal) {
    // setBedrooms(fromModal.beds);
    // setBathrooms(fromModal.baths);
    bedrooms.current = fromModal.beds;
    bathrooms.current = fromModal.baths;
  }

  /**
   * Display the more filters modal and save the data
   * @param {*} props - Props to be passed to the modal
   * @returns More filters modal
   */
  function FilterModal(props) {
    let fromModal = {
      beds: 0,
      baths: 0,
    };

    function handleChange(e, type) {
      if (type === "beds") {
        fromModal.beds = e.target.value;
      } else {
        fromModal.baths = e.target.value;
      }
    }

    function save() {
      props.onSave(fromModal);
    }

    function clicked() {
      if (fromModal.beds > 5) {
        fromModal.beds = 5;
      }
      if (fromModal.baths > 5) {
        fromModal.baths = 5;
      }

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
                    onChange={(e) => handleChange(e, "beds")}
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
                    onChange={(e) => handleChange(e, "baths")}
                    className="withIcon"
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>
                  <i>
                    The service only accepts a range between 1-5 for beds and
                    baths. Any value entered over 5 will return a{" "}
                    <strong>minimum</strong> of 5 of the desired type.
                  </i>
                </p>
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
      <div className="page__header">
        <h1 className="header-title display-3">LISTINGS</h1>
        <div className="header__image">
          <img
            src="/images/remax.png"
            alt=""
            className="page-header-background"
          />
        </div>
      </div>

      <div className="listings__wrapper  scene_element scene_element--fadein">
        <div className="filter">
          <Container>
            <h2 className="filter-title mb-3">Search Listings</h2>
            <Row className="mb-3">
              <Col md={3}>
                <p className="mb-1">Search by MLS&#174; Number</p>
                <Form.Control
                  type="text"
                  placeholder="MLS&#174; Number"
                  value={mlsNumber}
                  onInput={(e) => setMlsNumber(e.target.value)}
                  isInvalid={!!errors.mls}
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
                    <option value="Abbotsford">Abbotsford</option>
                    <option value="Burnaby">Burnaby</option>
                    <option value="Chilliwack">Chilliwack</option>
                    <option value="Langley">Langley</option>
                    <option value="Richmond">Richmond</option>
                    <option value="Surrey">Surrey</option>
                    <option value="Vancouver">Vancouver</option>
                    <option value="White Rock">White Rock</option>
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
            <Row className="justify-content-center mt-4">
              <Button
                variant="secondary"
                onClick={() => setModalShow(true)}
                style={{ marginLeft: "-36px" }}
                className="btn-filter"
              >
                More Filters
              </Button>
              <FilterModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                onSave={handleSave}
              />
              <Button
                variant="primary"
                onClick={() => filterListings(fromStart)}
                className="btn-search"
              >
                Search
              </Button>
            </Row>
          </Container>
        </div>

        <div className="cards-section">
          <LoadingIndicator />
          {listings.length === 0 ? (
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                gridColumn: "1/4",
              }}
            >
              <p
                style={{
                  color: "gray",
                  marginTop: "5%",
                }}
              >
                {searchMsg}
              </p>
            </div>
          ) : (
            <>
              {/* When pages change, update the values (showing results 51-100 out of 500)*/}
              <div
                style={{
                  gridColumn: "1/4",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {/* Check for over max results condition */}
                {currentPage.current === 1 ? (
                  <p
                    style={{
                      margin: "0 0 0 5px",
                      color: "gray",
                      fontSize: "20px",
                    }}
                  >
                    Showing 1 - {paging.recordsPerPage} of {paging.maxRecords}{" "}
                    listings
                  </p>
                ) : (
                  <p
                    style={{
                      margin: "0 0 0 5px",
                      color: "gray",
                      fontSize: "20px",
                    }}
                  >
                    Showing {currentPage.current * paging.recordsPerPage - 49} -{" "}
                    {currentPage.current * paging.recordsPerPage} of{" "}
                    {paging.maxRecords} listings
                  </p>
                )}
                <Col md={2}>
                  <Form.Control as="select" onChange={(e) => handleSort(e)}>
                    <option value="0">Sort By</option>
                    <option value="price low">Price Low To High</option>
                    <option value="price high">Price High To Low</option>
                  </Form.Control>
                </Col>
              </div>
              {listings?.map((listing, i) => (
                <ListingCardBasic
                  sqft={
                    isLand
                      ? listing?.Land?.SizeTotal
                      : listing?.Building?.SizeInterior
                  }
                  listing={listing}
                  key={i}
                />
              ))}
              <Pagination
                totalPages={paging.totalPages}
                paginate={paginate}
              ></Pagination>
            </>
          )}
        </div>
      </div>
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
