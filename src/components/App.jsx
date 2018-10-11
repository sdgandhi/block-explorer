import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import Footer from "./Footer.jsx";
import BlockDetails from "./block/BlockDetails.jsx";
import TxDetails from "./TxDetails.jsx";
import { fetchLatestBlocks } from "../redux/_explorer";

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.dispatch(fetchLatestBlocks());
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="main-container">
          <Switch>
            <Route path="/block/:number" component={BlockDetails} />
            <Route path="/tx/:number/:hash" component={TxDetails} />
            <Route path="/" component={Home} />
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

App = connect()(App);

export default withRouter(App);
