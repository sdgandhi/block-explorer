import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./navbar/Navbar.jsx";
import Home from "./Home.jsx";
import Footer from "./Footer.jsx";
import BlockDetails from "./block/BlockDetails.jsx";
import TxDetails from "./tx/TxDetails.jsx";
import { subscribeToBlocks } from "../redux/_elph";
import { subscribeToEthBlocks } from "../redux/_eth.js";
import AuthUtils from "../utils/AuthUtils.js";
import Login from "./Login.jsx";

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: AuthUtils.isLoggedIn()
    };
  }

  componentDidMount() {
    this.props.dispatch(subscribeToBlocks());
    this.props.dispatch(subscribeToEthBlocks());
  }

  render() {
    if (!this.state.loggedIn) {
      return <Login login={password => this.setState({ loggedIn: AuthUtils.login(password) })} />;
    }

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
