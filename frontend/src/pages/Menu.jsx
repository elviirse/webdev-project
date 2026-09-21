import { Link } from "react-router-dom";
import menuData from "../data/menu.json";
import { useLanguage } from "../LanguageContext.jsx";

function Menu() {
  const { language } = useLanguage();

  const text = {
    en: {
      weeklyLunch: "WEEKLY LUNCH",
      title: "Lunch Menu",
      intro:
        "Finnish ingredients meet Asian spices. Our lunch menu is served Monday to Friday.",
      today: "Today",
      allergens: "Allergens",
      none: "None",
      details: "VIEW DISH DETAILS",
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
      allergens: "Allergeenit",
      none: "Ei allergeeneja",
      details: "NÄYTÄ ANNOKSEN TIEDOT",
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

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

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
        {menuData.map((dayMenu) => {
          const isToday = dayMenu.day === today;

          return (
            <article
              className={`menu-card luxury-day-card ${
                isToday ? "today-card" : ""
              }`}
              key={dayMenu.day}
            >
              <div className="day-heading luxury-day-heading">
                <div>
                  <span className="day-small-label">
                    {t.weeklyLunch}
                  </span>

                  <h2>{t.days[dayMenu.day]}</h2>
                </div>

                {isToday && (
                  <span className="today-badge">
                    {t.today}
                  </span>
                )}
              </div>

              <div className="day-dishes">
                {dayMenu.dishes.map((dish, index) => (
                  <div className="dish-in-day luxury-dish" key={dish.id}>
                    <div className="dish-title-row">
                      <h3>
                        {language === "fi"
                          ? dish.nameFi
                          : dish.name}
                      </h3>

                      <strong className="dish-price">
                        €{dish.price.toFixed(2)}
                      </strong>
                    </div>

                    <p className="dish-description">
                      {language === "fi"
                        ? dish.descriptionFi
                        : dish.description}
                    </p>

                    <div className="menu-meta">
                      <div className="dietary-tags">
                        {dish.dietary.map((item) => (
                          <span key={item}>{item}</span>
                        ))}
                      </div>
                    </div>

                    <p className="allergens">
                      <strong>{t.allergens}:</strong>{" "}
                      {language === "fi"
                        ? dish.allergensFi.length
                          ? dish.allergensFi.join(", ")
                          : t.none
                        : dish.allergens.length
                        ? dish.allergens.join(", ")
                        : t.none}
                    </p>

                    <Link
                      to={`/menu/${dish.id}`}
                      className="details-link luxury-details-link"
                    >
                      {t.details}
                      <span>→</span>
                    </Link>

                    {index < dayMenu.dishes.length - 1 && (
                      <hr />
                    )}
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