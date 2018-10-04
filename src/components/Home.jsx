import React, { Component } from "react";
import PropTypes from "prop-types";
import { CSSTransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import Block from "./Block.jsx";
import "../styles/Home.css";
import { fetchLatestBlock } from "../redux/_explorer";

class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    elph: PropTypes.shape({
      blocks: PropTypes.arrayOf(
        PropTypes.shape({
          number: PropTypes.number.isRequired,
          hash: PropTypes.string.isRequired,
          transactions: PropTypes.arrayOf(
            PropTypes.shape({
              hash: PropTypes.string.isRequired
            }).isRequired
          ).isRequired
        }).isRequired
      ).isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);
    console.log("props: ", props);
  }

  componentDidMount() {
    this.props.dispatch(fetchLatestBlock());
  }

  render() {
    const that = this;

    return (
      <section className="switchable switchable--switch">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-sm-6 col-12">
              <div className="switchable__text">
                <a
                  href="#"
                  className="hamburger-toggle"
                  data-toggle-class="#menu3;hidden-xs hidden-sm"
                  onClick={() => {
                    const old = that.props.elph.blocks;
                    old.unshift({
                      number: Math.round(Math.random() * 100000),
                      hash: "0xwefadsfasd",
                      transactions: [
                        {
                          hash: "0xasdf"
                        }
                      ]
                    });
                    console.log(
                      "old",
                      old,
                      "stateblocks",
                      that.props.elph.blocks
                    );
                    that.setState({ blocks: old });
                  }}
                >
                  Add Block
                </a>
                <h2>
                  Elph Blockchain
                  <br className="hidden-xs hidden-sm" /> is super fast
                </h2>
                <p className="lead">Transactions since visting: 1,412</p>
              </div>
              <CSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={700}
                transitionLeaveTimeout={700}
              >
                {this.props.elph.blocks.map(block => (
                  <Block key={block.number} block={block} />
                ))}
              </CSSTransitionGroup>
            </div>
            <div className="col-sm-6 col-12">
              <div className="switchable__text">
                <h2>
                  Ethereum
                  <br className="hidden-xs hidden-sm" /> is slow
                </h2>
                <p className="lead">Transactions since visting: 245</p>
              </div>
              <div className="bg--secondary boxed boxed--border boxed--lg" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Home = connect(state => ({
  elph: state.explorer.elph
}))(Home);

export default Home;
