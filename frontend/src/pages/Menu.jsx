import { Link } from "react-router-dom";
import menuData from "../data/menu.json";

function Menu() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <div className="menu-page">

      <div className="menu-heading">
        <p className="section-small">NORDIC SPICES</p>
        <h1>Lunch Menu</h1>

        <p>
          A weekly lunch menu combining Nordic ingredients
          with the flavours of India.
        </p>
      </div>

      <div className="weekly-menu">

        {menuData.map((dish) => {
          const isToday = dish.day === today;

          return (
            <article
              className={`menu-card ${isToday ? "today-card" : ""}`}
              key={dish.id}
            >

              <div className="menu-card-top">
                <p className="menu-day">
                  {dish.day}
                  {isToday && <span className="today-label"> TODAY</span>}
                </p>

                <p className="menu-price">
                  €{dish.price.toFixed(2)}
                </p>
              </div>

              <h2>{dish.name}</h2>

              <p className="menu-description">
                {dish.description}
              </p>

              <div className="dietary">
                {dish.dietary.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <p className="allergens">
                Allergens:{" "}
                {dish.allergens.length > 0
                  ? dish.allergens.join(", ")
                  : "None listed"}
                  <Link
                  to={`/menu/${dish.id}`}
                className="details-btn"
                >
                 View Dish Details →
                </Link>
              </p>

            </article>
          );
        })}

      </div>

      <div className="dietary-guide">
        <strong>Dietary information</strong>
        <p>
          V = Vegetarian • VG = Vegan • GF = Gluten Free •
          LF = Lactose Free
        </p>
      </div>

    </div>
  );
}

export default Menu;