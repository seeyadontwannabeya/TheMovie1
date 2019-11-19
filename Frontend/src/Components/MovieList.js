import React, { Component } from "react";
import Booking from "./Booking";
import {
  Button,
  Card,
  CardFooter,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = { result: [], loaded: false, Email: "" };

    this.Email = this.Email.bind(this);
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies = async () => {
    await fetch("https://localhost:44312/api/movies/getmovieshows")
      .then(response => response.json())
      .then(data => this.setState({ result: data.data, loaded: true }));
    // console.log(this.state.result);
  };
  handleClick = () => {};

  Email = event => {
    this.setState({ Email: event.target.value });
  };
  Password = event => {
    this.setState({ Password: event.target.value });
  };
  MovieID = event => {
    this.setState({ MovieID: event.target.value });
  };
  booking(visningsId) {
    console.log(visningsId);
    fetch("https://localhost:44312/api/Bookings", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Email: this.state.Email,
        visningsID: visningsId,
        seats: 1
      })
    })
      .then(Response => Response.json())
      .then(Result => {
        if (Result.Status == "Success") {
          alert("Bokning slutförd");
          window.location.reload(false);
        } else alert("Något gick fel");
      });
  }

  render() {
    return (
      <div>
        <div>
          <div>Visnings</div>
          {this.state.loaded ? (
            this.state.result !== null && this.state.result !== undefined ? (
              <div>
                {" "}
                {this.state.result !== undefined && this.state.result !== null
                  ? this.state.result.map(item => (
                      <div>
                        <a>
                          id={item.id} * Datum = {item.tidpunkt} **Filmnamn ={" "}
                          {item.movieName} **Tillgängliga sittplatser ={" "}
                          {item.TotalSeats - item.ReservedSeats}{" "}
                          {/* <img alt="poster" width="80" src={item.poster_path} />{" "} */}
                        </a>
                        <div>
                          {" "}
                          <div>Bokning för film: {item.MovieName}</div>
                          <InputGroup className="mb-3">
                            <Input
                              type="text"
                              onChange={this.Email}
                              placeholder="Email"
                            />
                          </InputGroup>
                          <Button
                            onClick={() => this.booking(item.id)}
                            color="success"
                            block
                          >
                            Boka
                          </Button>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            ) : null
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    );
  }
}

export default MovieList;
