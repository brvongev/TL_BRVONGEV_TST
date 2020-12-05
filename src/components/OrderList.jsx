import i18n from "../dummy/i18n";
import { useSelector } from "react-redux";
import { getOrders } from "../data/selectors";
import Order from "./Order";

import { makeStyles } from "@material-ui/core/styles";

// create styles within the component
const useStyles = makeStyles((theme) => ({
  orderList: {
    paddingTop: "30px",
  },
  title: {
    fontSize: "2em",
  },
  spacer: {
    height: "25px",
  },
}));

/**
 * This component will show a list of open and closed orders
 */
function OrderList() {
  const classes = useStyles();
  const orders = useSelector(getOrders);

  return (
    <div className={classes.orderList}>
      <div className={classes.title}>{i18n.t("OPEN_ORDER_LIST")}</div>
      {orders
        .filter((order) => !order.wasPlaced)
        .map((order) => (
          <Order key={"order_" + order.id} orderId={order.id}></Order>
        ))}
      <div className={classes.spacer}></div>
      <div className={classes.title}>{i18n.t("PLACED_ORDER_LIST")}</div>
      {orders
        .filter((order) => order.wasPlaced)
        .map((order) => (
          <Order key={"order_" + order.id} orderId={order.id}></Order>
        ))}
    </div>
  );
}

export default OrderList;
