import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";
import "./styles/Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      blocks: [
        {
          number: 12345,
          hash:
            "0xd8cfcdbc65a949f02444f0fe2997510489874ee7c34da55e45f27d167e374dc6"
        },
        {
          number: 87654,
          hash:
            "0xd8cfcdbc65a949f02444f0fe2997510489874ee7c34da55e45f27d167e374dc6"
        }
      ]
    };
  }

  render() {
    const that = this;

    return (
      <section className="switchable switchable--switch">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-6 col-lg-5">
              <div className="switchable__text">
                <a
                  href="#"
                  className="hamburger-toggle"
                  data-toggle-class="#menu3;hidden-xs hidden-sm"
                  onClick={() => {
                    const old = that.state.blocks;
                    old.unshift({ number: 452435, hash: "0xwefadsfasd" });
                    console.log("old", old, "stateblocks", that.state.blocks);
                    that.setState({ blocks: old });
                  }}
                >
                  Add Block
                </a>
                <h2>
                  Elph Blockchain
                  <br className="hidden-xs hidden-sm" /> is super fast
                </h2>
                <p className="lead">TPS: XXXXX, Block No: XXXX</p>
              </div>
              <CSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={700}
                transitionLeaveTimeout={700}
              >
                {this.state.blocks.map(block => (
                  <div
                    key={block.number}
                    className="bg--secondary boxed boxed--border boxed--lg"
                  >
                    <h4 style={{ display: "inline" }}>Block #{block.number}</h4>
                    <p className="type--fade type--fine-print">{block.hash}</p>
                    <p className="type--underline">Transactions</p>
                  </div>
                ))}
              </CSSTransitionGroup>
            </div>
            <div className="col-md-6">
              <div className="switchable__text">
                <h2>
                  Ethereum
                  <br className="hidden-xs hidden-sm" /> is slow
                </h2>
                <p className="lead">TPS: XXXXX, Block No: XXXX</p>
              </div>
              <div className="bg--secondary boxed boxed--border boxed--lg" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Home;
