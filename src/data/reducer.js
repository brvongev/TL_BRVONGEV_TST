import produce from "immer";
import {
  ADD_ORDER,
  SET_ACTIVE_ORDER,
  ADD_ITEM,
  REMOVE_ITEM,
  SET_ITEM_PRODUCT_ID,
  SET_ITEM_QUANTITY,
  SAVE_ORDER,
  REVERT_ORDER,
  PLACE_ORDER,
  SET_PRODUCT_CATEGORIES,
  SET_PRODUCTS_FOR_CATEGORY,
  SET_PRODUCT,
  SET_CUSTOMER,
  SHOW_MESSAGE,
} from "./actions";

/**
 * The methods below calculate the totals for orders and items and puts them back in the data format that is
 * is readable by potential other components that reuse this store.
 * (Normally, I would have converted things so they are numbers in the store, but the data model as show in orderX.json has everything in strings)
 * These methods can be used in multiple actions
 */
const calculateItemTotal = (item) => {
  item.total = (item && item.quantity * item["unit-price"]) || 0;
  item.total = (
    parseFloat(item["unit-price"]) * parseFloat(item["quantity"])
  ).toFixed(2);
};
const calculateOrderTotals = (order) => {
  order.total = (
    order.items.reduce((total, item) => {
      calculateItemTotal(item);
      return (
        total + parseFloat(item["unit-price"]) * parseFloat(item["quantity"])
      );
    }, 0) || 0
  ).toFixed(2);
};

/**
 * The reducer makes use of immer's "produce", which means that you get a proxy of a new state instead of the current state.
 * This means you can edit the thing on the fly, instead of returning a new object, which can be cumbersome.
 */
const reducer = produce((newState, action) => {
  switch (action.type) {
    // product actions
    case SET_PRODUCT_CATEGORIES:
      {
        // set a list of all product categories in the store
        const { categories } = action.payload;
        newState.categories = categories;
      }
      break;
    case SET_PRODUCTS_FOR_CATEGORY:
      {
        // Set all products within a category in the store
        const { category, products } = action.payload;
        newState.products[category] = products;
        newState.loadedCategories[category] = true;
      }
      break;
    case SET_PRODUCT:
      {
        // add product information to the store
        const { product } = action.payload;
        const { category } = product;
        if (
          !newState.products[category]?.find((prod) => prod.id === product.id)
        ) {
          newState.products[category] = newState.products[category] || [];
          newState.products[category].push(product);
        }
      }
      break;

    // customer actions
    case SET_CUSTOMER:
      {
        // add customer information to the store
        const { customer } = action.payload;
        if (!newState.customers[customer.id]) {
          newState.customers[customer.id] = customer;
        }
      }
      break;

    // order actions
    case ADD_ORDER: {
      // add an order to the list
      const { order } = action.payload;
      newState.orders.push(order);
      break;
    }
    case SET_ACTIVE_ORDER: {
      // Activate an order. This creates a clone that can be edited.
      const { orderId } = action.payload;
      newState.activeOrder[orderId] = newState.orders.find(
        (order) => order.id === orderId
      );
      break;
    }
    case PLACE_ORDER: // PLACE_ORDER is basically saving, but also marking as placed
    case SAVE_ORDER: {
      // save the order. The original order gets overwritten by the active order
      const { orderId } = action.payload;
      if (action.type === PLACE_ORDER) {
        newState.activeOrder[orderId].wasPlaced = true;
      }
      const orderIndex = newState.orders.findIndex(
        (order) => order.id === orderId
      );
      if (orderIndex !== -1) {
        newState.orders[orderIndex] = newState.activeOrder[orderId];
      }

      if (action.type === PLACE_ORDER) {
        newState.activeOrder[orderId] = undefined;
      }
      break;
    }
    case REVERT_ORDER: {
      // revert changes made in the order and deactivate
      const { orderId } = action.payload;
      newState.activeOrder[orderId] = undefined;
      break;
    }

    // item actions
    case ADD_ITEM: {
      // add an item to given order
      const { orderId } = action.payload;
      if (newState.activeOrder[orderId]) {
        newState.activeOrder[orderId].items.push({ quantity: 0 });
      }
      break;
    }
    case REMOVE_ITEM: {
      // remove item from given order and recalculate totals
      const { orderId, index } = action.payload;
      delete newState.activeOrder[orderId].items[index];
      calculateOrderTotals(newState.activeOrder[orderId]);
      break;
    }
    case SET_ITEM_PRODUCT_ID: {
      // set product of an item in a given order. Also update unit price and recalculate totals
      const { orderId, index, productId } = action.payload;
      if (newState.activeOrder[orderId]) {
        newState.activeOrder[orderId].items[index]["product-id"] = productId;
        // find product and update unit price
        let product;
        Object.values(newState.products).forEach((productArray) => {
          productArray.forEach((prod) => {
            if (prod.id === productId) {
              product = prod;
            }
          });
        });
        if (product) {
          newState.activeOrder[orderId].items[index]["unit-price"] =
            product.price;
        }
        // recalculate totals as price may have changed
        calculateOrderTotals(newState.activeOrder[orderId]);
      }
      break;
    }
    case SET_ITEM_QUANTITY: {
      // set quantity and recalculate totals. Make sure it's a positive integer
      const { orderId, index, quantity } = action.payload;
      if (newState.activeOrder[orderId]) {
        let newQuantity = 0;
        if (quantity > 0) {
          newQuantity = parseInt(quantity);
        }
        newState.activeOrder[orderId].items[index].quantity = newQuantity;
        calculateOrderTotals(newState.activeOrder[orderId]);
      }
      break;
    }

    // message bar actions
    case SHOW_MESSAGE: {
      // sets message object to be read by the message bar
      newState.message = action.payload;
      break;
    }
    default:
    // unsupported operation
  }
});

export default reducer;
