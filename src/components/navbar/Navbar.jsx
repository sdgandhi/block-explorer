import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { CSSTransitionGroup } from "react-transition-group";
import logo from "../../images/logo.svg";
import TogglePollingButton from "./TogglePollingButton.jsx";
import "../../styles/Navbar.scss";
import { setRpcUrl } from "../../redux/_elph";

class Navbar extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    rpcUrl: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      toggleHamburgerMenu: false,
      rpcUrl: props.rpcUrl,
      formSubmitted: false
    };
  }

  onUrlFormChanged(e) {
    const rpcUrl = e.target.value;
    this.setState({ rpcUrl });
  }

  onUrlFormSubmit(e) {
    e.preventDefault();
    if (this.state.rpcUrl === this.props.rpcUrl) {
      return;
    }

    this.props.dispatch(setRpcUrl(this.state.rpcUrl));
    this.setState({ formSubmitted: true });
    setTimeout(() => {
      this.setState({ formSubmitted: false });
    }, 2000);
  }

  render() {
    const { rpcUrl } = this.props;

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

                <div className="col-lg-6 order-lg-2">
                  <div className="bar__module pl-3">
                    <form onSubmit={e => this.onUrlFormSubmit(e)}>
                      <input
                        className="url-input type--fade"
                        type="url"
                        placeholder={rpcUrl}
                        value={this.state.rpcUrl}
                        onChange={e => this.onUrlFormChanged(e)}
                      />
                    </form>
                  </div>
                </div>

                <div className="col-lg-3 order-lg-2">
                  <div className="bar__module h-100">
                    <div className="h-100 d-flex flex-column justify-content-center">
                      <CSSTransitionGroup
                        transitionName="example"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={700}
                      >
                        {this.state.formSubmitted && (
                          <span className="color--success">Saved!</span>
                        )}
                      </CSSTransitionGroup>
                    </div>
                  </div>
                </div>

                <div className="col-lg-2 order-lg-4">
                  <div className="bar__module h-100">
                    <TogglePollingButton />
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
  rpcUrl: state.elph.rpcUrl
}))(Navbar);

export default Navbar;
