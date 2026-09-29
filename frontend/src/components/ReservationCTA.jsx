import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext.jsx";

function ReservationCTA() {
  const { language } = useLanguage();

  const content = {
    en: {
      label: "YOUR TABLE AWAITS",
      title: "Reserve Your Table",
      text: "Join us for a dining experience where Nordic ingredients meet the warmth of Asian flavours.",
      button: "RESERVE A TABLE",
    },

    fi: {
      label: "PÖYTÄSI ODOTTAA",
      title: "Varaa Pöytä",
      text: "Tule nauttimaan ruokailuelämyksestä, jossa pohjoismaiset raaka-aineet kohtaavat intialaiset maut.",
      button: "VARAA PÖYTÄ",
    },
  };

  const t = content[language];

  return (
    <section className="reservation-cta">
      <div className="reservation-cta-overlay"></div>

      <div className="reservation-cta-content">
        <p className="reservation-cta-label">{t.label}</p>

        <h2>{t.title}</h2>

        <div className="reservation-cta-ornament">
          <span></span>
          <span className="reservation-cta-leaf">❧</span>
          <span></span>
        </div>

        <p className="reservation-cta-text">
          {t.text}
        </p>

        <Link
          to="/reservation"
          className="reservation-cta-button"
        >
          {t.button}
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}

export default ReservationCTA;