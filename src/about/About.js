import React from "react";
import "./About.css";
import { useHistory } from "react-router-dom";

function About() {
  const history = useHistory();
  return (
    <div className="about">
      <div className="page__header">
        <h1 className="header-title display-3">ABOUT</h1>
        <div className="header__image">
          <img
            src="/images/remax.png"
            alt=""
            className="page-header-background"
          />
        </div>
      </div>
      <div className="about__wrapper  scene_element scene_element--fadein">
        <div className="content__info">
          <h1 className="display-4">Harman S. Sidhu</h1>
          <hr
            style={{
              borderTop: "1px solid #939343",
              marginBottom: "30px",
              width: "70%",
            }}
          />
          <p className="lead">
            Born and raised in Surrey, Harman calls the Lower Mainland home -
            because it is! While studying abroad and obtaining a Bachelor of
            Laws Degree (L.L.B.), Harman's background equips him with the
            negotiation skills required to bring his clients the best price.
            Harman has been selling homes, handling transactions and
            understanding the market since 2017.
            <br></br>
            <br></br>
            Harman is also doing his part in giving back to the community. Each
            time he closes a deal, Harman donates a portion of his commission to
            the BC Children's Hospital Foundation. While working with Harman,
            you will also be helping a child in need.
            <br></br>
            <br></br>
            Harman goes above and beyond for his clients to deliver them the
            best results and to leave them with a smile on their face.
          </p>
          <p className="lead info-bottom">
            Let Harman help you through this life-changing experience.
          </p>
          <a
            onClick={() => history.push("/contact")}
            className="btn btn-primary"
          >
            Get in Touch
          </a>
        </div>
        <div className="content__photo">
          <img
            src="/images/harmansidhu-picture.jpg"
            alt="Harman Sidhu"
            className="content-photo"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
