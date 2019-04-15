import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import SignUp from "./components/signup";
import SignIn from "./components/signin";
import Groups from "./components/groups";
import Dashboard from "./components/dashboard";

ReactDOM.render(
  <Router>
    <React.Fragment>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/groups" component={Groups} />
    </React.Fragment>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
