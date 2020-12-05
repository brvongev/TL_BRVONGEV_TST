import customers from "./customers.json";
import products from "./products.json";
import order1 from "./order1.json";
import order2 from "./order2.json";
import order3 from "./order3.json";
import _ from "underscore";

/**
 * This is a dummy API. All data is loaded asynchronously.
 */
const API = {
  getOrders: async () => {
    let orders = [order1, order2, order3];
    return orders;
  },
  getProductCategories: async () => {
    const categories = products.map((product) => product.category);
    return _.uniq(categories);
  },
  getProductsInCategory: async (category) => {
    return products.filter((product) => product.category === category);
  },
  getProductsByIds: async (ids = []) => {
    return products.filter((product) => {
      return ids.indexOf(product.id) !== -1;
    });
  },
  getCustomer: async (id) => {
    return customers.find((customer) => {
      return id === customer.id;
    });
  },
  getCustomersByIds: async (ids = []) => {
    return customers.filter((customer) => {
      return ids.indexOf(customer.id) !== -1;
    });
  },
};

export default API;
