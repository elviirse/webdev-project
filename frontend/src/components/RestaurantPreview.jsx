import { Link } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";
import { useLanguage } from "../LanguageContext.jsx";

function RestaurantPreview() {
  const { language } = useLanguage();

  const content = {
    en: {
      label: "VISIT NORDIC SPICES",
      title: "A Place to Slow Down & Enjoy",
      text:
        "Discover a warm and welcoming dining space inspired by Nordic simplicity and Asian hospitality.",
      location: "Finland",
      hours: "Lunch Monday–Friday",
      button: "DISCOVER THE RESTAURANT",
    },

    fi: {
      label: "VIERAILE NORDIC SPICESISSA",
      title: "Paikka Pysähtyä & Nauttia",
      text:
        "Tutustu lämpimään ja viihtyisään ravintolaan, jossa pohjoismainen yksinkertaisuus kohtaa intialaisen vieraanvaraisuuden.",
      location: "Suomi",
      hours: "Lounas maanantai–perjantai",
      button: "TUTUSTU RAVINTOLAAN",
    },
  };

  const t = content[language];

  return (
    <section className="restaurant-preview">
      <div className="restaurant-preview-visual">
        <div className="restaurant-preview-image">
          <span>❧</span>
        </div>
      </div>

      <div className="restaurant-preview-content">
        <p className="restaurant-preview-label">{t.label}</p>

        <h2>{t.title}</h2>

        <div className="restaurant-preview-line"></div>

        <p className="restaurant-preview-text">
          {t.text}
        </p>

        <div className="restaurant-preview-info">
          <div>
            <MapPin size={20} strokeWidth={1.5} />
            <span>{t.location}</span>
          </div>

          <div>
            <Clock size={20} strokeWidth={1.5} />
            <span>{t.hours}</span>
          </div>
        </div>

        <Link
          to="/restaurant"
          className="restaurant-preview-button"
        >
          {t.button}
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}

export default RestaurantPreview;