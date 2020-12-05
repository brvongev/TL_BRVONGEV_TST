/**
 * Here, the actions for the store are defined.
 * These methods take any parameters and return a dispatchable action object.
 * For this small application, we cann group everything here. For larger applications, we should split up the logic.
 */

// product actions
export const SET_PRODUCT_CATEGORIES = "SET_PRODUCT_CATEGORIES";
export const SET_PRODUCTS_FOR_CATEGORY = "SET_PRODUCTS_FOR_CATEGORY";
export const SET_PRODUCT = "SET_PRODUCT";

// customer actions
export const SET_CUSTOMER = "SET_CUSTOMER";

// order actions
export const ADD_ORDER = "ADD_ORDER";
export const SET_ACTIVE_ORDER = "SET_ACTIVE_ORDER";
export const SAVE_ORDER = "SAVE_ORDER";
export const REVERT_ORDER = "REVERT_ORDER";
export const PLACE_ORDER = "PLACE_ORDER";

// item actions
export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const SET_ITEM_PRODUCT_ID = "SET_ITEM_PRODUCT_ID";
export const SET_ITEM_QUANTITY = "SET_ITEM_QUANTITY";

// message bar actions
export const SHOW_MESSAGE = "SHOW_MESSAGE";

// product actions
export const setProductCategories = (categories) => {
  return { type: SET_PRODUCT_CATEGORIES, payload: { categories } };
};

export const setProductsForCategory = (category, products) => {
  return { type: SET_PRODUCTS_FOR_CATEGORY, payload: { category, products } };
};

export const setProduct = (product) => {
  return { type: SET_PRODUCT, payload: { product } };
};

// customer actions
export const setCustomer = (customer) => {
  return { type: SET_CUSTOMER, payload: { customer } };
};

// order actions
export const addOrder = (order) => {
  return { type: ADD_ORDER, payload: { order } };
};

export const setActiveOrder = (orderId) => {
  return { type: SET_ACTIVE_ORDER, payload: { orderId } };
};

export const saveActiveOrder = (orderId) => {
  return { type: SAVE_ORDER, payload: { orderId } };
};

export const revertOrder = (orderId) => {
  return { type: REVERT_ORDER, payload: { orderId } };
};

export const placeOrder = (orderId) => {
  return { type: PLACE_ORDER, payload: { orderId } };
};

// item actions
export const addItem = (orderId) => {
  return { type: ADD_ITEM, payload: { orderId } };
};

export const removeItem = (orderId, index) => {
  return { type: REMOVE_ITEM, payload: { orderId, index } };
};

export const setItemProductId = (orderId, index, productId) => {
  return { type: SET_ITEM_PRODUCT_ID, payload: { orderId, index, productId } };
};

export const setItemQuantity = (orderId, index, quantity) => {
  return { type: SET_ITEM_QUANTITY, payload: { orderId, index, quantity } };
};

// message bar actions
export const showMessage = (message) => {
  return { type: SHOW_MESSAGE, payload: message };
};
