import * as ActionTypes from "../actions/ActionTypes";

const currentAccount = {
  username: "tuanbmhust",
  // password: '12345678'
  token: "123qerasdzc",
  moviesLiked: 5,
};

export const LoginAccount = (
  state = {
    account: currentAccount,
    errMess: null,
  },
  action
) => {
  // console.log(currentAccount);
  switch (action.type) {
    case ActionTypes.LOGIN_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.LOGIN_SUCCESSFULLY:
      return { ...state, account: action.payload, errMess: null };

    case ActionTypes.LOGOUT_SUCCESSFULLY:
      return { ...state, account: null };

    default:
      return state;
  }
};
