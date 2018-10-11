import React, { Component } from "react";
import PropTypes from "prop-types";
import { CSSTransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import BlockCard from "./block/BlockCard.jsx";
import "../styles/Home.css";
import { fetchLatestBlocks } from "../redux/_explorer";

class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    explorer: PropTypes.shape({
      blocks: PropTypes.objectOf(
        PropTypes.shape({
          number: PropTypes.number.isRequired,
          hash: PropTypes.string.isRequired,
          txns: PropTypes.arrayOf(
            PropTypes.shape({
              hash: PropTypes.string.isRequired
            }).isRequired
          ).isRequired
        }).isRequired
      ).isRequired
    }).isRequired
  };

  componentDidMount() {
    this.props.dispatch(fetchLatestBlocks());
  }

  render() {
    const { blocks } = this.props.explorer;
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
  explorer: state.explorer
}))(Home);

export default Home;
