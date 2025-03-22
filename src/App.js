import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import components

import Login from "./components/Auth/Login";
import Navbar from "./components/navbar.component";
import Sidebar from "./components/sidebar.component";
import Dashboard from "./components/dashboard.component";
import CreateTicket from "./components/create-ticket.component";
import CreateUser from "./components/create-user.component";
import ManageUsers from "./components/manage-users.component";
import ManageProjects from "./components/manage-projects.component";
import EditTicket from "./components/edit-ticket.component";
// import Signup from "./components/Auth/Signup";

// Protected Route component
const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <>
          <Navbar />
          <div className="wrapper">
            <Sidebar />
            <div id="content">
              <Component {...props} />
            </div>
          </div>
        </>
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  return (
    <Router>
      <Switch>
        <Route
          path="/login"
          render={(props) => 
            !isAuthenticated ? (
              <Login {...props} setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        
        <ProtectedRoute
          path="/"
          exact
          component={Dashboard}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute
          path="/tickets/create"
          component={CreateTicket}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute
          path="/manage-users"
          component={ManageUsers}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute
          path="/users/create"
          component={CreateUser}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute
          path="/manage-projects"
          component={ManageProjects}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute
          path="/edit/:id"
          component={EditTicket}
          isAuthenticated={isAuthenticated}
        />
      </Switch>
    </Router>
  );
}