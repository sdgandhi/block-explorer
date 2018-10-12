import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import logoSymbol from "../../images/logo_symbol.png";
import CopyToClipboardButton from "../CopyToClipboardButton";
import ElphUtils from "../../utils/ElphUtils";
import BlockLink from "../block/BlockLink";
import "../../styles/TxDetails.scss";

class TxCard extends PureComponent {
  static propTypes = {
    tx: PropTypes.shape({
      hash: PropTypes.string.isRequired,
      blockNumber: PropTypes.number.isRequired,
      denomination: PropTypes.number.isRequired,
      prevBlockNumber: PropTypes.number.isRequired,
      slot: PropTypes.number.isRequired,
      newOwner: PropTypes.string.isRequired,
      spent: PropTypes.bool.isRequired
    }).isRequired
  };

  render() {
    const { tx } = this.props;
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
                <span>
                  <span className="pr-2">Block</span>
                  <BlockLink blockNumber={tx.blockNumber} />
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
                  <BlockLink blockNumber={tx.prevBlockNumber} />
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

export default TxCard;
