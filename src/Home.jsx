import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <section className="switchable switchable--switch">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-6 col-lg-5">
              <div className="switchable__text">
                <h2>
                  Elph Blockchain
                  <br className="hidden-xs hidden-sm" /> is super fast
                </h2>
                <p className="lead">TPS: XXXXX, Block No: XXXX</p>
              </div>
              <div className="bg--secondary boxed boxed--border boxed--lg" />
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
