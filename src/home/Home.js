import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="home__image"></div>
      <img src="/images/house-3.jpg" alt="home-image" className="homeImage" />
      <div className="home__content">
        <h1 className="name">Harman S. Sidhu</h1>
        <p className="title">Personal Real Estate Corporation</p>
        <p className="remax">RE/MAX Blueprint Realty</p>
      </div>
    </div>
  );
}

// For each cheque childrens donation
// Add remax logo in footer

export default Home;
