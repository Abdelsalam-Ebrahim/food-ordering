import useHttp from "../hooks/useHttp";
import Error from "./Error";
import MealItem from "./MealItem";

const requestConfig = {};

const Meals = () => {

  const { data: meals, isLoading, error } = useHttp('http://localhost:3000/meals', requestConfig, []);

  if(isLoading) return <h1 className="center">Fetching data...</h1>;
  if(error) return <Error title="Failed to fetch meals" message={error} />

  return (
    <ul id="meals">
      {!error && meals.map(meal => <MealItem key={meal.id} meal={meal}/> )}
    </ul>
  );
}

export default Meals;
