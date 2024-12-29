import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import CartContextProvider from "./store/CartContext";
import UserProgessContextProvider from "./store/UserProgessContext";
import Checkout from "./components/Checkout";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <CartContextProvider> 
      <UserProgessContextProvider>
        <Toaster />
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </UserProgessContextProvider>
    </CartContextProvider>
  );
}

export default App;
