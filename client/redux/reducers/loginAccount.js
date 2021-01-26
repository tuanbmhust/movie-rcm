import * as ActionTypes from "../actions/ActionTypes";
import Cookies from 'js-cookie';

const temp = {
  username: "tuanbmhust",
  // password: '12345678'
  token: "123qerasdzc",
  moviesLiked: 5,
};

const currentAccount =
  Cookies.get("account") == null ? null : JSON.parse(Cookies.get("account"));

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

      case ActionTypes.REGISTER_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.REGISTER_SUCCESSFULLY:
      return { ...state, account: action.payload, errMess: null };

    case ActionTypes.LOGOUT_SUCCESSFULLY:
      return { ...state, account: null };

    default:
      return state;
  }
};
