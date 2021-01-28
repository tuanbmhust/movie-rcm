import React, { Component, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { Button, Label } from "reactstrap";
import { getReact, postReact } from "../redux/actions/ActionCreators";
import "./Rating.scss";

const Rating = (props) => {
  const movieid = props.movieid;
  const account = props.loginAccount.account;
  // const [active, setActive] = useState();

  const vote = useMemo(() => {
    props.getReact(account, movieid);
    return props.movie.react;
  }, [props.movie.react]);

  const voteState = useMemo(() => props.voteState, [props.voteState]);

  const handleOnClick = (react) => {
    const reactDetails = { movie_id: movieid, react: react };
    props.postReact(account, reactDetails);
    window.location.reload(false);
  };

  return (
    <div className="rating">
      <Button className="m-2" onClick={() => handleOnClick(1)}>
        {voteState > 0 ? "LIKED" : "Like"}
      </Button>
      <Button className="m-2" onClick={() => handleOnClick(-1)}>
        {voteState < 0 ? "DISLIKED" : "Dislike"}
      </Button>
      <Label>React points: {vote}</Label>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loginAccount: state.loginAccount,
    movie: state.movie,
    voteState: state.movie.voteState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getReact: (account, movieid) => dispatch(getReact(account, movieid)),
    postReact: (account, reactDetails) =>
      dispatch(postReact(account, reactDetails)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rating);
