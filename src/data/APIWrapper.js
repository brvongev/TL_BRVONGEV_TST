import API from "../dummy/api";
import store, { dispatch } from "./store";
import {
  setProductCategories,
  setProductsForCategory,
  setProduct,
  setCustomer,
} from "./actions";
import {
  getProductCategories,
  categoryLoaded,
  getProduct,
  getCustomer,
} from "./selectors";
import _ from "underscore";

/**
 * These methods are used tot load data asynchronously from the server. When loaded, they
 * will populate the store, so the components will automatically be updated.
 * Note that this code should be smart enough to only call the server when needed.
 */
export const loadProductCategories = async () => {
  if (!getProductCategories(store.getState())) {
    const productCategories = await API.getProductCategories();
    dispatch(setProductCategories(productCategories));
  }
};

export const loadProductsInCategory = async (category) => {
  if (!categoryLoaded(store.getState(), category)) {
    const products = await API.getProductsInCategory(category);
    dispatch(setProductsForCategory(category, products));
  }
};

/**
 * For loading this data, we use a debounce. This way, in a synchronous piece of code, all id's will be gathered
 * before a server call needs to be made. Only id's that were not loaded yet will be loaded.
 */
let customersToLoad = [];
const debouncedLoadCustomers = _.debounce(async () => {
  const customersLocal = _.uniq(customersToLoad);
  customersToLoad = [];
  const customers = await API.getCustomersByIds(customersLocal);
  customers?.forEach((customer) => {
    dispatch(setCustomer(customer));
  });
});
export const loadExtraInfoForOrder = async (id) => {
  if (!getCustomer(store.getState(), id)) {
    customersToLoad.push(id);
    debouncedLoadCustomers();
  }
};

/**
 * same mechanism as described for loadExtraInfoForOrder
 */
let productsToLoad = [];
const debouncedLoadProducts = _.debounce(async () => {
  const productsLocal = _.uniq(productsToLoad);
  productsToLoad = [];
  const products = await API.getProductsByIds(productsLocal);
  products?.forEach((product) => {
    dispatch(setProduct(product));
  });
});

export const loadProductWithId = async (id) => {
  if (!getProduct(store.getState(), id)) {
    productsToLoad.push(id);
    debouncedLoadProducts();
  }
};

export const placeOrder = async (order) => {
  console.log(JSON.stringify(order));
};
