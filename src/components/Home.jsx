import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { CSSTransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { ClipLoader } from "react-spinners";
import BlockCard from "./block/BlockCard.jsx";

const START_TIME = Date.now();

const getAverageTps = txCount => {
  const currentTime = Date.now();
  const duration = (currentTime - START_TIME) / 1000;
  return Math.round(txCount / duration);
};

const getSortedBlockList = (blocks, key) => Object.values(blocks).sort((a, b) => b[key] - a[key]);

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
    ).isRequired,
    pollForNewBlocks: PropTypes.bool.isRequired
  };

  render() {
    const { blocks, ethblocks, txCountSinceVisiting, ethTxCountSinceVisiting, pollForNewBlocks } = this.props;

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
                <h2>Elph Testnet</h2>
                <div>
                  <p className="lead mb-0 d-inline-block">
                    Transactions since visting: {txCountSinceVisiting}
                    <span className="pl-3 type--fade type--fine-print">({tps} TPS)</span>
                  </p>
                  {pollForNewBlocks && (
                    <span className="pl-3 d-inline-block">
                      <div className="d-flex flex-row align-items-center">
                        <ClipLoader color="#7adfbb" loading size={15} />
                      </div>
                    </span>
                  )}
                </div>
                <span className="type--fade type--fine-print">
                  Current Load: {Math.round((tps * 100) / 6000)}
                  %. Theoretical Max: ~6000 TPS
                </span>
              </div>
              {blocksToDisplay.length === 0 && (
                <div className="pt-5 text-center">
                  <p className="mb-3 type--fade type--fine-print">Waiting for new blocks...</p>
                  <span>
                    <ClipLoader color="#7adfbb" loading />
                  </span>
                </div>
              )}
              <CSSTransitionGroup transitionName="example" transitionEnterTimeout={700} transitionLeaveTimeout={700}>
                {blocksToDisplay.map(block => (
                  <BlockCard key={`${block.number}`} block={block} />
                ))}
              </CSSTransitionGroup>
            </div>
            <div className="col-sm-6 col-12">
              <div className="switchable__text mb-5">
                <h2>Ethereum Mainnet</h2>
                <div>
                  <p className="lead mb-0 d-inline-block">
                    Transactions since visting: {ethTxCountSinceVisiting}
                    <span className="pl-3 type--fade type--fine-print">({ethTps} TPS)</span>
                  </p>
                  <span className="pl-3 d-inline-block">
                    <div className="d-flex flex-row align-items-center">
                      <ClipLoader color="#7adfbb" loading size={15} />
                    </div>
                  </span>
                </div>
                <span className="type--fade type--fine-print">
                  Current Load: {Math.round((ethTps * 100) / 15)}
                  %. Theoretical Max: ~15 TPS
                </span>
              </div>
              {ethBlocksToDisplay.length === 0 && (
                <div className="pt-5 text-center">
                  <p className="mb-3 type--fade type--fine-print">Waiting for new Ethereum blocks...</p>
                  <span>
                    <ClipLoader color="#7adfbb" loading />
                  </span>
                </div>
              )}
              <CSSTransitionGroup transitionName="example" transitionEnterTimeout={700} transitionLeaveTimeout={700}>
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
  ethTxCountSinceVisiting: state.eth.txCountSinceVisiting,
  pollForNewBlocks: state.elph.pollForNewBlocks
}))(Home);

export default Home;
