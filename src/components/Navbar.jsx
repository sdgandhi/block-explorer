import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../images/logo.svg";
import "../styles/Navbar.scss";
import { stopBlockSubscription, subscribeToBlocks } from "../redux/_elph";

class Navbar extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    pollForNewBlocks: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      toggleHamburgerMenu: false
    };
  }

  render() {
    return (
      <div className="nav-container nav-contrast-border sticky-nav ">
        <div className="via-1538591159517" via="via-1538591159517" vio="asdf">
          <div className="bar bar--sm visible-sm visible-xs">
            <div className="container">
              <div className="row">
                <div className="col-3 col-md-2">
                  <NavLink to="/">
                    <img className="logo logo-dark" alt="logo" src={logo} />
                    <img className="logo logo-light" alt="logo" src={logo} />
                  </NavLink>
                </div>
                <div className="col-9 col-md-10 text-right">
                  <div
                    className="hamburger-toggle"
                    data-toggle-class="#menu3;hidden-xs hidden-sm"
                    onClick={() => {
                      this.setState(prevState => ({
                        toggleHamburgerMenu: !prevState.toggleHamburgerMenu
                      }));
                    }}
                  >
                    <i className="icon icon--sm stack-interface stack-menu" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <nav
            className={`bar bar--sm ${
              this.state.toggleHamburgerMenu ? "" : "hidden-sm hidden-xs"
            }`}
            id="menu3"
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-1 hidden-xs hidden-sm order-lg-1">
                  <div className="bar__module">
                    <NavLink to="/">
                      <img className="logo logo-dark" alt="logo" src={logo} />
                      <img className="logo logo-light" alt="logo" src={logo} />
                    </NavLink>
                  </div>
                </div>
                <div className="col-lg-2 offset-lg-9 order-lg-4">
                  <div className="bar__module h-100">
                    <div className="h-100 d-flex flex-column justify-content-center float-right">
                      {this.props.pollForNewBlocks ? (
                        <span
                          className="toggle-polling-btn type--fade type--fine-print"
                          onClick={() =>
                            this.props.dispatch(stopBlockSubscription())
                          }
                        >
                          Disable Polling
                        </span>
                      ) : (
                        <span
                          className="toggle-polling-btn type--bold type--fine-print color--success"
                          onClick={() =>
                            this.props.dispatch(subscribeToBlocks())
                          }
                        >
                          Enable Polling
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

Navbar = connect(state => ({
  pollForNewBlocks: state.elph.pollForNewBlocks
}))(Navbar);

export default Navbar;
