import * as ActionTypes from "../actions/ActionTypes";

export const Movies = (
  state = {
    recommend: [],
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.GET_RECOMMEND_LIST_SUCCESSFULLY:
      return {
        ...state,
        recommend: action.payload,
        errMess: null,
      };

    default:
      return state;
  }
};
