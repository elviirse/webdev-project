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
      backFineDining: "Back to Fine Dining Menu",
      lunchSelection: "Lunch Selection",
      ingredients: "Ingredients",
      dietary: "Dietary Information",
      allergens: "Allergen Information",
      noIngredients: "No ingredients listed",
      noDietary: "Not specified",
      noAllergens: "No listed allergens",
      allergenNotice:
        "Allergen details are not separately listed for this buffet. Please ask the restaurant staff if you have food allergies.",
      dishDetails: "DISH DETAILS",
      loading: "Loading dish...",
      glutenFree: "G = Gluten-free",
      lactoseFree: "L = Lactose-free",
      vegetarian: "V = Vegetarian",
      naanNotice: "Naan bread contains gluten.",
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
      backFineDining: "Takaisin Fine Dining -menuun",
      lunchSelection: "Lounasvalikoima",
      ingredients: "Ainesosat",
      dietary: "Ruokavaliotiedot",
      allergens: "Allergeenitiedot",
      noIngredients: "Ainesosia ei ilmoitettu",
      noDietary: "Ei määritelty",
      noAllergens: "Ei ilmoitettuja allergeeneja",
      allergenNotice:
        "Buffetin allergeeneja ei ole ilmoitettu erikseen. Kysy henkilökunnalta lisätietoja, jos sinulla on ruoka-allergioita.",
      dishDetails: "ANNOKSEN TIEDOT",
      loading: "Ladataan annosta...",
      glutenFree: "G = Gluteeniton",
      lactoseFree: "L = Laktoositon",
      vegetarian: "V = Kasvis",
      naanNotice: "Naan-leipä sisältää gluteenia.",
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

  const dishName =
    language === "fi" && dish.nameFi ? dish.nameFi : dish.name;

  const dishDescription =
    language === "fi" && dish.descriptionFi
      ? dish.descriptionFi
      : dish.description;

  const isFineDining = dish.menuType === "fine_dining";

  const backPath = isFineDining ? "/fine-dining" : "/menu";
  const backText = isFineDining ? t.backFineDining : t.backLunch;

  // Fine Dining details are stored inside the description.
  let fineDiningIngredients = "";
  let fineDiningDietary = "";
  let fineDiningAllergens = "";

  if (isFineDining && dish.description) {
    const description = dish.description;

    const ingredientsStart = description.indexOf("Ingredients:");
    const dietaryStart = description.indexOf("Dietary:");
    const allergensStart = description.indexOf("Allergens:");

    if (ingredientsStart !== -1) {
      const ingredientsEnd =
        dietaryStart !== -1
          ? dietaryStart
          : allergensStart !== -1
            ? allergensStart
            : description.length;

      fineDiningIngredients = description
        .slice(ingredientsStart + "Ingredients:".length, ingredientsEnd)
        .trim();
    }

    if (dietaryStart !== -1) {
      const dietaryEnd =
        allergensStart !== -1 ? allergensStart : description.length;

      fineDiningDietary = description
        .slice(dietaryStart + "Dietary:".length, dietaryEnd)
        .trim();
    }

    if (allergensStart !== -1) {
      fineDiningAllergens = description
        .slice(allergensStart + "Allergens:".length)
        .trim();
    }
  }

  // Normal dietary flags from the backend.
  const dietary = [];

  if (dish.glutenFree === 1) dietary.push("GF");
  if (dish.lactoseFree === 1) dietary.push("LF");
  if (dish.vegetarian === 1) dietary.push("VEG");
  if (dish.vegan === 1) dietary.push("VEGAN");

  // Lunch buffet information is currently stored in description.
  const isLunchBuffet =
    dish.menuType === "lunch" &&
    dish.category === "buffet" &&
    (!dish.ingredients || dish.ingredients.length === 0);

  const buffetItems = isLunchBuffet
    ? (dish.description || "")
        .split("Lunch includes")[0]
        .split(";")
        .map((item) => item.trim().replace(/\.$/, ""))
        .filter(Boolean)
    : [];

  const buffetDietaryCodes = [];

  if (isLunchBuffet) {
    const description = dish.description || "";

    if (/\bG\b/.test(description)) {
      buffetDietaryCodes.push(t.glutenFree);
    }

    if (/\bL\b/.test(description)) {
      buffetDietaryCodes.push(t.lactoseFree);
    }

    if (/\bV\b/.test(description)) {
      buffetDietaryCodes.push(t.vegetarian);
    }
  }

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

          {!isFineDining && (
            <p className="detail-description">{dishDescription}</p>
          )}
        </header>

        {isFineDining ? (
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
        ) : (
          <div className="dish-information-grid">
            <section className="luxury-detail-section ingredients-section">
              <p className="detail-number">01</p>
              <h2>{isLunchBuffet ? t.lunchSelection : t.ingredients}</h2>

              <ul>
                {dish.ingredients?.length > 0
                  ? dish.ingredients.map((ingredient) => (
                      <li key={ingredient.id}>
                        {language === "fi" && ingredient.nameFi
                          ? ingredient.nameFi
                          : ingredient.name}
                      </li>
                    ))
                  : buffetItems.map((item, index) => (
                      <li key={`${item}-${index}`}>{item}</li>
                    ))}
              </ul>
            </section>

            <section className="luxury-detail-section">
              <p className="detail-number">02</p>
              <h2>{t.dietary}</h2>

              <div className="detail-dietary-tags">
                {dietary.map((item) => (
                  <span key={item}>{item}</span>
                ))}

                {dietary.length === 0 &&
                  buffetDietaryCodes.map((item) => (
                    <span key={item}>{item}</span>
                  ))}

                {dietary.length === 0 &&
                  buffetDietaryCodes.length === 0 && (
                    <span>{t.noDietary}</span>
                  )}
              </div>

              {isLunchBuffet && (
                <p className="detail-allergen-text">{t.naanNotice}</p>
              )}
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
                          : allergen.name,
                      )
                      .join(", ")
                  : isLunchBuffet
                    ? t.allergenNotice
                    : t.noAllergens}
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