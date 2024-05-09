import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
// import { uiAction } from './store/ui-slice';
import Notification from "./components/Cart/Notification";
import { getFetchData, sendDataCart } from "./store/cart-actions";

let isInitial = true;
function App() {
  const cartShow = useSelector((state) => state.ui.cartVisible);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendDataCart(cart));
  }, [cart, dispatch]);

  useEffect(()=>{
    dispatch(getFetchData())
  },[dispatch])
  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        ></Notification>
      )}
      <Layout>
        {cartShow && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
