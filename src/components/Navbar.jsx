import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.svg";
import "../styles/Navbar.css";

class Navbar extends Component {
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
                  <a
                    href="#"
                    className="hamburger-toggle"
                    data-toggle-class="#menu3;hidden-xs hidden-sm"
                    onClick={() => {
                      this.setState(prevState => ({
                        toggleHamburgerMenu: !prevState.toggleHamburgerMenu
                      }));
                    }}
                  >
                    <i className="icon icon--sm stack-interface stack-menu" />
                  </a>
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
                <div className="col-lg-6 offset-lg-2 order-lg-4">
                  <div className="bar__module">
                    <form>
                      {" "}
                      <input
                        type="search"
                        placeholder="Search site"
                        name="query"
                      />{" "}
                    </form>
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

export default Navbar;
