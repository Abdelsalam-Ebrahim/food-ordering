import { useContext } from "react";
import logoImg from "../assets/logo.jpg"; 
import { Cartcontext } from "../store/CartContext";
import { UserProgessContext } from "../store/UserProgessContext";

const Header = () => {


  const { items } = useContext(Cartcontext);
    const { showCart } = useContext(UserProgessContext);
  

  const totalCartItems = items.reduce((totalNumberOfItems, item) => totalNumberOfItems + item.quantity, 0);

  function handleShowCart() {
    showCart();
  }


  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Food Ordering Logo" />
        <h1>Food Ordering</h1>
      </div>

      <nav>
        <button onClick={handleShowCart} className="text-button">
          Cart ({ totalCartItems })
        </button>
      </nav>

    </header>
  );
}

export default Header;
