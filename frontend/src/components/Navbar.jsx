import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext.jsx";

function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav>
      <Link to="/" className="logo">
        NORDIC SPICES
      </Link>

      <div className="nav-links">
        <Link to="/">{t.home}</Link>
        <Link to="/menu">{t.menu}</Link>
        <Link to="/reservation">{t.reservation}</Link>
        <Link to="/restaurant">{t.restaurant}</Link>
   

        <div className="language-switcher">
          <button
            className={language === "en" ? "active-language" : ""}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>

          <span>|</span>

          <button
            className={language === "fi" ? "active-language" : ""}
            onClick={() => setLanguage("fi")}
          >
            FI
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;