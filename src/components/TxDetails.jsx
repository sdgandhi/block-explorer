import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Link from "react-router-dom/Link";
import logoSymbol from "../images/logo_symbol.png";
import CopyToClipboardButton from "./CopyToClipboardButton";
import ElphUtils from "../utils/ElphUtils";
import "../styles/TxDetails.scss";

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

    // TODO(Sarat): Have proper Loader logic and fetch block containing transaction if it doesn't exist.
    if (!tx) {
      return null;
    }

    const txUrl = `/tx/${tx.hash}`;
    const absoluteTxUrl = `${ElphUtils.getOriginUrl()}${txUrl}`;

    const spentText = tx.spent ? "spent" : "unspent";

    return (
      <section>
        <div className="container">
          <div className="card card-1 boxed boxed--sm boxed--border">
            <div className="card__top">
              <div className="card__avatar">
                <img alt="logo symbol" src={logoSymbol} />
                <span>
                  <h4 className="d-inline">
                    Transaction
                    <span className="pl-2 type--fade type--fine-print">
                      ({spentText})
                    </span>
                  </h4>
                </span>
              </div>
              <div className="card__meta">
                <span className="pl-3">
                  Block
                  <Link to={`/block/${tx.blockNumber}`}>
                    <code className="pl-2 type--bold">#{tx.blockNumber}</code>
                  </Link>
                </span>
              </div>
            </div>
            <div className="card__body">
              <strong>Transaction Hash:</strong>
              <p className="type--fade type--fine-print tx-hex">{tx.hash}</p>

              <strong>Owner:</strong>
              <code className="d-block type--fine-print pb-5">
                {tx.newOwner}
              </code>

              <div className="row px-3 px-sm-3 px-md-0">
                <div className="col-md-4">
                  <span>
                    <strong className="pr-2">Amount:</strong>
                    <span className="color--dark">{tx.denomination}</span>
                    <span className="type--fade type--fine-print pl-1">
                      ETH
                    </span>
                  </span>
                </div>
                <div className="col-md-4">
                  <strong className="pr-2">Slot:</strong>
                  {tx.slot}
                </div>
                <div className="col-md-4">
                  <strong className="pr-2">Previous Block:</strong>
                  <Link to={`/block/${tx.prevBlockNumber}`}>
                    <code>#{tx.prevBlockNumber}</code>
                  </Link>
                </div>
              </div>
            </div>
            <div className="card__bottom">
              <ul className="list-inline">
                <li className="list-inline-item">
                  <div className="card__action">
                    <i className="icon-Link" />
                    <CopyToClipboardButton
                      textToCopy={absoluteTxUrl}
                      title="Copy Link"
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

TxDetails = connect(state => ({
  txns: state.explorer.txns
}))(TxDetails);

export default TxDetails;
