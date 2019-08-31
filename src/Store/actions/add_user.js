import * as actionTypes from "./Types";

export const add_user = data => {
  return {
    type: actionTypes.ADD_USER,
    payload: {
      data
    }
  };
};
