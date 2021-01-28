import * as ActionTypes from "../actions/ActionTypes";

export const Movie = (
  state = {
    movieid: null,
    react: 0,
    voteState: 0,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.GET_REACT_SUCCESSFULLY:
      return {
        ...state,
        movieid: action.payload.movieid,
        react: action.payload.react,
        voteState: action.payload.voteState,
        errMess: null,
      };

    default:
      return state;
  }
};
