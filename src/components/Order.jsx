import i18n from "../dummy/i18n";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getOrder, isActiveOrder, getCustomer } from "../data/selectors";
import OrderContent from "./OrderContent";
import { dispatch } from "../data/store";
import { setActiveOrder, revertOrder } from "../data/actions";
import { loadExtraInfoForOrder } from "../data/APIWrapper";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  order: {},
  itemTitle: {
    fontSize: "1.5em",
  },
}));

/**
 * This components shows an entry for an order with given orderId.
 * If active, it will show the content as well.
 * @param {String} orderId
 */
function Order({ orderId }) {
  const classes = useStyles();

  // read data from store based on orderId
  const order = useSelector((state) => getOrder(state, orderId));
  const isActive = useSelector((state) => isActiveOrder(state, orderId));
  const customer = useSelector((state) => getCustomer(state, orderId));

  useEffect(() => {
    customer || loadExtraInfoForOrder(orderId);
  }, [orderId, customer]);

  // activate the order
  const toggleOrder = () => {
    isActive
      ? dispatch(revertOrder(orderId))
      : dispatch(setActiveOrder(orderId));
  };

  return (
    <div className="order">
      <div className={classes.itemTitle} onClick={toggleOrder}>
        {i18n.t("ORDER_NR", order.id)} ({customer?.name})
      </div>
      {isActive && <OrderContent orderId={orderId}></OrderContent>}
    </div>
  );
}

export default Order;
