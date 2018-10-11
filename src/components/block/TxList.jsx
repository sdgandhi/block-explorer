import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../../styles/TxList.scss";
import Link from "react-router-dom/Link";

class TxList extends PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    txHashes: PropTypes.arrayOf(PropTypes.string).isRequired,
    txns: PropTypes.objectOf(
      PropTypes.shape({
        hash: PropTypes.string.isRequired,
        blockNumber: PropTypes.number.isRequired,
        slot: PropTypes.number.isRequired,
        newOwner: PropTypes.string.isRequired,
        spent: PropTypes.bool.isRequired
      })
    ).isRequired
  };

  clickedTx(tx) {
    this.props.history.push(`/tx/${tx.hash}`);
  }

  render() {
    const txns = this.props.txHashes.map(hash => this.props.txns[hash]);

    return (
      <div>
        <div className="transaction-header">
          <div className="row mx-0 w-100 px-3 px-md-0">
            <div className="col-md-4 col-sm-4 col-8 pr-sm-5">
              <strong className="color--dark">Owner</strong>
            </div>
            <div className="col-md-2 col-sm-3 d-none d-sm-block">
              <strong className="color--dark">Amount</strong>
            </div>
            <div className="col-md-2 d-none d-md-block">
              <strong className="color--dark">Slot</strong>
            </div>
            <div className="col-md-4 col-sm-5 d-none d-sm-block">
              <strong className="color--dark">Previous Block</strong>
            </div>
          </div>
        </div>

        {txns.map(tx => (
          <div
            key={tx.hash}
            className="transaction-row"
            onClick={() => {
              this.clickedTx(tx);
            }}
          >
            <div className="row mx-0 w-100 px-3 px-md-0">
              <div className="col-md-4 col-sm-4 col-8 pr-sm-5">
                <p className="tx-hex type--fine-print">{tx.newOwner}</p>
              </div>
              <div className="col-md-2 col-sm-3 d-none d-sm-block">
                <p>
                  <strong className="mr-2">{tx.denomination}</strong>
                  <span className="type--fade">ETH</span>
                </p>
              </div>
              <div className="col-md-2 d-none d-md-block">
                <p>{tx.slot}</p>
              </div>
              <div className="col-md-2 col-sm-3 d-none d-sm-block">
                <Link to={`/block/${tx.prevBlockNumber}`}>
                  <code>#{tx.prevBlockNumber}</code>
                </Link>
              </div>
              <div className="col-md-2 col-sm-2 col-4">
                {tx.spent ? (
                  <p className="float-right type--fine-print color--success">
                    Spent!
                  </p>
                ) : (
                  <p className="float-right type--fine-print type--fade">
                    Unspent
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

TxList = connect(state => ({
  txns: state.explorer.txns
}))(TxList);

export default withRouter(TxList);
