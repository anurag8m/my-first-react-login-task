import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import HomePage from "./components/home.component.js";
import AboutPage from "./components/about.component.js";
import ContactPage from "./components/contact.component.js";
import LoginPage from "./components/login.component.js";
import RegisterPage from "./components/register.component.js";
import ProfilePage from "./components/profile.component.js";
import Header from "./components/header.component.js";
import TasklistPage from "./components/tasklist.component.js";
import CreateTodoPage from "./components/createtodo.component.js";
import EditTodoPage from "./components/edittodo.component.js";
import PrivateRoute from "./components/private-route/PrivateRoute";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Header />
          <Route path="/" exact component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Switch>
            <PrivateRoute path="/profile" component={ProfilePage} />
            <PrivateRoute path="/tasklist" component={TasklistPage} />
            <PrivateRoute path="/createtodo" component={CreateTodoPage} />
            <PrivateRoute path="/edit/:id" component={EditTodoPage} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
