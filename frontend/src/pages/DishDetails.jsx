import { Link, useParams } from "react-router-dom";
import menuData from "../data/menu.json";

function DishDetails() {
  const { id } = useParams();

  const dish = menuData.find(
    (item) => item.id === Number(id)
  );

  if (!dish) {
    return (
      <div className="dish-details-page">
        <h1>Dish not found</h1>
        <Link to="/menu">Back to Lunch Menu</Link>
      </div>
    );
  }

  return (
    <div className="dish-details-page">

      <Link to="/menu" className="back-link">
        ← Back to Lunch Menu
      </Link>

      <p className="section-small">{dish.day}</p>

      <div className="dish-title-row">
        <h1>{dish.name}</h1>
        <span className="detail-price">
          €{dish.price.toFixed(2)}
        </span>
      </div>

      <p className="detail-description">
        {dish.description}
      </p>

      <section className="detail-section">
        <h2>Ingredients</h2>

        <ul>
          {dish.ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </section>

      <section className="detail-section">
        <h2>Dietary Information</h2>

        <div className="dietary">
          {dish.dietary.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="detail-section">
        <h2>Allergens</h2>

        <p>
          {dish.allergens.length > 0
            ? dish.allergens.join(", ")
            : "No listed allergens"}
        </p>
      </section>

    </div>
  );
}

export default DishDetails;