import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext.jsx";
import api from "../services/api.js";

function Menu() {
  const { language } = useLanguage();

  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const text = {
    en: {
      weeklyLunch: "WEEKLY LUNCH",
      title: "Lunch Menu",
      intro:
        "Finnish ingredients meet Asian spices. Our lunch menu is served Monday to Friday.",
      today: "Today",
      details: "VIEW DISH DETAILS",
      loading: "Loading menu...",
      error: "Could not load the menu.",
      days: {
        Monday: "Monday",
        Tuesday: "Tuesday",
        Wednesday: "Wednesday",
        Thursday: "Thursday",
        Friday: "Friday",
      },
    },

    fi: {
      weeklyLunch: "VIIKON LOUNAS",
      title: "Lounasmenu",
      intro:
        "Suomalaiset raaka-aineet kohtaavat intialaiset mausteet. Lounasta tarjoillaan maanantaista perjantaihin.",
      today: "Tänään",
      details: "NÄYTÄ ANNOKSEN TIEDOT",
      loading: "Ladataan ruokalistaa...",
      error: "Ruokalistaa ei voitu ladata.",
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
    const fetchMenu = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/api/menu");

        setMenuData(response.data);
      } catch (err) {
        console.error("Menu API error:", err);
        setError(t.error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [language]);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  if (loading) {
    return (
      <main className="menu-page luxury-menu-page">
        <section className="luxury-menu-header">
          <p className="luxury-menu-eyebrow">{t.weeklyLunch}</p>
          <h1>{t.loading}</h1>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="menu-page luxury-menu-page">
        <section className="luxury-menu-header">
          <p className="luxury-menu-eyebrow">{t.weeklyLunch}</p>
          <h1>{error}</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="menu-page luxury-menu-page">
      <section className="luxury-menu-header">
        <p className="luxury-menu-eyebrow">{t.weeklyLunch}</p>

        <h1>{t.title}</h1>

        <div className="luxury-menu-ornament">
          <span></span>
          <span className="luxury-menu-leaf">❧</span>
          <span></span>
        </div>

        <p className="luxury-menu-intro">{t.intro}</p>
      </section>

      <section className="weekly-menu luxury-weekly-menu">
        {days.map((day) => {
          const dishes = menuData.filter(
            (dish) => dish.dayOfWeek === day
          );

          const isToday = day === today;

          return (
            <article
              className={`menu-card luxury-day-card ${
                isToday ? "today-card" : ""
              }`}
              key={day}
            >
              <div className="day-heading luxury-day-heading">
                <div>
                  <span className="day-small-label">
                    {t.weeklyLunch}
                  </span>

                  <h2>{t.days[day]}</h2>
                </div>

                {isToday && (
                  <span className="today-badge">
                    {t.today}
                  </span>
                )}
              </div>

              <div className="day-dishes">
                {dishes.map((dish, index) => (
                  <div
                    className="dish-in-day luxury-dish"
                    key={dish.id}
                  >
                    <div className="dish-title-row">
                      <h3>
                        {language === "fi"
                          ? dish.nameFi
                          : dish.name}
                      </h3>

                      <strong className="dish-price">
                        €{Number(dish.price).toFixed(2)}
                      </strong>
                    </div>

                    <p className="dish-description">
                      {language === "fi"
                        ? dish.descriptionFi
                        : dish.description}
                    </p>

                    <div className="menu-meta">
                      <div className="dietary-tags">
                        {dish.glutenFree === 1 && (
                          <span>GF</span>
                        )}

                        {dish.lactoseFree === 1 && (
                          <span>LF</span>
                        )}

                        {dish.vegetarian === 1 && (
                          <span>VEG</span>
                        )}

                        {dish.vegan === 1 && (
                          <span>VEGAN</span>
                        )}
                      </div>
                    </div>

                    <Link
                      to={`/menu/${dish.id}`}
                      className="details-link luxury-details-link"
                    >
                      {t.details}
                      <span>→</span>
                    </Link>

                    {index < dishes.length - 1 && <hr />}
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}

export default Menu;