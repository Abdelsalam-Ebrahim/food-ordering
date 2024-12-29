import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const UserProgessContext = createContext({
  progress: '', // 'cart', 'checkout'
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

const UserProgessContextProvider = ({ children }) => {

  const [userProgress, setUserProgress] = useState('');

  function showCart() {
    setUserProgress('cart');
  }

  function hideCart() {
    setUserProgress('');
  }

  function showCheckout() {
    setUserProgress('checkout');
  }

  function hideCheckout() {
    setUserProgress('');
  }

  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout
  }

  return (
    <UserProgessContext.Provider value={userProgressCtx}>
      {children}
    </UserProgessContext.Provider>
  );
}

export default UserProgessContextProvider;
