import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import Footer from "./Footer.jsx";
import BlockDetails from "./block/BlockDetails.jsx";
import TxDetails from "./TxDetails.jsx";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="main-container">
          <Switch>
            <Route path="/block/:number" component={BlockDetails} />
            <Route path="/tx/:hash" component={TxDetails} />
            <Route path="/" component={Home} />
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
