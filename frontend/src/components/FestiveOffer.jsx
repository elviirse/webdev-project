import { Link } from "react-router-dom";
import { Leaf, Users, Heart } from "lucide-react";
import { useLanguage } from "../LanguageContext.jsx";

function FestiveOffer() {
  const { language } = useLanguage();

  const content = {
    en: {
      label: "FESTIVE OFFER",
      discount: "25% OFF",
      menu: "ON OUR MENU",
      description:
        "Celebrate the season with great food and even better company.",
      feature1: "Seasonal Flavours",
      feature2: "Good Company",
      feature3: "Memorable Moments",
      button: "EXPLORE OUR MENU",
      note: "Offer valid for a limited time only.",
    },

    fi: {
      label: "JUHLATARJOUS",
      discount: "25% ALENNUS",
      menu: "KOKO MENUSTA",
      description:
        "Juhlista sesonkia hyvän ruoan ja vielä paremman seuran parissa.",
      feature1: "Kauden maut",
      feature2: "Hyvä seura",
      feature3: "Ikimuistoiset hetket",
      button: "TUTUSTU MENUUN",
      note: "Tarjous voimassa rajoitetun ajan.",
    },
  };

  const t = content[language];

  return (
    <section className="festive-offer-section">
      <div className="festive-offer-overlay"></div>

      <div className="festive-offer-content">
        <div className="festive-heading">
          <span></span>
          <p>{t.label}</p>
          <span></span>
        </div>

        <h2>{t.discount}</h2>
        <h3>{t.menu}</h3>

        <p className="festive-description">
          {t.description}
        </p>

        <div className="festive-features">
          <div className="festive-feature">
            <Leaf size={27} strokeWidth={1.4} />
            <p>{t.feature1}</p>
          </div>

          <div className="festive-feature">
            <Users size={27} strokeWidth={1.4} />
            <p>{t.feature2}</p>
          </div>

          <div className="festive-feature">
            <Heart size={27} strokeWidth={1.4} />
            <p>{t.feature3}</p>
          </div>
        </div>

        <Link to="/menu" className="festive-menu-btn">
          {t.button}
          <span>→</span>
        </Link>

        <p className="festive-note">{t.note}</p>
      </div>
    </section>
  );
}

export default FestiveOffer;