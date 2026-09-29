import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext.jsx";

function AboutSection() {
  const { language } = useLanguage();

  const content = {
    en: {
      label: "OUR STORY",
      title: "Where Nordic Nature Meets Asian Soul",
      text1:
        "Nordic Spices brings together the purity of Finnish ingredients and the warmth of Indian flavours.",
      text2:
        "Our kitchen combines seasonal Nordic produce with aromatic spices to create a modern dining experience rooted in two cultures.",
      button: "FIND US",
    },

    fi: {
      label: "TARINAMME",
      title: "Kun Pohjolan Luonto Kohtaa Intialaisen Sielun",
      text1:
        "Nordic Spices yhdistää suomalaiset raaka-aineet ja intialaisten makujen lämmön.",
      text2:
        "Keittiömme yhdistää sesongin pohjoismaiset raaka-aineet aromaattisiin mausteisiin ja luo modernin ruokailuelämyksen kahdesta kulttuurista.",
      button: "TUTUSTU TARINAAMME",
    },
  };

  const t = content[language];

  return (
    <section className="about-home-section">
      <div className="about-home-content">
        <p className="about-home-label">{t.label}</p>

        <h2>{t.title}</h2>

        <div className="about-home-line"></div>

        <p>{t.text1}</p>
        <p>{t.text2}</p>

        <Link to="/restaurant" className="about-home-btn">
          {t.button} <span>→</span>
        </Link>
      </div>

      <div className="about-home-visual">
        <div className="about-image-card">
          <span className="about-leaf">❧</span>

          <p className="about-quote">
            Finnish Ingredients.
            <br />
            Asian Soul.
          </p>

          <span className="about-small-text">
            NORDIC SPICES
          </span>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;