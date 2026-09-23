import { Link, NavLink } from "react-router-dom";
import { useLanguage } from "../LanguageContext.jsx";
import logo from "../assets/logo.png";

function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav>
      <Link to="/" className="logo">
        <img
          src={logo}
          alt="Nordic Spices"
          className="navbar-logo"
        />
      </Link>

      <div className="nav-links">
        <NavLink to="/" end>{t.home}</NavLink>
<NavLink to="/menu">{t.menu}</NavLink>
<NavLink to="/reservation">{t.reservation}</NavLink>
<NavLink to="/restaurant">{t.restaurant}</NavLink>

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