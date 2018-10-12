import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { CSSTransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import BlockCard from "./block/BlockCard.jsx";
import "../styles/Home.css";

const START_TIME = Date.now();

const getAverageTps = txCount => {
  const currentTime = Date.now();
  const duration = (currentTime - START_TIME) / 1000;
  return Math.round(txCount / duration);
};

const getSortedBlockList = (blocks, key) =>
  Object.values(blocks).sort((a, b) => b[key] - a[key]);

class Home extends PureComponent {
  static propTypes = {
    txCountSinceVisiting: PropTypes.number.isRequired,
    ethTxCountSinceVisiting: PropTypes.number.isRequired,
    blocks: PropTypes.objectOf(
      PropTypes.shape({
        number: PropTypes.number.isRequired,
        hash: PropTypes.string.isRequired,
        txHashes: PropTypes.arrayOf(PropTypes.string).isRequired
      }).isRequired
    ).isRequired,
    ethblocks: PropTypes.objectOf(
      PropTypes.shape({
        number: PropTypes.number.isRequired,
        hash: PropTypes.string.isRequired,
        txHashes: PropTypes.arrayOf(PropTypes.string).isRequired
      }).isRequired
    ).isRequired
  };

  render() {
    const {
      blocks,
      ethblocks,
      txCountSinceVisiting,
      ethTxCountSinceVisiting
    } = this.props;

    const blocksToDisplay = getSortedBlockList(blocks, "number");
    const ethBlocksToDisplay = getSortedBlockList(ethblocks, "minedAt");
    const tps = getAverageTps(txCountSinceVisiting);
    const ethTps = getAverageTps(ethTxCountSinceVisiting);

    return (
      <section className="switchable switchable--switch">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-sm-6 col-12">
              <div className="switchable__text mb-5">
                <h2>
                  Elph Blockchain
                  <br className="hidden-xs hidden-sm" /> is super fast
                </h2>
                <p className="lead">
                  Transactions since visting: {txCountSinceVisiting}
                  <span className="pl-3 type--fade type--fine-print">
                    ({tps} TPS)
                  </span>
                </p>
              </div>
              <CSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={700}
                transitionLeaveTimeout={700}
              >
                {blocksToDisplay.map(block => (
                  <BlockCard key={`${block.number}`} block={block} />
                ))}
              </CSSTransitionGroup>
            </div>
            <div className="col-sm-6 col-12">
              <div className="switchable__text mb-5">
                <h2>
                  Ethereum
                  <br className="hidden-xs hidden-sm" /> is slow
                </h2>
                <p className="lead">
                  Transactions since visting: {ethTxCountSinceVisiting}
                  <span className="pl-3 type--fade type--fine-print">
                    ({ethTps} TPS)
                  </span>
                </p>
              </div>
              <CSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={700}
                transitionLeaveTimeout={700}
              >
                {ethBlocksToDisplay.map(block => (
                  <BlockCard key={block.number} block={block} eth />
                ))}
              </CSSTransitionGroup>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Home = connect(state => ({
  blocks: state.elph.blocks,
  txCountSinceVisiting: state.elph.txCountSinceVisiting,
  ethblocks: state.eth.blocks,
  ethTxCountSinceVisiting: state.eth.txCountSinceVisiting
}))(Home);

export default Home;
