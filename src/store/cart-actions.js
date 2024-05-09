import { uiAction } from "./ui-slice";
import { cartAction } from "./cart-slice";
export const getFetchData = ()=>{

    return (dispatch)=>{
        const fetchDataRequest = async()=>{
            const response = await fetch( "https://shoping-http-req-default-rtdb.firebaseio.com/cart.json")
            const data = await response.json()
            console.log(data)
            dispatch(cartAction.getDataWhenLoaded(data))
        }
        fetchDataRequest()
    }
}

export const sendDataCart = (cart) => {
    return async (dispatch) => {
      dispatch(
        uiAction.showNotification({
          status: "pending",
          title: "sending",
          message: "sending  a cart data",
        })
      );
      const sendRequest = async () => {
        const response = await fetch(
          "https://shoping-http-req-default-rtdb.firebaseio.com/cart.json",
          {
            method: "PUT",
            body: JSON.stringify(cart),
          }
        );
        if (!response.ok) {
          throw new Error("data send fail");
        }
      
      };
      try {
          await sendRequest();
          dispatch(
            uiAction.showNotification({
              status: "success",
              title: "seccess...",
              message: "sending  a cart data successfully",
            })
          );
        } catch (error){
          dispatch(
            uiAction.showNotification({
              status: "error",
              title: "Error",
              message: "sending  a cart data failed",
            })
          );
        }
    };
  };