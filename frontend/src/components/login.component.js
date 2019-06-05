import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";
import FooterPage from "./footer.component.js";
import LoadingSpinner from "./loadingspinner.component.js";

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      loading: false
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/profile"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    this.setState({
      loading: true
    });
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  render() {
    const { errors } = this.state;
    const { loading } = this.state;
    return (
      <div>
        <h2 className="bg-2 about-title">Login</h2>
        <div className="container-fluid">
          <div className="row">
            <div className="offset-sm-3 col-md-6">
              <div className="well well-sm">
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <span className="glyphicon glyphicon-envelope" />
                          </span>
                          <input
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            id="email"
                            type="email"
                            className={classnames("form-control", {
                              invalid: errors.email || errors.emailnotfound
                            })}
                          />
                          <span className="errorMessage">
                            {errors.email}
                            {errors.emailnotfound}
                          </span>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <span className="glyphicon glyphicon-envelope" />
                          </span>
                          <input
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            id="password"
                            type="password"
                            className={classnames("form-control", {
                              invalid:
                                errors.password || errors.passwordincorrect
                            })}
                          />
                          <span className="errorMessage">
                            {errors.password}
                            {errors.passwordincorrect}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <button
                        type="submit"
                        className="btn btn-primary pull-right"
                        id="btnContactUs"
                      >
                        {loading ? <LoadingSpinner /> : "Login"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <FooterPage />
      </div>
    );
  }
}

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(LoginPage);
