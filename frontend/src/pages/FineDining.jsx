import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";
import { useLanguage } from "../LanguageContext.jsx";

function FineDining() {
  const { language } = useLanguage();

  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedItemId, setAddedItemId] = useState(null);

  const categories =
    language === "fi"
      ? [
          { key: "amuse_bouche", title: "Amuse-Bouche" },
          { key: "starter", title: "Alkuruoat" },
          { key: "soup", title: "Keitot" },
          { key: "main", title: "Pääruoat" },
          { key: "side", title: "Lisukkeet" },
          { key: "dessert", title: "Jälkiruoat" },
          { key: "drink", title: "Alkoholittomat erikoisjuomat" },
          { key: "tasting_menu", title: "Maistelumenut" },
        ]
      : [
          { key: "amuse_bouche", title: "Amuse-Bouche" },
          { key: "starter", title: "Starters" },
          { key: "soup", title: "Soups" },
          { key: "main", title: "Main Courses" },
          { key: "side", title: "Sides" },
          { key: "dessert", title: "Desserts" },
          { key: "drink", title: "Signature Non-Alcoholic Drinks" },
          { key: "tasting_menu", title: "Tasting Menus" },
        ];

  const addToCart = (dish) => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = savedCart.find((item) => item.id === dish.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      savedCart.push({
        id: dish.id,
        name:
          language === "fi" && dish.nameFi
            ? dish.nameFi
            : dish.name,
        price: Number(dish.price),
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(savedCart));

    setAddedItemId(dish.id);

    setTimeout(() => {
      setAddedItemId(null);
    }, 1500);
  };

  useEffect(() => {
    const fetchFineDiningMenu = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/api/menu/fine-dining");
        setMenuData(response.data);
      } catch (err) {
        console.error("Fine Dining API error:", err);

        setError(
          language === "fi"
            ? "Fine Dining -menun lataaminen epäonnistui."
            : "Could not load the fine dining menu.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFineDiningMenu();
  }, [language]);

  const parseDishDescription = (description = "") => {
    const ingredientsMatch = description.match(
      /(?:Ingredients|Ainesosat):\s*(.*?)(?=\s*(?:Dietary|Ruokavalio|Ruokavaliot|Allergens|Allergeenit):|$)/i,
    );

    const dietaryMatch = description.match(
      /(?:Dietary|Ruokavalio|Ruokavaliot):\s*(.*?)(?=\s*(?:Allergens|Allergeenit):|$)/i,
    );

    const allergensMatch = description.match(
      /(?:Allergens|Allergeenit):\s*(.*)$/i,
    );

    const mainDescription = description
      .replace(
        /(?:Ingredients|Ainesosat):\s*.*?(?=\s*(?:Dietary|Ruokavalio|Ruokavaliot|Allergens|Allergeenit):|$)/i,
        "",
      )
      .replace(
        /(?:Dietary|Ruokavalio|Ruokavaliot):\s*.*?(?=\s*(?:Allergens|Allergeenit):|$)/i,
        "",
      )
      .replace(/(?:Allergens|Allergeenit):\s*.*$/i, "")
      .trim();

    return {
      mainDescription,
      ingredients: ingredientsMatch?.[1]?.trim() || "",
      dietary: dietaryMatch?.[1]?.trim() || "",
      allergens: allergensMatch?.[1]?.trim() || "",
    };
  };

  if (loading) {
    return (
      <main className="menu-page luxury-menu-page">
        <section className="luxury-menu-header">
          <p className="luxury-menu-eyebrow">NORDIC SPICES</p>

          <h1>
            {language === "fi"
              ? "Ladataan Fine Dining -menua..."
              : "Loading Fine Dining Menu..."}
          </h1>
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

        <h1>
          {language === "fi" ? "Fine Dining -menu" : "Fine Dining Menu"}
        </h1>

        <div className="luxury-menu-ornament">
          <span></span>
          <span className="luxury-menu-leaf">❧</span>
          <span></span>
        </div>

        <p className="luxury-menu-intro">
          {language === "fi"
            ? "Suomalaiset raaka-aineet kohtaavat aasialaiset maut Fine Dining -elämyksessämme."
            : "Finnish ingredients meet Asian flavours in our fine dining experience."}
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
            <article
              className="menu-card luxury-day-card"
              key={category.key}
            >
              <div className="day-heading luxury-day-heading">
                <div>
                  <span className="day-small-label">FINE DINING</span>
                  <h2>{category.title}</h2>
                </div>
              </div>

              <div className="day-dishes">
                {dishes.map((dish, index) => {
                  const dishName =
                    language === "fi" && dish.nameFi
                      ? dish.nameFi
                      : dish.name;

                  const dishDescription =
                    language === "fi" && dish.descriptionFi
                      ? dish.descriptionFi
                      : dish.description;

                  const {
                    mainDescription,
                    ingredients,
                    dietary,
                    allergens,
                  } = parseDishDescription(dishDescription);

                  return (
                    <div
                      className="dish-in-day luxury-dish"
                      key={dish.id}
                    >
                      <div className="dish-title-row">
                        <h3>{dishName}</h3>

                        <strong className="dish-price">
                          €{Number(dish.price).toFixed(2)}
                        </strong>
                      </div>

                      {mainDescription && (
                        <p className="dish-description">
                          {mainDescription}
                        </p>
                      )}

                      {ingredients && (
                        <p className="dish-description">
                          <strong>
                            {language === "fi"
                              ? "Ainesosat:"
                              : "Ingredients:"}
                          </strong>{" "}
                          {ingredients}
                        </p>
                      )}

                      {dietary && (
                        <p className="dish-description">
                          <strong>
                            {language === "fi"
                              ? "Ruokavaliot:"
                              : "Dietary:"}
                          </strong>{" "}
                          {dietary}
                        </p>
                      )}

                      {allergens && (
                        <p className="dish-description">
                          <strong>
                            {language === "fi"
                              ? "Allergeenit:"
                              : "Allergens:"}
                          </strong>{" "}
                          {allergens}
                        </p>
                      )}

                      <div className="menu-meta">
                        <div className="dietary-tags">
                          {dish.glutenFree === 1 && <span>GF</span>}
                          {dish.lactoseFree === 1 && <span>LF</span>}
                          {dish.vegetarian === 1 && <span>V</span>}
                          {dish.vegan === 1 && <span>VG</span>}
                        </div>
                      </div>

                      {category.key !== "tasting_menu" && (
                        <>
                          <Link
                            to={`/menu/${dish.id}`}
                            className="details-link luxury-details-link"
                          >
                            {language === "fi"
                              ? "NÄYTÄ ANNOKSEN TIEDOT"
                              : "VIEW DISH DETAILS"}
                            <span>→</span>
                          </Link>

                          <button
                            type="button"
                            className="details-link luxury-details-link"
                            onClick={() => addToCart(dish)}
                          >
                            {addedItemId === dish.id
                              ? language === "fi"
                                ? "Lisätty ✓"
                                : "Added ✓"
                              : language === "fi"
                                ? "Lisää ostoskoriin"
                                : "Add to cart"}
                            <span>+</span>
                          </button>
                        </>
                      )}

                      {index < dishes.length - 1 && <hr />}
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </section>

      <section className="luxury-menu-header">
        <p className="luxury-menu-intro">
          {language === "fi"
            ? "Ilmoitathan henkilökunnalle mahdollisista allergioista tai erityisruokavalioista. Ainesosat ja valmistustavat voivat vaihdella, eikä ristikontaminaatiota voida aina täysin sulkea pois."
            : "Please inform our staff of any allergies or dietary requirements. Ingredients and preparation may vary, and cross-contact cannot always be excluded."}
        </p>

        <p className="luxury-menu-intro">
          {language === "fi"
            ? "* Ruokavaliomerkinnät tulee varmistaa lopullisen reseptin, ainesosien ja keittiön valmistustapojen perusteella ennen menun julkaisemista."
            : "* Dietary classifications should be confirmed against the final recipe, ingredients and kitchen preparation before the menu is published."}
        </p>
      </section>
    </main>
  );
}

export default FineDining;