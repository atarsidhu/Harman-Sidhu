import React from "react";
import "./Home.css";
import { CarouselProvider, Slider, Slide, DotGroup } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import ListingCardBasic from "../listings/ListingCardBasic";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import LocationCityIcon from "@material-ui/icons/LocationCity";

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
        <h1 className="mb-5">Featured Listing</h1>
        <div className="listings__cards">
          {/* Wont work unless we pass in props */}
          {/* <ListingCardBasic />
          <ListingCardBasic />
          <ListingCardBasic />
          <ListingCardBasic /> */}
        </div>
      </div>

      <div className="about-section">
        <h1 className="mb-5">About Me</h1>
        <p className="text-left lead">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
          culpa amet corporis labore eveniet a dolores doloribus est dolorum.
          Quod magni totam cupiditate quo repellendus dicta blanditiis ea qui
          aliquid eum minima illo corporis ratione atque ex eaque repudiandae
          cum voluptas, neque iure doloremque magnam cumque error nisi! Odit,
          ea?
        </p>
        <a href="/about" className="btn btn-primary mt-5">
          Learn More
        </a>
      </div>

      <div className="contact-section">
        <h1 className="mb-5">Let's Get In Touch</h1>
        <div className="contact__info">
          <div className="info__phone">
            <div className="contact__circle">
              <PhoneIcon className="contact-icon" />
            </div>
            <h2 className="contact-info-title">Phone</h2>
            <p className="lead">604 - 593 - 6188</p>
          </div>
          <div className="info__email">
            <div className="contact__circle">
              <EmailIcon className="contact-icon" />
            </div>
            <h2 className="contact-info-title">Email</h2>
            <p className="lead">harman@harmansidhu.ca</p>
          </div>
          <div className="info__office">
            <div className="contact__circle">
              <LocationCityIcon className="contact-icon" />
            </div>
            <h2 className="contact-info-title">Address</h2>
            <p className="lead">
              305 -15288 54A Avenue Surrey, British Columbia V3S6T4
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// For each cheque childrens donation
// Add remax logo in footer
// Services section?

export default Home;
