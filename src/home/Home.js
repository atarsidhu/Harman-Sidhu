import React from "react";
import "./Home.css";
import { CarouselProvider, Slider, Slide, DotGroup } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import ListingCardBasic from "../listings/ListingCardBasic";

function Home() {
  return (
    <div className="home">
      <div className="home__landingPage">
        <div className="tint"></div>
        <div className="carousel">
          <CarouselProvider
            naturalSlideHeight={100}
            naturalSlideWidth={100}
            totalSlides={5}
            isPlaying={true}
            infinite={true}
          >
            <Slider>
              <Slide index={0}>
                <img
                  src="/images/house-3.jpg"
                  alt="home"
                  className="homeImage"
                />
              </Slide>
              <Slide index={1}>
                <img
                  src="/images/backyard.jpg"
                  alt="backyard"
                  className="homeImage"
                />
              </Slide>
              <Slide index={2}>
                <img
                  src="/images/house-2.jpg"
                  alt="home"
                  className="homeImage"
                />
              </Slide>
              <Slide index={3}>
                <img
                  src="/images/interior.jpg"
                  alt="interior"
                  className="homeImage"
                />
              </Slide>
              <Slide index={4}>
                <img
                  src="/images/house-1.jpg"
                  alt="home"
                  className="homeImage"
                />
              </Slide>
            </Slider>
            <DotGroup className="dots" />
          </CarouselProvider>
        </div>

        <div className="home__content">
          <h1 className="name">Harman S. Sidhu</h1>
          <p className="title">Personal Real Estate Corporation</p>
          <p className="remax">RE/MAX Blueprint Realty</p>
        </div>
      </div>

      <div className="listings-section">
        <h1 className="listings__title">Featured Listings</h1>
        <div className="listings__cards">
          {/* Wont work unless we pass in props */}
          {/* <ListingCardBasic />
          <ListingCardBasic />
          <ListingCardBasic />
          <ListingCardBasic /> */}
        </div>
      </div>
    </div>
  );
}

// For each cheque childrens donation
// Add remax logo in footer

export default Home;
