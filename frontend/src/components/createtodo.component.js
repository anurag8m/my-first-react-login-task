import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import classnames from "classnames";
import FooterPage from "./footer.component.js";

class CreateTodoPage extends Component {
  constructor() {
    super();
    this.onChangeToDoDescription = this.onChangeToDoDescription.bind(this);
    this.onChangeToDoResponsible = this.onChangeToDoResponsible.bind(this);
    this.onChangeToDoPriority = this.onChangeToDoPriority.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: false,
      errors: {}
    };
  }
  onChangeToDoDescription(e) {
    this.setState({
      todo_description: e.target.value
    });
  }

  onChangeToDoResponsible(e) {
    this.setState({
      todo_responsible: e.target.value
    });
  }

  onChangeToDoPriority(e) {
    this.setState({
      todo_priority: e.target.value
    });
  }

  onSubmit = e => {
    e.preventDefault();
    console.log("Form Submitted : ");
    console.log(`Todo Description : ${this.state.todo_description}`);
    console.log(`Todo Responsible : ${this.state.todo_responsible}`);
    console.log(`Todo Priority : ${this.state.todo_priority}`);
    console.log(`Todo Completed : ${this.state.todo_completed}`);
    this.setState = {
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: false,
      errors: {}
    };
  };

  render() {
    const { user } = this.props.auth;
    const { errors } = this.state;
    return (
      <div>
        <h2 className="bg-2 about-title">Create TaskList</h2>
        <div className="container-fluid">
          <div className="row">
            <div className="offset-sm-3 col-md-6">
              <div className="well well-sm">
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="description">Descripiton</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <span className="glyphicon glyphicon-envelope" />
                          </span>
                          <input
                            onChange={this.onChangeToDoDescription}
                            value={this.state.todo_description}
                            error={errors.todo_description}
                            id="todo_description"
                            name="todo_description"
                            type="text"
                            className={classnames("form-control", {
                              invalid: errors.todo_description
                            })}
                          />
                          <span className="errorMessage">
                            {errors.todo_description}
                          </span>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="responsible">Responsible</label>
                        <input
                          onChange={this.onChangeToDoResponsible}
                          value={this.state.todo_responsible}
                          error={errors.todo_responsible}
                          id="todo_responsible"
                          name="todo_responsible"
                          type="text"
                          className={classnames("form-control", {
                            invalid: errors.todo_responsible
                          })}
                        />
                        <span className="errorMessage">
                          {errors.todo_responsible}
                        </span>
                      </div>

                      <div className="form-group">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="priorityOptions"
                            id="priorityLow"
                            value="Low"
                            checked={this.state.todo_priority === "Low"}
                            onChange={this.onChangeToDoPriority}
                          />
                          <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="priorityOptions"
                            id="priorityMedium"
                            value="Medium"
                            checked={this.state.todo_priority === "Medium"}
                            onChange={this.onChangeToDoPriority}
                          />
                          <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="priorityOptions"
                            id="priorityHigh"
                            value="High"
                            checked={this.state.todo_priority === "High"}
                            onChange={this.onChangeToDoPriority}
                          />
                          <label className="form-check-label">High</label>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <button
                        type="submit"
                        className="btn btn-primary pull-right"
                        id="btnContactUs"
                      >
                        Create Todo
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

CreateTodoPage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(CreateTodoPage);
