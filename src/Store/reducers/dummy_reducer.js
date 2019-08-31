import * as actionTypes from "../actions/Types";

const initialAppState = {
  data: []
};
export const dummy_reducer = (state = initialAppState, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER:
      return {
        ...state,
        data: action.payload.data
      };

    default:
      return state;
  }
};
