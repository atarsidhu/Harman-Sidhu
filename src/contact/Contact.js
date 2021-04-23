import React, { useState } from "react";
import "./Contact.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import Map from "../listings/Map";
import { Marker } from "@react-google-maps/api";

function Contact() {
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    const newErrors = findErrors();
    event.preventDefault();
    event.stopPropagation();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
    }
  };

  const findErrors = () => {
    const newErrors = {};
    const isNum = /^\d+$/.test(phoneNumber);
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (firstName.length < 1) {
      newErrors.firstName = "Please enter your first name";
    }

    if (lastName.length < 1) {
      newErrors.lastName = "Please enter your last name";
    }

    if (reg.test(email) === false) {
      newErrors.email = "Invalid email";
    }

    if (phoneNumber.length != 10 || !isNum) {
      newErrors.phoneNumber = "Invalid phone number";
    }

    if (message.length < 1) {
      newErrors.message = "Please enter a message";
    }

    return newErrors;
  };

  return (
    <div className="contact">
      <div className="page__header">
        <h1 className="header-title display-3">CONTACT</h1>
        <div className="header__image">
          <img
            src="/images/remax.png"
            alt=""
            className="page-header-background"
          />
        </div>
      </div>
      <div className="contact__body">
        <h1 className="contact-title">Let's Connect</h1>
        <div className="contact__wrapper">
          <div className="wrapper__form">
            <h3 className="wrapper-question">Got a Question?</h3>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      required
                      onInput={(e) => setFirstName(e.target.value)}
                      isInvalid={!!errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      required
                      onInput={(e) => setLastName(e.target.value)}
                      isInvalid={!!errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="name@example.com"
                      required
                      onInput={(e) => setEmail(e.target.value)}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="6049991234"
                      required
                      onInput={(e) => setPhoneNumber(e.target.value)}
                      isInvalid={!!errors.phoneNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phoneNumber}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Your Message"
                      rows={4}
                      required
                      isInvalid={!!errors.message}
                      onInput={(e) => setMessage(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="text-center mt-3">
                <Col>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>

          <div className="wrapper__info">
            <div className="info__general">
              <h4>General Information</h4>
              <p className="info-title">Phone Number</p>
              <p className="lead">604-600-5854</p>
              <p className="info-title">Email Address</p>
              <p className="lead">harman@harmansidhu.ca</p>
              <p className="info-title">Office Location</p>
              <p className="lead">
                305 -15288 54A Avenue Surrey, British Columbia V3S6T4
              </p>
            </div>
            <Map type={"contact"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
