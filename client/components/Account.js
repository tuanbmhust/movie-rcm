import React, { Component, useState } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
} from "reactstrap";
import { postLogout } from "../redux/actions/ActionCreators";

function LogoutButton(props) {
  const account = props.account;
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const logout = () => {
    console.log(`logout: ${JSON.stringify(account)}`);
    // props.postLogout();
  };

  return (
    <Nav navbar className="ml-auto">
      <Dropdown
        nav
        isOpen={isProfileDropdownOpen}
        toggle={toggleProfileDropdown}
      >
        <DropdownToggle nav caret>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
            <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            <path
              fill-rule="evenodd"
              d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
            />
          </svg>{" "}
          {account.username}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>
            <Link to={`/login`} onClick={logout}>
              Logout
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Nav>
  );
}

const LoginOrLogout = (props) => {
  const account = props.account;

  if (account != null) {
    return (
      <LogoutButton account={props.account} postLogout={props.postLogout} />
    );
  }
  return (
    <div>
      <Button className="mx-2" tag={Link} to="/register">
        Sign Up
      </Button>
      <Button className="mx-2" tag={Link} to="/login">
        Sign In
      </Button>
    </div>
  );
};

class Account extends Component {
  render() {
    return (
      <div>
        <LoginOrLogout
          account={this.props.loginAccount.account}
          postLogout={this.props.postLogout}
        />
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
    postLogout: () => dispatch(postLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
