import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import { Cartcontext } from "../store/CartContext";
import { toast } from "react-hot-toast";


const MealItem = ({ meal }) => {

  const { addItem } = useContext(Cartcontext);

  function addItemHandler() {
    toast.success('Added Successfully',
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
    );

    addItem(meal);
  }

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3> {meal.name} </h3>
          <p className="meal-item-price"> {currencyFormatter.format(meal.price)} </p>
          <p className="meal-item-description"> {meal.description} </p>
        </div>
        <p className="meal-item-actions">
          <button className="button" onClick={addItemHandler} >Add to Cart</button>
        </p>
      </article>
    </li>
  );
}

export default MealItem;
