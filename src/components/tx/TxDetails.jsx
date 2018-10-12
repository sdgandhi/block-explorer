import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NotFound from "../NotFound";
import TxCard from "./TxCard";
import withBlockFetcher from "../hoc/withBlockFetcher.jsx";

class TxDetails extends PureComponent {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        hash: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    txns: PropTypes.objectOf(
      PropTypes.shape({
        hash: PropTypes.string.isRequired,
        blockNumber: PropTypes.number.isRequired,
        denomination: PropTypes.number.isRequired,
        prevBlockNumber: PropTypes.number.isRequired,
        slot: PropTypes.number.isRequired,
        newOwner: PropTypes.string.isRequired,
        spent: PropTypes.bool.isRequired
      })
    ).isRequired
  };

  render() {
    const txHash = this.props.match.params.hash;
    const tx = this.props.txns[txHash];

    if (!tx) {
      return <NotFound />;
    }

    return <TxCard tx={tx} />;
  }
}

TxDetails = connect(state => ({
  txns: state.elph.txns
}))(TxDetails);

export default withBlockFetcher(TxDetails);
