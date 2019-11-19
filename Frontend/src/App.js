import React, { Component } from "react";

import MovieSearch from "./Components/MovieSearch";
import Booking from "./Components/Booking";
import TestLista from "./Components/TestLista";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Reg from "./Components/Registration";
import Dashboard from "./Components/Dashboard";
import MovieList from "./Components/MovieList";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
class App extends Component {
  constructor() {
    super();
    this.state = { movieIdToBook: 0, showSearchMovie: true };
  }
  showBooking = id => {
    this.setState({ movieIdToBook: id, showSearchMovie: false });
  };

  render() {
    return (
      <>
        <Router>
          <div className="container">
            <nav className="navbar navbar-expand-lg navheader">
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to={"/Login"} className="nav-link">
                      Logga in
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/Signup"} className="nav-link">
                      Bli medlem
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>{" "}
            <br />
            <Switch>
              <Route exact path="/Login" component={Login} />
              <Route path="/Signup" component={Reg} />
            </Switch>
            <Switch>
              <Route path="/Dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>
        <div></div>
        <table className="titleBar">
          {/* */}
          <tbody>
            <tr>
              <td width="8" />
              <td>
                <h2>The Movie någonting</h2>
                <div>
                  {" "}
                  <MovieList />
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {this.state.showSearchMovie ? (
          <MovieSearch
            onMovieSelect={movieId => {
              this.setState({
                movieIdToBook: movieId,
                showSearchMovie: false
              });
            }}
          />
        ) : (
          <Booking movieID={this.state.movieIdToBook} />
        )}
      </>
    );
  }
}

export default App;
