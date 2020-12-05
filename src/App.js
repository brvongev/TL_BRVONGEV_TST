import OrderList from "./components/OrderList";
import { Provider } from "react-redux";
import store, { dispatch } from "./data/store";
import { useEffect } from "react";
import API from "./dummy/api";
import { addOrder } from "./data/actions";
import { Container } from "@material-ui/core";
import MessageBar from "./components/MessageBar";

function App() {
  // This will load the orders that need to be displayed from the database and put them in the store for the components underneath to read
  useEffect(() => {
    const getOrders = async () => {
      const orders = (await API.getOrders()) || [];
      orders.forEach((order) => {
        dispatch(addOrder(order));
      });
    };
    getOrders();
  }, []);

  // Provide a store to underlying components
  // Add message bar that can be shared between components
  return (
    <Provider store={store}>
      <Container maxWidth="md">
        <OrderList />
        <MessageBar></MessageBar>
      </Container>
    </Provider>
  );
}

export default App;
