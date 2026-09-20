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
        "Finnish ingredients meet Indian spices. Our lunch menu is served Monday to Friday.",
      today: "Today",
      allergens: "Allergens",
      none: "None",
      details: "View Dish Details",
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
      details: "Näytä annoksen tiedot",
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
    <main className="menu-page">
      <section className="menu-header">
        <p className="eyebrow">{t.weeklyLunch}</p>

        <h1>{t.title}</h1>

        <p>{t.intro}</p>
      </section>

      <section className="weekly-menu">
        {menuData.map((dayMenu) => {
          const isToday = dayMenu.day === today;

          return (
            <div
              className={`menu-card ${isToday ? "today-card" : ""}`}
              key={dayMenu.day}
            >
              <div className="day-heading">
                <h2>{t.days[dayMenu.day]}</h2>

                {isToday && (
                  <span className="today-badge">
                    {t.today}
                  </span>
                )}
              </div>

              {dayMenu.dishes.map((dish, index) => (
                <div className="dish-in-day" key={dish.id}>
                 <h3>
  {language === "fi" ? dish.nameFi : dish.name}
</h3>

<p>
  {language === "fi" ? dish.descriptionFi : dish.description}
</p>

                  <div className="menu-meta">
                    <strong>€{dish.price.toFixed(2)}</strong>

                    <div className="dietary-tags">
                      {dish.dietary.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>

                  <p className="allergens">
                    <strong>{t.allergens}:</strong>{" "}
                    {language === "fi"
  ? (dish.allergensFi.length
      ? dish.allergensFi.join(", ")
      : t.none)
  : (dish.allergens.length
      ? dish.allergens.join(", ")
      : t.none)}
                  </p>

                  <Link
                    to={`/menu/${dish.id}`}
                    className="details-link"
                  >
                    {t.details}
                  </Link>

                  {index < dayMenu.dishes.length - 1 && <hr />}
                </div>
              ))}
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default Menu;