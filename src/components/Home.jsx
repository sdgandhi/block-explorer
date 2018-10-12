import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { CSSTransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import BlockCard from "./block/BlockCard.jsx";
import "../styles/Home.css";

class Home extends PureComponent {
  static propTypes = {
    blocks: PropTypes.objectOf(
      PropTypes.shape({
        number: PropTypes.number.isRequired,
        hash: PropTypes.string.isRequired,
        txHashes: PropTypes.arrayOf(PropTypes.string).isRequired
      }).isRequired
    ).isRequired
  };

  render() {
    const { blocks } = this.props;
    const blocksToDisplay = Object.values(blocks).sort(
      (a, b) => a.number < b.number
    );

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
                <p className="lead">Transactions since visting: 1,412</p>
              </div>
              <CSSTransitionGroup
                transitionName="blocks"
                transitionEnterTimeout={700}
                transitionLeaveTimeout={700}
              >
                {blocksToDisplay.map(block => (
                  <BlockCard key={block.number} block={block} />
                ))}
              </CSSTransitionGroup>
            </div>
            <div className="col-sm-6 col-12">
              <div className="switchable__text mb-5">
                <h2>
                  Ethereum
                  <br className="hidden-xs hidden-sm" /> is slow
                </h2>
                <p className="lead">Transactions since visting: 245</p>
              </div>
              <CSSTransitionGroup
                transitionName="ethereumBlocks"
                transitionEnterTimeout={700}
                transitionLeaveTimeout={700}
              >
                {blocksToDisplay.map(block => (
                  <BlockCard key={block.number} block={block} />
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
  blocks: state.elph.blocks
}))(Home);

export default Home;
