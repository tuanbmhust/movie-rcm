import React, { Component } from "react";
import AppCss from "./App.scss";
import Movies from "./Movies";
import Movie from "./Movie";
import Search from "./Search";
import Account from "./Account";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { Popular } from "./MainContent/Popular";
import { TopRated } from "./MainContent/TopRated";
import { NewRelease } from "./MainContent/NewRelease";
import { RecommendForYou } from "./MainContent/RecommendForYou";

const Child = ({ match }) => <Movie id={match.params.id} />;

class App extends Component {
  tryParseJSON(jsonString) {
    try {
      var o = JSON.parse(jsonString);

      // Handle non-exception-throwing cases:
      // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
      // but... JSON.parse(null) returns null, and typeof null === "object",
      // so we must check for that, too. Thankfully, null is falsey, so this suffices:
      if (o && typeof o === "object") {
        return o;
      }
    } catch (e) { }

    return false;
  }

  render() {
    var account = null;
    var account = this.tryParseJSON(localStorage.getItem("account"));

    console.log(account);

    return (
      <Router>
        <div className="router-container">
          <Link className="top-bar-brand" to="/">
            Elastic Movies
          </Link>
          <nav className="top-bar">
            <div className="search-and-account" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
              <div className="search" style={{ flexGrow: "1" }}>
                <Search />
              </div>
              <div className="account" style={{ flexShrink: "0" }}>
                <Account></Account>
              </div>
            </div>
          </nav>
          <aside className="aside">
            <ul className="aside__nav">
              <li>
                <Link className="aside__nav__item aside__nav__item--popular" to="/">
                  Popular
                </Link>
              </li>
              <li>
                <Link className="aside__nav__item aside__nav__item--top-rated" to="/top-rated">
                  Top rated
                </Link>
              </li>
              <li>
                <Link className="aside__nav__item aside__nav__item--new-release" to="/new-release">
                  New release
                </Link>
              </li>
              <li>
                <Link className="aside__nav__item aside__nav__item--recommend-for-you" to="/recommend-for-you">
                  Recommend for you
                </Link>
              </li>
            </ul>
          </aside>
          <Route exact path="/" component={Popular} />
          <Route path="/top-rated" component={TopRated} />
          <Route path="/new-release" component={NewRelease} />
          <Route path="/recommend-for-you" component={RecommendForYou} />
          <Route path="/movies/:id" component={Child} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </div>
      </Router>
    );
  }
}

export default App;
