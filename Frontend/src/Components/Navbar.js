import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navheader">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"./Login"} className="nav-link">
                Logga in
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"./Signup"} className="nav-link">
                Bli medlem
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default Navbar;
