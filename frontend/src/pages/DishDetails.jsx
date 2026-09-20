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

  // Find the day that contains the selected dish
  const dayMenu = menuData.find((day) =>
    day.dishes.some((dish) => dish.id === Number(id))
  );

  // Find the selected dish
  const dish = dayMenu?.dishes.find(
    (dish) => dish.id === Number(id)
  );

  if (!dish) {
    return (
      <div className="dish-details-page">
        <h1>{t.notFound}</h1>

        <Link to="/menu" className="back-link">
          ← {t.back}
        </Link>
      </div>
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
    <div className="dish-details-page">

      <Link to="/menu" className="back-link">
        ← {t.back}
      </Link>

      <p className="section-small">
        {t.days[dayMenu.day]}
      </p>

      <div className="dish-title-row">
        <h1>{dishName}</h1>

        <span className="detail-price">
          €{dish.price.toFixed(2)}
        </span>
      </div>

      <p className="detail-description">
        {dishDescription}
      </p>

      <section className="detail-section">
        <h2>{t.ingredients}</h2>

        <ul>
          {dishIngredients.map((ingredient) => (
            <li key={ingredient}>
              {ingredient}
            </li>
          ))}
        </ul>
      </section>

      <section className="detail-section">
        <h2>{t.dietary}</h2>

        <div className="dietary">
          {dish.dietary.map((item) => (
            <span key={item}>
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="detail-section">
        <h2>{t.allergens}</h2>

        <p>
          {dishAllergens.length > 0
            ? dishAllergens.join(", ")
            : t.noAllergens}
        </p>
      </section>

    </div>
  );
}

export default DishDetails;