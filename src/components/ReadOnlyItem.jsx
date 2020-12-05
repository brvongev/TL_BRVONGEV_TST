import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getItem, getProduct } from "../data/selectors";
import { loadProductWithId } from "../data/APIWrapper";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

/**
 * This read-only items just shows all data as text in table cells
 * @param {*} param0
 */
function Item({ orderId, index }) {
  const item = useSelector((state) => getItem(state, orderId, index));
  const product = useSelector((state) => getProduct(state, item["product-id"]));

  // load product information if needed
  useEffect(() => {
    if (item["product-id"] && !product) {
      loadProductWithId(item["product-id"]);
    }
  }, [item, product]);

  return (
    <TableRow>
      <TableCell>Category {product?.category}</TableCell>
      <TableCell>{product?.description}</TableCell>
      <TableCell>{item["unit-price"]}</TableCell>
      <TableCell>{item.quantity}</TableCell>
      <TableCell>{item.total}</TableCell>
    </TableRow>
  );
}

export default Item;
