import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "../styles/Login.scss";

class Login extends PureComponent {
  static propTypes = {
    login: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      password: "",
      error: ""
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const { password } = this.state;
    if (!this.props.login(password)) {
      const error = "Incorrect password, please try again.";
      this.setState({ error, password: "" });
    }
  }

  handleChange(e) {
    const password = e.target.value;
    this.setState({ password });
  }

  render() {
    const { password, error } = this.state;

    return (
      <div className="login d-flex flex-column justify-content-center align-items-center">
        <div className="password-form boxed boxed--border boxed--lg box-shadow mx-3">
          <h3>Enter Password to Proceed</h3>
          <p>Please enter your password to view this app. Contact us to request access.</p>
          <form onSubmit={e => this.onSubmit(e)} className="row">
            <div className="col-lg-8 mb-0">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <div className="col-lg-4 mt-0">
              <button type="submit" className="btn btn--primary type--uppercase">
                Submit
              </button>
            </div>
          </form>
          <p
            className={`password-error pt-3 type--bold type--fine-print color--error ${
              error ? "visible" : "invisible"
            }`}
          >
            {error}
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
