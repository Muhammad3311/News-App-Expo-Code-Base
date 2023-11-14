import { ADD_TO_CART, GET_TOKEN } from "./constants";
const initialState = [];

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [
        ...state, // if there have any data in state like 2 items etc
        action.data, // adding new data with existing data
      ];

    case GET_TOKEN:
      return [
        ...state,
        action.data,
        console.log("token in reducer", action.data),
      ];

    default:
      return state;
  }
};
