import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  FormControl,
  Select,
  MenuItem,
  TextField,
  IconButton,
  TableRow,
  TableCell,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

import { removeItem } from "../data/actions";
import { dispatch } from "../data/store";
import {
  loadProductCategories,
  loadProductsInCategory,
  loadProductWithId,
} from "../data/APIWrapper";
import {
  getProductCategories,
  getProductsInCategory,
  getItem,
  getProduct,
} from "../data/selectors";
import { setItemProductId, setItemQuantity } from "../data/actions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

/**
 * This shows an editable row for an item in an active order.
 * Except for the category, all data is loaded from the store and synced to the store right away.
 * Category is stored internally, as this is used to filter the products
 * @param {*} param0
 */
function EditItem({ orderId, index }) {
  const classes = useStyles();

  // select data from the store
  const item = useSelector((state) => getItem(state, orderId, index));
  const product = useSelector((state) => getProduct(state, item["product-id"]));
  const [category, setCategory] = useState(product?.category);

  const categories = useSelector(getProductCategories);
  const products = useSelector((state) =>
    getProductsInCategory(state, category)
  );

  // At this point, we may only have a product ID
  // make sure all info we nee gets loaded to the store if necessary
  useEffect(() => {
    loadProductCategories();
  }, []);

  useEffect(() => {
    if (category !== -1) {
      loadProductsInCategory(category);
    }
  }, [category]);

  useEffect(() => {
    if (item["product-id"] && !product) {
      loadProductWithId(item["product-id"]);
    }
  }, [item, product]);

  useEffect(() => {
    if (product) {
      // when the product is loaded, set the category.
      // This needs to be done manually because the category is interna state
      setCategory(product?.category);
    }
  }, [product]);

  // input handlers
  const removeItemFn = () => {
    dispatch(removeItem(orderId, index));
  };
  const handleChange = (event) => {
    if (event.target.name === "category") {
      setCategory(event.target.value);
    } else if (event.target.name === "product") {
      dispatch(setItemProductId(orderId, index, event.target.value));
    } else if (event.target.name === "quantity") {
      dispatch(setItemQuantity(orderId, index, event.target.value));
    }
  };

  // creates a table row with editable fields so the order can get updated immediately
  return (
    <TableRow>
      <TableCell>
        <FormControl className={classes.formControl}>
          <Select
            name="category"
            value={category || ""}
            onChange={handleChange}
          >
            <MenuItem value={""}></MenuItem>
            {categories?.map((category) => {
              return (
                <MenuItem
                  key={"newValue_cat_" + index + "_" + category}
                  value={category}
                >
                  Category {category}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </TableCell>

      <TableCell>
        <FormControl className={classes.formControl}>
          <Select
            name="product"
            value={product?.id || ""}
            onChange={handleChange}
          >
            <MenuItem value={""}></MenuItem>
            {products?.map((product) => {
              const { id, description } = product;
              return (
                <MenuItem key={"newValue_prod_" + index + "_" + id} value={id}>
                  {description}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </TableCell>

      <TableCell>{item["unit-price"]}</TableCell>

      <TableCell>
        <TextField
          name="quantity"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
          value={item.quantity}
        />
      </TableCell>

      <TableCell>{item.total}</TableCell>

      <TableCell>
        <IconButton
          onClick={removeItemFn}
          aria-label="delete"
          className={classes.margin}
        >
          <DeleteIcon fontSize="large" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default EditItem;
