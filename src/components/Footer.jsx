import React, { PureComponent } from "react";

class Footer extends PureComponent {
  render() {
    return (
      <footer className="footer-7 text-center-xs">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              {" "}
              <span className="type--fine-print">
                © <span className="update-year" /> Elph — All Rights Reserved
              </span>
            </div>
            <div className="col-sm-6 text-right text-center-xs">
              <ul className="social-list list-inline">
                <li>
                  <a href="/">
                    <i className="socicon socicon-google icon icon--xs" />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="socicon socicon-twitter icon icon--xs" />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="socicon socicon-facebook icon icon--xs" />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="socicon socicon-instagram icon icon--xs" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
