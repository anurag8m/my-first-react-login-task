import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import FooterPage from "./footer.component.js";

class ProfilePage extends Component {
  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <h2 className="bg-2 about-title">Profile</h2>
        <div className="container-fluid">
          <div className="row">
            <div className="offset-sm-2 col-md-8">
              <div className="well well-sm">
                <table className="table col-md-6 mx-auto">
                  <tbody>
                    <tr>
                      <td>First name</td>
                      <td>{user.name}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{user.email}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <FooterPage />
      </div>
    );
  }
}

ProfilePage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(ProfilePage);
