import { currencyFormatter } from "../util/formatting";

const CartItem = ({ item, incItem, decItem }) => {
  return (
    <li className="cart-item">
      <p>{item.name} - {item.quantity} x {currencyFormatter.format(item.price)} </p>
      <p className="cart-item-actions">
        <button onClick={decItem}> - </button>
        <span> {item.quantity} </span>
        <button onClick={incItem}> + </button>
      </p>
    </li>
  );
}

export default CartItem;
