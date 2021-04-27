import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about">
      <div className="about__content">
        <div className="content__info">
          <h1 className="display-4">Harman S. Sidhu</h1>
          <hr />
          <p className="lead">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ad
            similique nostrum minus ex soluta praesentium! Recusandae deserunt
            voluptate blanditiis consectetur quibusdam. Nam ratione totam
            molestias officia. Impedit, obcaecati adipisci non deleniti
            voluptate placeat sequi alias? Impedit error distinctio doloremque,
            quos amet itaque nam quo, facere vero consequatur aliquid repellat.
            <br></br>
            <br></br>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
            similique magni commodi dolorem aspernatur harum et nesciunt
            deserunt officia. Delectus nostrum aperiam fugiat rerum laboriosam
            excepturi possimus, eum vero officia, neque placeat accusamus quas
            et reprehenderit adipisci nihil vel voluptatibus?
          </p>
          <p className="lead info-bottom">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
            error.
          </p>
          <a href="/contact" className="btn btn-primary">
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