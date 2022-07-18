import { types } from "../types/types";

// const initialState = {
//   loadPage: false,
// };

export const appReducer = (state = {}, action) => {
  switch (action.type) {
    case types.isLoaded: {
      return {
        ...state,
        loadPage: true,
      };
    }
    default:
      return state;
  }
};
