import React, { PureComponent } from "react";
import logo from "./images/logo.svg";

class Navbar extends PureComponent {
  render() {
    return (
      <div className="nav-container">
        <div>
          <div className="bar bar--sm visible-xs">
            <div className="container">
              <div className="row">
                <div className="col-3 col-md-2">
                  <a href="index.html">
                    {" "}
                    <img
                      className="logo logo-dark"
                      alt="logo"
                      src={logo}
                    />{" "}
                    <img className="logo logo-light" alt="logo" src={logo} />{" "}
                  </a>
                </div>
                <div className="col-9 col-md-10 text-right">
                  <a
                    href="/"
                    className="hamburger-toggle"
                    data-toggle-class="#menu1;hidden-xs hidden-sm"
                  >
                    {" "}
                    <i className="icon icon--sm stack-interface stack-menu" />{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <nav id="menu1" className="bar bar-1 hidden-xs">
            <div className="container">
              <div className="row">
                <div className="col-lg-1 col-md-2 hidden-xs">
                  <div className="bar__module">
                    <a href="index.html">
                      {" "}
                      <img
                        className="logo logo-dark"
                        alt="logo"
                        src={logo}
                      />{" "}
                      <img className="logo logo-light" alt="logo" src={logo} />{" "}
                    </a>
                  </div>
                </div>
                <div className="col-lg-11 col-md-12 text-right text-left-xs text-left-sm">
                  <div className="bar__module">
                    <a
                      className="btn btn--sm btn--primary type--uppercase"
                      href="/"
                    >
                      {" "}
                      <span className="btn__text">Buy Now</span>{" "}
                    </a>
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
