import React, { useEffect } from "react";
import "./Home.css";
import { CarouselProvider, Slider, Slide, DotGroup } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import ListingCardBasic from "../listings/ListingCardBasic";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import Aos from "aos";
import "aos/dist/aos.css";

function Home() {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

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
        <h1 data-aos="fade-up" className="mb-5">
          Featured Listings
        </h1>
        {/* <div className="listings__cards"> */}
        <p data-aos="fade-up" className="text-center lead">
          Whether you are looking for homes, condos, townhomes, land, or
          commerical properties, Harman Sidhu can give you the guidance you need
          to make the right choice. Let Harman use his years of experience to
          help you get the best price for your property or to help you find a
          new place to call home. Surrey, Vancouver, Chilliwack or anywhere else
          in the Lower Mainland, Harman can locate the perfect property for you.
        </p>
        <br></br>
        <br></br>
        <p data-aos="fade-up" className="lead info-bottom">
          Find your dream home. Browse these listings currently available on the
          market.
        </p>
        <a href="/listings" data-aos="fade-up" className="btn btn-primary mt-4">
          Browse Listings
        </a>
        {/* </div> */}
      </div>

      <div className="about-section">
        <h1 data-aos="fade-up" className="mb-5">
          About Me
        </h1>
        <p data-aos="fade-up" className="text-center lead">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
          culpa amet corporis labore eveniet a dolores doloribus est dolorum.
          Quod magni totam cupiditate quo repellendus dicta blanditiis ea qui
          aliquid eum minima illo corporis ratione atque ex eaque repudiandae
          cum voluptas, neque iure doloremque magnam cumque error nisi! Odit,
          ea?
        </p>
        <a href="/about" data-aos="fade-up" className="btn btn-primary mt-5">
          Learn More
        </a>
      </div>

      <div className="contact-section">
        <h1 data-aos="fade-up" className="mb-5">
          Let's Get In Touch
        </h1>
        <div className="contact__info">
          <div data-aos="fade-up" data-aos-delay="100" className="info__phone">
            <div className="contact__circle">
              <PhoneIcon className="contact-icon" />
            </div>
            <h2 className="contact-info-title">Phone</h2>
            <p className="lead">604-600-5854</p>
          </div>
          <div data-aos="fade-up" data-aos-delay="400" className="info__email">
            <div className="contact__circle">
              <EmailIcon className="contact-icon" />
            </div>
            <h2 className="contact-info-title">Email</h2>
            <p className="lead">harman@harmansidhu.ca</p>
          </div>
          <div data-aos="fade-up" data-aos-delay="700" className="info__office">
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
// Services section?

export default Home;
