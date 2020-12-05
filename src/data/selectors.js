// These selectors select a part of the state and are used inside the components
// The components will automatically update if the state changes in the "selected" section of the store

// product selector
export const getProductCategories = (state) => state.categories;
export const getProductsInCategory = (state, category) => {
  return state.products[category];
};
export const getProduct = (state, id) => {
  let product;
  Object.values(state.products).forEach((productArray) => {
    productArray.forEach((prod) => {
      if (prod.id === id) {
        product = prod;
      }
    });
  });
  return product;
};
// this checks if items of a prodcut category were loaded
export const categoryLoaded = (state, category) => {
  return state.loadedCategories[category];
};

// Customer selectors
export const getCustomer = (state, id) => {
  return state.customers[id];
};

// order selectors
export const getOrders = (state) => state.orders;
export const getOrder = (state, id) => {
  return state.orders.find((order) => order.id === id);
};
export const getActiveOrder = (state, id) => state.activeOrder[id];
export const isActiveOrder = (state, id) => !!state.activeOrder[id];
export const getItem = (state, orderId, index) => {
  return state.activeOrder[orderId]?.items?.[index];
};

// used for message bar
export const getMessage = (state, index) => {
  return state.message;
};
