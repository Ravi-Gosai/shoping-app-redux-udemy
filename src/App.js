import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react';
import { uiAction } from './store/ui-slice';
import Notification from './components/Cart/Notification';

let isInitial = true
function App() {
  const cartShow = useSelector(state=>state.ui.cartVisible)
  const cart = useSelector(state=>state.cart)
  const dispatch = useDispatch()
  const notification = useSelector(state=>state.ui.notification)

  useEffect(()=>{
    const sendCartData = async ()=>{
      
      dispatch(uiAction.showNotification({
        status: 'pending',
        title : 'sending',
        message : 'sending  a cart data'
      }))
     const response = await fetch('https://shoping-http-req-default-rtdb.firebaseio.com/cart.json',{
        method :'PUT',
        body : JSON.stringify(cart)
      })
      if(!response.ok){
       throw new Error('data send fail')
      }
    
      dispatch(uiAction.showNotification({
        status: 'success',
        title : 'seccess...',
        message : 'sending  a cart data successfully'
      }))
    }
    if(isInitial){
      isInitial = false;
      return;
    }
    sendCartData().catch((error)=>{
      dispatch(uiAction.showNotification({
        status: 'error',
        title : 'Error',
        message : 'sending  a cart data failed'
      }))
    })
  },[cart,dispatch])
  return (
    <>
    {notification && <Notification status={notification.status} title={notification.title} message={notification.message}></Notification>}
    <Layout>
     {cartShow && <Cart />}
      <Products />
    </Layout>
    </>
  );
}

export default App;
