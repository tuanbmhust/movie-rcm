import React, { Component, useState } from "react";
import "./Login.scss";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { postLogin } from "../redux/actions/ActionCreators";
import { connect } from "react-redux";
import { Redirect } from "react-router";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();
    const username = this.username.value;
    const password = this.password.value;
    if (username === "" || password === "") {
      alert("EMPTY USERNAME OR PASSWORD");
    } else {
      const loginDetails = {
        username: this.username.value,
        password: this.password.value,
      };
      this.props.postLogin(loginDetails);
      //   alert(JSON.stringify(loginDetails));
    }
  }

  render() {
    if (this.props.loginAccount.account != null) {
      return <Redirect to="/" />;
    }
    const errMess = this.props.loginAccount.errMess;
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
            <FormGroup>
              {errMess != null && (
                <Label className="text-danger mt-2">{errMess}</Label>
              )}
            </FormGroup>
            <Button className="mt-2" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginAccount: state.loginAccount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postLogin: (loginDetails) => dispatch(postLogin(loginDetails)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
