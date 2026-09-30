import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";

function FineDining() {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = [
    { key: "amuse_bouche", title: "Amuse-Bouche" },

    { key: "starter", title: "Starters" },
    { key: "soup", title: "Soups" },
    { key: "main", title: "Main Courses" },
    { key: "side", title: "Sides" },
    { key: "dessert", title: "Desserts" },
    { key: "drink", title: "Signature Non-Alcoholic Drinks" },
    { key: "tasting_menu", title: "Tasting Menus" },
  ];

  useEffect(() => {
    const fetchFineDiningMenu = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/api/menu/fine-dining");
        setMenuData(response.data);
      } catch (err) {
        console.error("Fine Dining API error:", err);
        setError("Could not load the fine dining menu.");
      } finally {
        setLoading(false);
      }
    };

    fetchFineDiningMenu();
  }, []);

  if (loading) {
    return (
      <main className="menu-page luxury-menu-page">
        <section className="luxury-menu-header">
          <p className="luxury-menu-eyebrow">NORDIC SPICES</p>
          <h1>Loading Fine Dining Menu...</h1>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="menu-page luxury-menu-page">
        <section className="luxury-menu-header">
          <p className="luxury-menu-eyebrow">NORDIC SPICES</p>
          <h1>{error}</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="menu-page luxury-menu-page">
      <section className="luxury-menu-header">
        <p className="luxury-menu-eyebrow">NORDIC SPICES</p>

        <h1>Fine Dining Menu</h1>

        <div className="luxury-menu-ornament">
          <span></span>
          <span className="luxury-menu-leaf">❧</span>
          <span></span>
        </div>

        <p className="luxury-menu-intro">
          Nordic ingredients meet Indian and Asian flavours in our fine dining
          experience.
        </p>
      </section>

      <section className="weekly-menu luxury-weekly-menu">
        {categories.map((category) => {
          const dishes = menuData.filter(
            (dish) => dish.category === category.key,
          );

          if (dishes.length === 0) {
            return null;
          }

          return (
            <article className="menu-card luxury-day-card" key={category.key}>
              <div className="day-heading luxury-day-heading">
                <div>
                  <span className="day-small-label">FINE DINING</span>

                  <h2>{category.title}</h2>
                </div>
              </div>

              <div className="day-dishes">
                {dishes.map((dish, index) => (
                  <div className="dish-in-day luxury-dish" key={dish.id}>
                    <div className="dish-title-row">
                      <h3>{dish.name}</h3>

                      <strong className="dish-price">
                        €{Number(dish.price).toFixed(2)}
                      </strong>
                    </div>

                    <p className="dish-description">{dish.description}</p>

                    <div className="menu-meta">
                      <div className="dietary-tags">
                        {dish.glutenFree === 1 && <span>GF</span>}
                        {dish.lactoseFree === 1 && <span>LF</span>}
                        {dish.vegetarian === 1 && <span>V</span>}
                        {dish.vegan === 1 && <span>VG</span>}
                      </div>
                    </div>

                    {category.key !== "tasting_menu" && (
                      <Link
                        to={`/menu/${dish.id}`}
                        className="details-link luxury-details-link"
                      >
                        VIEW DISH DETAILS
                        <span>→</span>
                      </Link>
                    )}

                    {index < dishes.length - 1 && <hr />}
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </section>

      <section className="luxury-menu-header">
        <p className="luxury-menu-intro">
          Please inform our staff of any allergies or dietary requirements.
          Ingredients and preparation may vary, and cross-contact cannot always
          be excluded.
        </p>

        <p className="luxury-menu-intro">
          * Dietary classifications should be confirmed against the final
          recipe, ingredients and kitchen preparation before the menu is
          published.
        </p>
      </section>
    </main>
  );
}

export default FineDining;
