// Since we never have any production code without internationalization, I added a dummy class for this.
const tags = {
  OPEN_ORDER_LIST: "Open Orders",
  PLACED_ORDER_LIST: "Closed Orders",
  ORDER_NR: "Order #{1}",
  CATEGORY: "Category",
  PRODUCT: "Product",
  UNITPRICE: "Unit Price",
  QUANTITY: "Quantity",
  TOTAL: "Total",
  CANCEL: "Cancel",
  SAVE: "Save",
  ORDER_SAVED: "Order was saved",
  PLACE_ORDER: "Place Order",
  ORDER_PLACED: "Order was placed successfully",
  ORDER_NOT_PLACED: "Order could not be placed: {1}",
};

// there is only 1 function t(); this function takes the language tag as the first parameter.
// all other parameters are used for parametrized localization.
const i18n = {
  t: (tag, ...args) => {
    let translated;
    if (tags[tag]) {
      translated = tags[tag];
      args.forEach((arg, i) => {
        translated = translated.replaceAll(`{${i + 1}}`, arg);
      });
    } else {
      translated = tag;
    }
    return translated;
  },
};
export default i18n;
