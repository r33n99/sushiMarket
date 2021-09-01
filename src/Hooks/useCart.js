import React from 'react';
import Context from '../Context';

export const useCart = () => {
   const { setCartItems, cartItems } = React.useContext(Context);
   const totalPrice = cartItems.reduce((sum,el) => el.price + sum,0)
   return { setCartItems,cartItems,totalPrice } 
}