import axios from "axios";

import { REGISTER_SUCCESS, REGISTER_FAIL } from "./auth.types";
import { setAlert } from "../alert/alert.actions";

// Register an user
export const registerUser = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    // Make a request to backend API
    const res = await axios.post("/api/users", body, config);
    // If no errors, dispatch REGISTER_SUCCESS
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    // Send alerts
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "is-danger")));
    }

    // Dispatch REGISTER_FAIL if error
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
