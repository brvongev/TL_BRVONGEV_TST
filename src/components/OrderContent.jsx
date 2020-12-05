import i18n from "../dummy/i18n";
import React from "react";
import { useSelector } from "react-redux";
import { getActiveOrder } from "../data/selectors";
import {
  saveActiveOrder,
  revertOrder,
  placeOrder,
  addItem,
  showMessage,
} from "../data/actions";
import { dispatch } from "../data/store";
import { placeOrder as placeOrderAPI } from "../data/APIWrapper";
import ReadOnlyItem from "./ReadOnlyItem";
import EditItem from "./EditItem";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Button,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

/**
 * This components shows a table with all items. Clicking an item will activate it.
 * It also allows you to add an item, save the order or place the order.
 * Cancel will revert the changes and hide the content.
 */
function OrderContent({ orderId }) {
  const order = useSelector((state) => getActiveOrder(state, orderId));
  const { wasPlaced } = order;

  const save = () => {
    dispatch(saveActiveOrder(orderId));
    dispatch(showMessage({ severity: "success", msg: i18n.t("ORDER_SAVED") }));
  };
  const cancel = () => {
    dispatch(revertOrder(orderId));
  };
  const addItemFn = () => {
    dispatch(addItem(orderId));
  };

  // use the API to place the order.
  // If succesfull, update store and show message
  const placeOrderFn = () => {
    placeOrderAPI(order)
      .then(() => {
        dispatch(
          showMessage({ severity: "success", msg: i18n.t("ORDER_PLACED") })
        );
        dispatch(placeOrder(orderId));
      })
      .catch((err) => {
        dispatch(
          showMessage({
            severity: "error",
            msg: i18n.t("ORDER_NOT_PLACED", err),
          })
        );
      });
  };

  /**
   * Render averything in a table.
   * If the order was already placed, disable all editing.
   */
  return (
    <>
      <div className="items">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{i18n.t("CATEGORY")}</TableCell>
              <TableCell>{i18n.t("PRODUCT")}</TableCell>
              <TableCell>{i18n.t("UNITPRICE")}</TableCell>
              <TableCell>{i18n.t("QUANTITY")}</TableCell>
              <TableCell>{i18n.t("TOTAL")}</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {order.items?.map((item, i) =>
              wasPlaced ? (
                <ReadOnlyItem
                  key={"item_" + i}
                  orderId={orderId}
                  index={i}
                ></ReadOnlyItem>
              ) : (
                <EditItem
                  key={"item_" + i}
                  orderId={orderId}
                  index={i}
                ></EditItem>
              )
            )}
            <TableRow>
              <TableCell colSpan={3} />
              <TableCell>{i18n.t("TOTAL")}</TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell>
                {wasPlaced || (
                  <IconButton onClick={addItemFn} aria-label="delete">
                    <AddCircleIcon fontSize="large" />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <Button onClick={cancel} variant="contained">
        {i18n.t("CANCEL")}
      </Button>
      {wasPlaced || (
        <>
          <Button onClick={save} variant="contained">
            {i18n.t("SAVE")}
          </Button>
          <Button onClick={placeOrderFn} variant="contained" color="primary">
            {i18n.t("PLACE_ORDER")}
          </Button>
        </>
      )}
    </>
  );
}

export default OrderContent;
