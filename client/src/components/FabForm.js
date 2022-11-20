import React from "react";
import PropTypes from "prop-types";
import "../stylesheets/fabForm.css";

function FabForm() {
  return (
    <div className="floatingButtonWrap">
      <div className="floatingButtonInner">
        <a href="#" className="floatingButton">
          <i className="fa fa-plus icon-default"></i>
        </a>

        <ul className="floatingMenu">
          <li>
            <a href="#">Add Record</a>
          </li>
        </ul>

        <div className="fab-wrapper">
          <div id="fab-hdr">
            <h1>FAB to Modal Window</h1>
          </div>

          <form className="material-form" ng-controller="UserLogin">
            <div className="material-input">
              <input type="text" ng-model="site.name" required />
              <label>Name</label> <span></span>
            </div>

            <div className="material-input">
              <input type="text" ng-model="site.name" required />
              <label>Email</label> <span></span>
            </div>

            <div className="material-input">
              <input type="text" ng-model="user.password" required />
              <label>Site</label> <span></span>
            </div>
          </form>

          <div className="btn-wrapper">
            <a href="#" type="button" className="btn" id="submit">
              Add
            </a>
            <a href="#" className="btn" id="cancel">
              Cancel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FabForm;
