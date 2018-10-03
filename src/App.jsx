import React, { Component } from "react";
import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import Footer from "./Footer.jsx";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="main-container">
          <Home />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
