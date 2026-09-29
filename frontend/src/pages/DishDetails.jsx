import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../LanguageContext.jsx";
import api from "../services/api.js";

function DishDetails() {
  const { id } = useParams();
  const { language } = useLanguage();

  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const text = {
    en: {
      notFound: "Dish not found",
      back: "Back to Lunch Menu",
      ingredients: "Ingredients",
      dietary: "Dietary Information",
      allergens: "Allergens",
      noAllergens: "No listed allergens",
      dishDetails: "DISH DETAILS",
      loading: "Loading dish...",
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
      loading: "Ladataan annosta...",
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

  useEffect(() => {
    const fetchDish = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/api/menu/${id}`);
        setDish(response.data);
      } catch (err) {
        console.error("Dish API error:", err);
        setError(t.notFound);
      } finally {
        setLoading(false);
      }
    };

    fetchDish();
  }, [id, language]);

  if (loading) {
    return (
      <main className="luxury-dish-details">
        <div className="dish-not-found">
          <span>❧</span>
          <h1>{t.loading}</h1>
        </div>
      </main>
    );
  }

  if (error || !dish) {
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
    language === "fi" && dish.nameFi
      ? dish.nameFi
      : dish.name;

  const dishDescription =
    language === "fi" && dish.descriptionFi
      ? dish.descriptionFi
      : dish.description;

  const dietary = [];

  if (dish.glutenFree === 1) dietary.push("GF");
  if (dish.lactoseFree === 1) dietary.push("LF");
  if (dish.vegetarian === 1) dietary.push("VEG");
  if (dish.vegan === 1) dietary.push("VEGAN");

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
            {t.days[dish.dayOfWeek] || dish.dayOfWeek}
          </p>

          <div className="dish-detail-title-row">
            <h1>{dishName}</h1>

            <span className="detail-price">
              €{Number(dish.price).toFixed(2)}
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
              {dish.ingredients?.map((ingredient) => (
                <li key={ingredient.id}>
                  {language === "fi" && ingredient.nameFi
                    ? ingredient.nameFi
                    : ingredient.name}
                </li>
              ))}
            </ul>
          </section>

          <section className="luxury-detail-section">
            <p className="detail-number">02</p>
            <h2>{t.dietary}</h2>

            <div className="detail-dietary-tags">
              {dietary.map((item) => (
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
              {dish.allergens?.length > 0
                ? dish.allergens
                    .map((allergen) =>
                      language === "fi" && allergen.nameFi
                        ? allergen.nameFi
                        : allergen.name
                    )
                    .join(", ")
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