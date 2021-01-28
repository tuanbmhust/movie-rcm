import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../../shared/baseUrl";
import qs from "qs";
import Cookies from "js-cookie";

/*////////////////////
LOGIN ACTIONS
////////////////////*/

export const loginSuccessfully = (account) => {
  return {
    type: ActionTypes.LOGIN_SUCCESSFULLY,
    payload: account,
  };
};

export const loginFailed = (errMess) => {
  return {
    type: ActionTypes.LOGIN_FAILED,
    payload: errMess,
  };
};

export const postLogin = (loginDetails) => (dispatch) => {
  const data = JSON.stringify(loginDetails);
  // alert(data);

  return fetch(baseUrl + "api/login/", {
    method: "POST",
    body: data,
    // mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(
      (response) => {
        if (response.ok || response.status === 400) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.token == null) {
        dispatch(loginFailed(response.non_field_errors));
      } else {
        const account = {
          username: loginDetails.username,
          token: response.token,
        };
        Cookies.set("account", account, { expires: 1 });
        dispatch(loginSuccessfully(account));
      }
    })
    .catch((error) => {
      console.log("Login ", error.message);
    });
};

/*////////////////////
REGISTER ACTIONS
////////////////////*/

export const registerSuccessfully = (account) => {
  return {
    type: ActionTypes.REGISTER_SUCCESSFULLY,
    payload: account,
  };
};

export const registerFailed = (errMess) => {
  return {
    type: ActionTypes.REGISTER_FAILED,
    payload: errMess,
  };
};

export const postRegister = (registerDetails) => (dispatch) => {
  const data = JSON.stringify(registerDetails);
  // alert(data);

  return fetch(baseUrl + "api/register/", {
    method: "POST",
    body: data,
    // mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(
      (response) => {
        if (response.ok || response.status === 400) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.token == null) {
        dispatch(registerFailed(response.username[0]));
      } else {
        const account = {
          username: registerDetails.username,
          token: response.token,
        };
        Cookies.set("account", account, { expires: 1 });
        dispatch(registerSuccessfully(account));
      }
    })
    .catch((error) => {
      console.log("Register ", error.message);
    });
};

/*////////////////////
LOGOUT ACTIONS
////////////////////*/

export const logoutSuccessfully = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESSFULLY,
  };
};

export const postLogout = (account) => (dispatch) => {
  console.log("postLogout");
  return fetch(baseUrl + "api/logout/", {
    method: "POST",
    // mode: "cors",
    headers: {
      Authorization: `Token ${account.token}`,
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => {
      Cookies.remove("account");
      return response.json();
    })
    .then(async (response) => {
      await dispatch(logoutSuccessfully());
      setTimeout(() => {
        window.location.reload(false);
      }, 500);
    })
    .catch((error) => {
      console.log("Logout ", error.message);
    });
};

/*////////////////////
REACT/VOTE ACTIONS
////////////////////*/

export const reactLike = () => {
  return {
    type: ActionTypes.REACT_LIKE,
    // payload: account,
  };
};

export const reactDislike = () => {
  return {
    type: ActionTypes.REACT_DISLIKE,
    // payload: errMess,
  };
};

export const postReact = (account, reactDetails) => (dispatch) => {
  const data = JSON.stringify(reactDetails);
  // alert(data);

  return fetch(baseUrl + "api/react/", {
    method: "POST",
    body: data,
    // mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${account.token}`,
    },
  })
    .then(
      (response) => {
        if (response.ok || response.status === 400) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.data == null) {
        console.log("React error ", error.message);
      } else {
        const react = response.data.react;
        if (react > 0) dispatch(reactLike());
        else if (react < 0) dispatch(reactDislike());
        else {
          console.log("React error ", error.message);
        }
      }
    })
    .catch((error) => {
      console.log("React error ", error.message);
    });
};

export const getReactSuccessfully = (movieid, react, voteState) => {
  return {
    type: ActionTypes.GET_REACT_SUCCESSFULLY,
    payload: {
      movieid: movieid,
      react: react,
      voteState: voteState,
    },
  };
};

export const getReact = (account, movieid) => (dispatch) => {
  const data = qs.stringify({ movie_id: movieid });
  // alert(data);

  return fetch(baseUrl + `api/react/?${data}`, {
    method: "GET",
    // body: data,
    // mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${account.token}`,
    },
  })
    .then(
      (response) => {
        if (response.ok || response.status === 400) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.data == null) {
        console.log("React error ", error.message);
      } else {
        const react = response.data;
        const voteState = response.state;
        console.log(JSON.stringify(response));
        dispatch(getReactSuccessfully(movieid, react, voteState));
      }
    })
    .catch((error) => {
      console.log("React error ", error.message);
    });
};

export const getRecommendIdListSuccessfully = (recommend) => {
  return {
    type: ActionTypes.GET_RECOMMEND_LIST_SUCCESSFULLY,
    payload: recommend,
  };
};

export const getRecommendIdList = (account) => (dispatch) => {
  // const data = qs.stringify({ movie_id: movieid });
  // alert(data);

  return fetch(baseUrl + `api/recommend/`, {
    method: "GET",
    // body: data,
    // mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${account.token}`,
    },
  })
    .then(
      (response) => {
        if (response.ok || response.status === 400) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.recommended_movies == null) {
        console.log("React error ", error.message);
      } else {
        const recommend = response.recommended_movies;        
        dispatch(getRecommendIdListSuccessfully(recommend));
      }
    })
    .catch((error) => {
      console.log("React error ", error.message);
    });
};
