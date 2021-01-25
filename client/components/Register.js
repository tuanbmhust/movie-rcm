import React, { Component, useState } from "react";
import "./Login.scss";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

var axios = require("axios");

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();
    const username = this.username.value;
    const password = this.password.value;
    const repassword = this.repassword.value;
    if (username === "" || password === "") {
      alert("EMPTY USERNAME OR PASSWORD");
    } else if (password !== repassword) {
      alert("PASSWORDS DO NOT MATCH");
    } else {
      const loginDetails = {
        username: this.username.value,
        password: this.password.value,
        repassword: this.repassword.value,
      };
      alert(JSON.stringify(loginDetails));
      //   this.props.postLogin(loginDetails);
    }
  }

  render() {
    return (
      <div className="container">
        <div className="col-12 col-sm-6 offset-sm-3 mt-5">
          <Form onSubmit={this.handleLogin}>
            <FormGroup className="mt-2">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                innerRef={(input) => (this.username = input)}
              />
            </FormGroup>
            <FormGroup className="mt-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                innerRef={(input) => (this.password = input)}
              />
            </FormGroup>
            <FormGroup className="mt-2">
              <Label htmlFor="repassword">Re-enter Password</Label>
              <Input
                type="password"
                id="repassword"
                name="repassword"
                innerRef={(input) => (this.repassword = input)}
              />
            </FormGroup>
            <Button className="mt-2" type="submit">
              Register
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
