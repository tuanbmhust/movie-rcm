import React, { Component, useState } from "react";
import "./Login.scss";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { postRegister } from "../redux/actions/ActionCreators";
import { connect } from "react-redux";
import { Redirect } from "react-router";

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister(event) {
    event.preventDefault();
    const username = this.username.value;
    const password = this.password.value;
    const repassword = this.repassword.value;
    if (username === "" || password === "") {
      alert("EMPTY USERNAME OR PASSWORD");
    } else if (password !== repassword) {
      alert("PASSWORDS DO NOT MATCH");
    } else {
      const registerDetails = {
        username: this.username.value,
        password: this.password.value,
        // repassword: this.repassword.value,
      };
      // alert(JSON.stringify(registerDetails));
      this.props.postRegister(registerDetails);
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
          <Form onSubmit={this.handleRegister}>
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
            <FormGroup>
              {errMess != null && (
                <Label className="text-danger mt-2">{errMess}</Label>
              )}
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

const mapStateToProps = (state) => {
  return {
    loginAccount: state.loginAccount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postRegister: (registerDetails) => dispatch(postRegister(registerDetails)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
