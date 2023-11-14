import { ADD_TO_CART, GET_TOKEN } from "./constants";

export function addToCart(item) {
  // console.log("actions item", item);
  return {
    type: ADD_TO_CART,
    data: item,
  };
}

export function getToken(item) {
  // console.log("actions token", item);
  return {
    type: GET_TOKEN,
    data: item,
  };
}
