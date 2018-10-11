import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="height-70 text-center">
      <div className="container pos-vertical-center">
        <div className="row">
          <div className="col-md-12">
            <h1 className="h1--large">404</h1>
            <p className="lead">The page you were looking for was not found.</p>
            <Link to="/">Go back to the home page</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
