import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext.jsx";

function Home() {
  const { language } = useLanguage();

  const text = {
    en: {
      line1: "Two Cultures.",
      line2: "One Exceptional Table.",
      tagline1: "NORDIC INGREDIENTS. ASIAN SOUL.",
      tagline2: "A FINE DINING EXPERIENCE.",
      button: "DISCOVER OUR MENU",
    },

    fi: {
      line1: "Kaksi Kulttuuria.",
      line2: "Yksi Poikkeuksellinen Pöytä.",
      tagline1: "POHJOISMAISET RAAKA-AINEET. INTIALAINEN SIELU.",
      tagline2: "FINE DINING -ELÄMYS.",
      button: "TUTUSTU MENUUN",
    },
  };

  const t = text[language];

  return (
    <main className="home-luxury">
      <section className="luxury-hero">
        <div className="hero-overlay"></div>

        <div className="luxury-hero-content">
          <h1>
            <span>{t.line1}</span>
            <span>{t.line2}</span>
          </h1>

          <div className="hero-ornament">
            <span></span>
            <span className="hero-leaf">❧</span>
            <span></span>
          </div>

          <div className="luxury-tagline">
            <p>{t.tagline1}</p>
            <p>{t.tagline2}</p>
          </div>

          <Link to="/menu" className="discover-menu-btn">
            {t.button}
            <span className="discover-arrow">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;