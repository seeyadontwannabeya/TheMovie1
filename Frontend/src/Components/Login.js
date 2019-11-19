import React, { Component } from "react";
import "../App.css";
import {
  Button,
  Card,
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
class Login extends Component {
  constructor() {
    super();

    this.state = {
      Email: "",
      Password: "",
      isLoggedIn: false,
      bokningar: [],
      movieName: null
    };

    this.Password = this.Password.bind(this);
    this.Email = this.Email.bind(this);
    this.login = this.login.bind(this);
  }

  Email(event) {
    this.setState({ Email: event.target.value });
  }
  Password(event) {
    this.setState({ Password: event.target.value });
  }
  login(event) {
    fetch("https://localhost:44312/Api/login/Login", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Email: this.state.Email,
        Password: this.state.Password
      })
    })
      .then(Response => Response.json())
      .then(result => {
        console.log(result);
        if (result.Status == "Invalid") alert("Invalid User");
        else {
          this.setState({ isLoggedIn: true });
        }
      });
  }

  ShowBookings() {
    fetch("https://localhost:44312/api/bookings/visning", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Email: this.state.Email
      })
    })
      .then(Response => Response.json())
      .then(result => {
        this.setState({ bokningar: result });
      });
  }
  render() {
    if (this.state.isLoggedIn && this.state.bokningar.length < 1) {
      return (
        <div>
          <h1>Inloggad</h1>
          <button onClick={() => this.ShowBookings()}>
            Visa mina bokningar
          </button>
        </div>
      );
    }
    if (this.state.isLoggedIn && this.state.bokningar.length > 0) {
      return (
        <div>
          <h4>Du har {this.state.bokningar.length} bokning /ar!</h4>
          {this.state.bokningar.map(bokning => (
            <div>
              <p>TMDB ID {bokning.tmdbID}</p>
              <p>Filmnamn {bokning.movieName}</p>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="9" lg="7" xl="6">
                <CardGroup>
                  <Card className="p-2">
                    <CardBody>
                      <Form>
                        <div class="row" className="mb-2 pageheading">
                          <div class="col-sm-12 btn btn-primary">Login</div>
                        </div>
                        <InputGroup className="mb-3">
                          <Input
                            type="text"
                            onChange={this.Email}
                            placeholder="Email"
                          />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <Input
                            type="password"
                            onChange={this.Password}
                            placeholder="Lösenord"
                          />
                        </InputGroup>
                        <Button onClick={this.login} color="success" block>
                          Logga in
                        </Button>
                      </Form>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}

export default Login;
