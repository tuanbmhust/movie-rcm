/*////////////////////
LOGOUT ACTIONS
////////////////////*/

import { baseUrl } from "../../shared/baseUrl";

export const logoutSuccessfully = (message) => {
  return {
    type: ActionTypes.LOGOUT_SUCCESSFULLY,
    payload: message,
  };
};

export const postLogout = (account) => (dispatch) => {
  console.log("postLogout");
  return fetch(baseUrl + "api/logout", {
    method: "POST",
    // mode: "cors",
    headers: {
      Authorization: `Token ${account.token}`,
    },
    credentials: "include",
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
      //   Cookies.remove("account");
      return response.json();
    })
    .then(async (response) => {
      await dispatch(logoutSuccessfully(response.message));
      setTimeout(() => {
        window.location.reload(false);
      }, 500);
    })
    .catch((error) => {
      console.log("Logout ", error.message);
    });
};
