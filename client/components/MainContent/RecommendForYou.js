import React, { useMemo } from "react";
import { connect } from "react-redux";
import { getRecommendIdList } from "../../redux/actions/ActionCreators";
import Movies from "../Movies";

const Message = (props) => {
  return <h3>{props.message}</h3>;
};

const Content = (props) => {
  console.log("prpr" + props.ids);
  if (props.account) {
    if (props.account.moviesLiked < 5) {
      const message = "You must like at least 5 movies to see this content";
      return <Message message={message} />;
    } else {
      return (
        <React.Fragment>
          <div className="app">
            <div className="app__header">
              <h1>Recommend For You</h1>
            </div>
          </div>
          {props.ids.length > 0 && <Movies ids={props.ids} />}
        </React.Fragment>
      );
    }
  } else {
    const message = "You must log in to see this content";
    return (
      <div className="col-12 col-sm-8 offset-sm-2">
        <Message message={message} />
      </div>
    );
  }
};

const RecommendForYou = (props) => {
  const ids = useMemo(() => {
    props.getRecommendIdList(props.account);
    return props.recommend;
  }, [props.recommend.length]);
  // console.log(ids);
  return (
    <div className="container">
      <Content account={props.account} ids={ids} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    // loginAccount: state.loginAccount,
    account: state.loginAccount.account,
    recommend: state.movies.recommend,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRecommendIdList: (account) => dispatch(getRecommendIdList(account)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecommendForYou);
