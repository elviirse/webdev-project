import { Link, useParams } from "react-router-dom";
import menuData from "../data/menu.json";
import { useLanguage } from "../LanguageContext.jsx";

function DishDetails() {
  const { id } = useParams();
  const { language } = useLanguage();

  const text = {
    en: {
      notFound: "Dish not found",
      back: "Back to Lunch Menu",
      ingredients: "Ingredients",
      dietary: "Dietary Information",
      allergens: "Allergens",
      noAllergens: "No listed allergens",
      dishDetails: "DISH DETAILS",
      days: {
        Monday: "Monday",
        Tuesday: "Tuesday",
        Wednesday: "Wednesday",
        Thursday: "Thursday",
        Friday: "Friday",
      },
    },

    fi: {
      notFound: "Annosta ei löytynyt",
      back: "Takaisin lounasmenuun",
      ingredients: "Ainesosat",
      dietary: "Ruokavaliotiedot",
      allergens: "Allergeenit",
      noAllergens: "Ei ilmoitettuja allergeeneja",
      dishDetails: "ANNOKSEN TIEDOT",
      days: {
        Monday: "Maanantai",
        Tuesday: "Tiistai",
        Wednesday: "Keskiviikko",
        Thursday: "Torstai",
        Friday: "Perjantai",
      },
    },
  };

  const t = text[language];

  const dayMenu = menuData.find((day) =>
    day.dishes.some((dish) => dish.id === Number(id))
  );

  const dish = dayMenu?.dishes.find(
    (dish) => dish.id === Number(id)
  );

  if (!dish) {
    return (
      <main className="luxury-dish-details">
        <div className="dish-not-found">
          <span>❧</span>
          <h1>{t.notFound}</h1>

          <Link to="/menu" className="luxury-back-link">
            ← {t.back}
          </Link>
        </div>
      </main>
    );
  }

  const dishName =
    language === "fi" ? dish.nameFi : dish.name;

  const dishDescription =
    language === "fi"
      ? dish.descriptionFi
      : dish.description;

  const dishIngredients =
    language === "fi"
      ? dish.ingredientsFi
      : dish.ingredients;

  const dishAllergens =
    language === "fi"
      ? dish.allergensFi
      : dish.allergens;

  return (
    <main className="luxury-dish-details">
      <div className="dish-details-container">

        <Link to="/menu" className="luxury-back-link">
          ← {t.back}
        </Link>

        <header className="dish-details-header">
          <p className="dish-detail-label">
            {t.dishDetails}
          </p>

          <p className="dish-detail-day">
            {t.days[dayMenu.day]}
          </p>

          <div className="dish-detail-title-row">
            <h1>{dishName}</h1>

            <span className="detail-price">
              €{dish.price.toFixed(2)}
            </span>
          </div>

          <div className="dish-detail-ornament">
            <span></span>
            <span className="dish-detail-leaf">❧</span>
            <span></span>
          </div>

          <p className="detail-description">
            {dishDescription}
          </p>
        </header>

        <div className="dish-information-grid">

          <section className="luxury-detail-section ingredients-section">
            <p className="detail-number">01</p>
            <h2>{t.ingredients}</h2>

            <ul>
              {dishIngredients.map((ingredient) => (
                <li key={ingredient}>
                  {ingredient}
                </li>
              ))}
            </ul>
          </section>

          <section className="luxury-detail-section">
            <p className="detail-number">02</p>
            <h2>{t.dietary}</h2>

            <div className="detail-dietary-tags">
              {dish.dietary.map((item) => (
                <span key={item}>
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="luxury-detail-section">
            <p className="detail-number">03</p>
            <h2>{t.allergens}</h2>

            <p className="detail-allergen-text">
              {dishAllergens.length > 0
                ? dishAllergens.join(", ")
                : t.noAllergens}
            </p>
          </section>

        </div>

        <div className="dish-details-bottom">
          <Link to="/menu" className="dish-menu-button">
            ← {t.back}
          </Link>
        </div>

      </div>
    </main>
  );
}

export default DishDetails;