import React, { Component } from "react";
import "./App.css";

class Home extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <section className="text-center">
        <div className="container">
          <div className="row">
            <div className="col-12">Hello World</div>
          </div>
        </div>
      </section>
    );
  }
}

export default Home;
