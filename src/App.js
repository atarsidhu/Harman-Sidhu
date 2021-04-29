import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./home/Home";
import Listings from "./listings/Listings";
import Footer from "./footer/Footer";
import About from "./about/About";
import Contact from "./contact/Contact";
import ScrollToTop from "./ScrollToTop";
import DetailedListing from "./listings/DetailedListing";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <ScrollToTop />
        <Switch>
          <Route path="/listing/:id" exact component={DetailedListing}>
            {/* <DetailedListing /> */}
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/listings">
            <Listings />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
