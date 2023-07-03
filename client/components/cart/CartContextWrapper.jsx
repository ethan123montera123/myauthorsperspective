import { createContext } from "react";

/* context for service inclusions */
const CartContext = createContext([]);

export const CartContextWrapper = ({ cart, children }) => {
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};

export default CartContext;
