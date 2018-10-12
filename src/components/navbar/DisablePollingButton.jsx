import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { stopBlockSubscription, subscribeToBlocks } from "../../redux/_elph";

class DisablePollingButton extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    pollForNewBlocks: PropTypes.bool.isRequired
  };

  render() {
    return (
      <div className="h-100 d-flex flex-column justify-content-center float-right">
        {this.props.pollForNewBlocks ? (
          <span
            className="toggle-polling-btn type--fade type--fine-print"
            onClick={() => this.props.dispatch(stopBlockSubscription())}
          >
            Disable Polling
          </span>
        ) : (
          <span
            className="toggle-polling-btn type--bold type--fine-print color--success"
            onClick={() => this.props.dispatch(subscribeToBlocks())}
          >
            Enable Polling
          </span>
        )}
      </div>
    );
  }
}

DisablePollingButton = connect(state => ({
  pollForNewBlocks: state.elph.pollForNewBlocks
}))(DisablePollingButton);

export default DisablePollingButton;
