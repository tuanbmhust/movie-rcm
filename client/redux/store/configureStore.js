import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { LoginAccount } from "../reducers/loginAccount";
import { Movie } from "../reducers/movie";
import { Movies } from "../reducers/movies";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      loginAccount: LoginAccount,
      movie: Movie,
      movies: Movies,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
