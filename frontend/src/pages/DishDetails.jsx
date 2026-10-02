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
      backLunch: "Back to Lunch Menu",
      backFineDining: "Back to À La Carte Menu",
      ingredients: "Ingredients",
      dietary: "Dietary Information",
      allergens: "Allergens",
      noIngredients: "No ingredients listed",
      noDietary: "Not specified",
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
      backLunch: "Takaisin lounasmenuun",
      backFineDining: "Takaisin À La Carte -menuun",
      ingredients: "Ainesosat",
      dietary: "Ruokavaliotiedot",
      allergens: "Allergeenit",
      noIngredients: "Ainesosia ei ilmoitettu",
      noDietary: "Ei määritelty",
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
            ← {t.backLunch}
          </Link>
        </div>
      </main>
    );
  }

  const dishName = language === "fi" && dish.nameFi ? dish.nameFi : dish.name;

  const dishDescription =
    language === "fi" && dish.descriptionFi
      ? dish.descriptionFi
      : dish.description;

  const isFineDining = dish.menuType === "fine_dining";

  // Fine dining information is stored inside the description.
  // These variables separate it for the three information boxes.
  let fineDiningIngredients = "";
  let fineDiningDietary = "";
  let fineDiningAllergens = "";

  if (isFineDining && dish.description) {
    const description = dish.description;

    const dietaryStart = description.indexOf("Dietary:");
    const allergensStart = description.indexOf("Allergens:");

    // Get ingredients.
    // Some dishes have Dietary information and some do not.
    if (dietaryStart !== -1) {
      fineDiningIngredients = description
        .slice(0, dietaryStart)
        .replace("Ingredients:", "")
        .trim();
    } else if (allergensStart !== -1) {
      fineDiningIngredients = description
        .slice(0, allergensStart)
        .replace("Ingredients:", "")
        .trim();
    } else {
      fineDiningIngredients = description.replace("Ingredients:", "").trim();
    }

    // Get dietary information if it exists.
    if (dietaryStart !== -1) {
      const dietaryEnd =
        allergensStart !== -1 ? allergensStart : description.length;

      fineDiningDietary = description
        .slice(dietaryStart + "Dietary:".length, dietaryEnd)
        .trim();
    }

    // Get allergens if they exist.
    if (allergensStart !== -1) {
      fineDiningAllergens = description
        .slice(allergensStart + "Allergens:".length)
        .trim();
    }
  }

  const backPath = isFineDining ? "/fine-dining" : "/menu";
  const backText = isFineDining ? t.backFineDining : t.backLunch;

  return (
    <main className="luxury-dish-details">
      <div className="dish-details-container">
        <Link to={backPath} className="luxury-back-link">
          ← {backText}
        </Link>

        <header className="dish-details-header">
          <p className="dish-detail-label">{t.dishDetails}</p>

          {!isFineDining && dish.dayOfWeek && (
            <p className="dish-detail-day">
              {t.days[dish.dayOfWeek] || dish.dayOfWeek}
            </p>
          )}

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

          {/* Lunch buffet description */}
          {!isFineDining && (
            <p className="detail-description">{dishDescription}</p>
          )}
        </header>

        {/* Detailed boxes are only needed for À La Carte dishes */}
        {isFineDining && (
          <div className="dish-information-grid">
            <section className="luxury-detail-section ingredients-section">
              <p className="detail-number">01</p>
              <h2>{t.ingredients}</h2>

              <p>{fineDiningIngredients || t.noIngredients}</p>
            </section>

            <section className="luxury-detail-section">
              <p className="detail-number">02</p>
              <h2>{t.dietary}</h2>

              <div className="detail-dietary-tags">
                <span>{fineDiningDietary || t.noDietary}</span>
              </div>
            </section>

            <section className="luxury-detail-section">
              <p className="detail-number">03</p>
              <h2>{t.allergens}</h2>

              <p className="detail-allergen-text">
                {fineDiningAllergens || t.noAllergens}
              </p>
            </section>
          </div>
        )}

        <div className="dish-details-bottom">
          <Link to={backPath} className="dish-menu-button">
            ← {backText}
          </Link>
        </div>
      </div>
    </main>
  );
}

export default DishDetails;
