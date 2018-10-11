import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { PulseLoader } from "react-spinners";
import "../styles/Loader.scss";

class Loader extends PureComponent {
  static propTypes = {
    message: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className="loader-card">
        <div id="d-flex flex-column justify-content-center align-items-center">
          <PulseLoader color="#7adfbb" loading />
          <p>{this.props.message}</p>
        </div>
      </div>
    );
  }
}

export default Loader;
