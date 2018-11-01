import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../../styles/TxList.scss";
import { fetchBlock } from "../../redux/_elph";

const getAmount = tx => {
  const amount = tx.denomination / 10 ** 18;
  return Math.round(amount * 10000) / 10000;
};

class TxList extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    blocks: PropTypes.objectOf(
      PropTypes.shape({
        number: PropTypes.number.isRequired,
        hash: PropTypes.string.isRequired,
        txHashes: PropTypes.arrayOf(PropTypes.string).isRequired
      }).isRequired
    ).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    txHashes: PropTypes.arrayOf(PropTypes.string).isRequired,
    txns: PropTypes.objectOf(
      PropTypes.shape({
        hash: PropTypes.string.isRequired,
        blockNumber: PropTypes.string.isRequired,
        slot: PropTypes.string.isRequired,
        newOwner: PropTypes.string.isRequired,
        spent: PropTypes.bool.isRequired
      })
    ).isRequired
  };

  componentDidMount() {
    const txHashes = this.props.txHashes;
    const txns = this.props.txns;
    const prevBlockNumbers = new Set(
      txHashes.map(hash => txns[hash].prevBlockNumber)
    );
    prevBlockNumbers.forEach(blockNumber =>
      this.props.dispatch(fetchBlock(blockNumber))
    );
  }

  getFrom(tx) {
    const prevBlock = this.props.blocks[tx.prevBlockNumber];
    if (!prevBlock) {
      return "...";
    }

    const slot = tx.slot;
    const prevTxns = prevBlock.txHashes.map(txHash => this.props.txns[txHash]);
    const prevTx = prevTxns.find(t => t.slot === slot);
    const prevOwner = prevTx.newOwner;
    return prevOwner;
  }

  clickedTx(tx) {
    this.props.history.push(`/tx/${tx.blockNumber}/${tx.hash}`);
  }

  render() {
    const txns = this.props.txHashes.map(hash => this.props.txns[hash]);

    return (
      <div>
        <div className="transaction-header">
          <div className="row mx-0 w-100 px-3 px-md-0">
            <div className="col-lg-2 col-md-2 d-none d-sm-block">
              <strong className="color--dark">Amount</strong>
            </div>
            <div className="col-lg-4 col-md-5 d-none d-sm-block">
              <strong className="color--dark">From</strong>
            </div>
            <div className="col-lg-4 col-md-5 d-none d-sm-block">
              <strong className="color--dark">To</strong>
            </div>
            <div className="col-lg-2 d-none d-lg-block">
              <strong className="color--dark">Slot</strong>
            </div>
            <div className="d-block d-sm-none">
              <strong className="color--dark">Transactions</strong>
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
              <div className="col-lg-2 col-md-2">
                <p>
                  <strong className="mr-2">{getAmount(tx)}</strong>
                  <span className="type--fade">ETH</span>
                </p>
              </div>
              <div className="col-lg-4 col-md-5 d-none d-sm-block">
                <p className="tx-hex type--fine-print">{this.getFrom(tx)}</p>
              </div>
              <div className="d-block d-sm-none">
                <p className="tx-hex type--fine-print">
                  <strong>From: </strong>
                  {this.getFrom(tx)}
                </p>
              </div>
              <div className="col-lg-4 col-md-5 d-none d-sm-block">
                <p className="tx-hex type--fine-print">{tx.newOwner}</p>
              </div>
              <div className="d-block d-sm-none">
                <p className="tx-hex type--fine-print">
                  <strong>To: </strong>
                  {tx.newOwner}
                </p>
              </div>
              <div className="col-lg-2 d-none d-lg-block">
                <p className="tx-hex type--fine-print">{tx.slot}</p>
              </div>
              <div className="d-block d-sm-none">
                <p className="tx-hex type--fine-print">
                  <strong>Slot: </strong>
                  {tx.slot}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

TxList = connect(state => ({
  blocks: state.elph.blocks,
  txns: state.elph.txns
}))(TxList);

export default withRouter(TxList);
