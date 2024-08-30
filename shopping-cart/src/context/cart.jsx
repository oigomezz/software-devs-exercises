import { useReducer, createContext, useMemo } from "react";
import { cartReducer, cartInitialState } from "../reducers/cart.js";

export const CartContext = createContext();

function useCartReducer() {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const addToCart = (product) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });

  const removeFromCart = (product) =>
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: product,
    });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return { state, addToCart, removeFromCart, clearCart };
}

export function CartProvider({ children }) {
  const { state, addToCart, removeFromCart, clearCart } = useCartReducer();

  const value = useMemo(
    () => ({
      cart: state,
      addToCart,
      removeFromCart,
      clearCart,
    }),
    [addToCart, clearCart, removeFromCart, state]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
