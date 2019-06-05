import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";
import FooterPage from "./footer.component.js";

class RegisterPage extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }
  }
  componentWillReceiveProps(nextProps) {
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
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <h2 className="bg-2 about-title">Register</h2>
        <div className="container-fluid">
          <div className="row">
            <div className="offset-sm-3 col-md-6">
              <div className="well well-sm">
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="first_name">Name</label>
                        <input
                          onChange={this.onChange}
                          value={this.state.name}
                          error={errors.name}
                          id="name"
                          type="text"
                          className={classnames("form-control", {
                            invalid: errors.name
                          })}
                        />
                        <span className="errorMessage">{errors.name}</span>
                      </div>

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
                              invalid: errors.email
                            })}
                          />
                          <span className="errorMessage">{errors.email}</span>
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
                              invalid: errors.password
                            })}
                          />
                          <span className="errorMessage">
                            {errors.password}
                          </span>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="password2">Confirm Password</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <span className="glyphicon glyphicon-envelope" />
                          </span>
                          <input
                            onChange={this.onChange}
                            value={this.state.password2}
                            error={errors.password2}
                            id="password2"
                            type="password"
                            className={classnames("form-control", {
                              invalid: errors.password2
                            })}
                          />
                          <span className="errorMessage">
                            {errors.password2}
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
                        Register
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

RegisterPage.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(RegisterPage));
