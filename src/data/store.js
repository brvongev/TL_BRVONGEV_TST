import { createStore } from "redux";
import reducer from "./reducer";

const defaultState = {
  orders: [],
  activeOrder: {},
  products: {},
  customers: {},
  loadedCategories: {},
};

// Create a store that will be used for the whol application
// For this small app, we have 1 reducer. If the app grows, more reducers could be combined (and multiple default states)
const store = createStore(reducer, defaultState);
const { dispatch } = store;
export default store;
export { dispatch };
