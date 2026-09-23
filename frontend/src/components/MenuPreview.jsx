import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext.jsx";
import menuData from "../data/menu.json";

function MenuPreview() {
  const { language } = useLanguage();

  const text = {
    en: {
      label: "A TASTE OF NORDIC SPICES",
      title: "Discover Our Lunch Menu",
      description:
        "Seasonal Nordic ingredients meet the warmth and character of Asian spices.",
      button: "VIEW FULL MENU",
      details: "VIEW DETAILS",
    },

    fi: {
      label: "MAISTA NORDIC SPICES",
      title: "Tutustu Lounasmenuumme",
      description:
        "Pohjoismaiset sesonkiraaka-aineet kohtaavat intialaisten mausteiden lämmön.",
      button: "NÄYTÄ KOKO MENU",
      details: "NÄYTÄ TIEDOT",
    },
  };

  const t = text[language];

  // Take the first 3 dishes from the existing menu
  const previewDishes = menuData[0]?.dishes?.slice(0, 3) || [];

  return (
    <section className="menu-preview-section">
      <div className="menu-preview-heading">
        <p className="menu-preview-label">{t.label}</p>

        <h2>{t.title}</h2>

        <div className="menu-preview-ornament">
          <span></span>
          <span>❧</span>
          <span></span>
        </div>

        <p className="menu-preview-description">
          {t.description}
        </p>
      </div>

      <div className="menu-preview-grid">
        {previewDishes.map((dish) => (
          <article className="menu-preview-card" key={dish.id}>
            <div className="menu-preview-number">
              {String(dish.id).padStart(2, "0")}
            </div>

            <h3>
              {language === "fi" ? dish.nameFi : dish.name}
            </h3>

            <p>
              {language === "fi"
                ? dish.descriptionFi
                : dish.description}
            </p>

            <div className="menu-preview-card-bottom">
              <span className="menu-preview-price">
                {dish.price}
              </span>

              <Link
                to={`/menu/${dish.id}`}
                className="menu-preview-details"
              >
                {t.details} →
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="menu-preview-button-wrap">
        <Link to="/menu" className="menu-preview-button">
          {t.button} <span>→</span>
        </Link>
      </div>
    </section>
  );
}

export default MenuPreview;