import { createContext, useReducer } from "react";

/* eslint-disable react-refresh/only-export-components */
export const Cartcontext = createContext({
  items: {},
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if(action.type === 'ADD_ITEM') {
    const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
    const updatedItems = [...state.items];

    if(existingItemIndex >= 0) {
      const existingItem = state.items[existingItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1
      };

      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({...action.item, quantity: 1});
    }

    return { ...state, items: updatedItems };
  }

  if(action.type === 'REMOVE_ITEM') {
    const existingItemIndex = state.items.findIndex(item => item.id === action.id);
    const existingItem = state.items[existingItemIndex];
    // console.log(existingItem);
    const updatedItems = [...state.items];

    if(existingItem.quantity > 1) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1
      };

      updatedItems[existingItemIndex] = updatedItem;
    } else {
      // updatedItems.filter(item => item.id === action.item.id);
      updatedItems.splice(existingItemIndex, 1);
    }

    return {...state, items: updatedItems};
  }

  if(action.type === 'CLEAR_CART') {
    return { ...state, items: [] };
  }

  return state;
}

const CartContextProvider = ({ children }) => {

  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: 'ADD_ITEM', item })
  }

  function removeItem(id) {
    dispatchCartAction({ type: 'REMOVE_ITEM', id })
  }

  function clearCart() {
    dispatchCartAction({ type: 'CLEAR_CART' });
  }


  const cartContextObj = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  }

  return (
    <Cartcontext.Provider value={cartContextObj}>
      {children}
    </Cartcontext.Provider>
  );
}

export default CartContextProvider;
