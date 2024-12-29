import { useContext } from "react";
import Modal from "./UI/Modal";
import { Cartcontext } from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import { UserProgessContext } from "../store/UserProgessContext";
import CartItem from "./CartItem";
import toast from "react-hot-toast";

const Cart = () => {

  const { items, addItem, removeItem } = useContext(Cartcontext);
  const { progress, hideCart, showCheckout } = useContext(UserProgessContext);

  const totalPrice = items.reduce((totalP, item) => totalP + item.quantity * item.price, 0);

  function handleAddToCart(item) {
    toast.success('Added Successfully',
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
    );
    addItem(item);
  }

  function handleRemoveFromCart(id) {
    toast.success('Removed Successfully',
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
    );
    removeItem(id);
  }

  return (
    <Modal className="cart" open={progress === 'cart'} onClose={progress === 'cart' ? hideCart : null}>
      <h2>Your Cart</h2>
      <ul>
        {items.map(item => (
          <CartItem
            key={item.id}
            item={item}
            incItem={() => handleAddToCart(item)}
            decItem={() => handleRemoveFromCart(item.id)}
          />
        ))}
      </ul>

      <p className="cart-total"> { currencyFormatter.format(totalPrice) } </p>

      <p className="modal-actions">
        <button className="text-button" onClick={hideCart} >Close</button>
        {items.length > 0 && <button className="button" onClick={showCheckout}>Go to Checkout</button>}
      </p>

    </Modal>
  )
};

export default Cart;
