import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext.jsx";

function Footer() {
  const { language } = useLanguage();

  const text = {
    en: {
      tagline: "Finnish Ingredients. Indian Soul.",
      explore: "Explore",
      home: "Home",
      menu: "Lunch Menu",
      reservation: "Reservation",
      restaurant: "Restaurant",
      hours: "Opening Hours",
      weekdays: "Monday – Friday",
      location: "Helsinki, Finland",
      copyright: "© 2026 Nordic Spices. All rights reserved.",
    },

    fi: {
      tagline: "Suomalaiset raaka-aineet. Intialainen sielu.",
      explore: "Tutustu",
      home: "Etusivu",
      menu: "Lounasmenu",
      reservation: "Varaus",
      restaurant: "Ravintola",
      hours: "Aukioloajat",
      weekdays: "Maanantai – perjantai",
      location: "Helsinki, Suomi",
      copyright: "© 2026 Nordic Spices. Kaikki oikeudet pidätetään.",
    },
  };

  const t = text[language];

  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-brand">
          <h2>NORDIC SPICES</h2>
          <p>{t.tagline}</p>
        </div>

        <div className="footer-links">
          <h3>{t.explore}</h3>

          <Link to="/">{t.home}</Link>
          <Link to="/menu">{t.menu}</Link>
          <Link to="/reservation">{t.reservation}</Link>
          <Link to="/restaurant">{t.restaurant}</Link>
        </div>

        <div className="footer-info">
          <h3>{t.hours}</h3>
          <p>{t.weekdays}</p>
          <p>11:00 – 15:00</p>
          <p>{t.location}</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>{t.copyright}</p>
      </div>
    </footer>
  );
}

export default Footer;