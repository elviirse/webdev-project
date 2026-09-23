import {
  Clock,
  MapPin,
  Mail,
  Phone,
  Bus,
} from "lucide-react";
import { useLanguage } from "../LanguageContext.jsx";

function Restaurant() {
  const { language } = useLanguage();

  const text = {
    en: {
      visit: "VISIT US",
      title: "Nordic Spices",
      intro:
        "Finnish ingredients meet the warmth and flavours of Indian cuisine.",
      hours: "Opening Hours",
      weekdays: "Monday – Friday",
      weekend: "Saturday – Sunday: Closed",
      location: "Location",
      address: "Restaurant address will be added here.",
      contact: "Contact",
      email: "Email",
      phone: "Phone",
      gettingHere: "GETTING HERE",
      transport: "Public Transport",
      transportInfo:
        "Public transport information will be provided using an open transport API.",
    },

    fi: {
      visit: "TERVETULOA",
      title: "Nordic Spices",
      intro:
        "Suomalaiset raaka-aineet kohtaavat intialaisen keittiön lämmön ja maut.",
      hours: "Aukioloajat",
      weekdays: "Maanantai – perjantai",
      weekend: "Lauantai – sunnuntai: Suljettu",
      location: "Sijainti",
      address: "Ravintolan osoite lisätään tähän.",
      contact: "Yhteystiedot",
      email: "Sähköposti",
      phone: "Puhelin",
      gettingHere: "SAAPUMINEN",
      transport: "Julkinen liikenne",
      transportInfo:
        "Julkisen liikenteen tiedot tarjotaan avoimen liikenteen rajapinnan avulla.",
    },
  };

  const t = text[language];

  return (
    <main className="luxury-restaurant-page">

      <section className="restaurant-luxury-hero">
        <div className="restaurant-luxury-overlay"></div>

        <div className="restaurant-luxury-content">
          <p className="restaurant-luxury-label">
            {t.visit}
          </p>

          <h1>{t.title}</h1>

          <div className="restaurant-ornament">
            <span></span>
            <span className="restaurant-leaf">❧</span>
            <span></span>
          </div>

          <p className="restaurant-luxury-intro">
            {t.intro}
          </p>
        </div>
      </section>

      <section className="restaurant-details-section">

        <div className="restaurant-details-heading">
          <p>
            {language === "fi"
              ? "SUUNNITTELE VIERAILUSI"
              : "PLAN YOUR VISIT"}
          </p>

          <h2>
            {language === "fi"
              ? "Tervetuloa Pöytäämme"
              : "Welcome to Our Table"}
          </h2>
        </div>

        <div className="restaurant-luxury-grid">

          <article className="restaurant-info-card">
            <Clock size={30} strokeWidth={1.3} />

            <h3>{t.hours}</h3>

            <div className="restaurant-card-line"></div>

            <p>{t.weekdays}</p>
            <strong>11:00 – 15:00</strong>
            <p>{t.weekend}</p>
          </article>

          <article className="restaurant-info-card">
            <MapPin size={30} strokeWidth={1.3} />

            <h3>{t.location}</h3>

            <div className="restaurant-card-line"></div>

            <strong>Helsinki, Finland</strong>
            <p>{t.address}</p>
          </article>

          <article className="restaurant-info-card">
            <Mail size={30} strokeWidth={1.3} />

            <h3>{t.contact}</h3>

            <div className="restaurant-card-line"></div>

            <p>
              <Mail size={16} strokeWidth={1.4} />
              {t.email}: info@nordicspices.fi
            </p>

            <p>
              <Phone size={16} strokeWidth={1.4} />
              {t.phone}: +358 XX XXX XXXX
            </p>
          </article>

        </div>
      </section>

      <section className="restaurant-transport">

        <div className="restaurant-transport-icon">
          <Bus size={30} strokeWidth={1.3} />
        </div>

        <p className="restaurant-transport-label">
          {t.gettingHere}
        </p>

        <h2>{t.transport}</h2>

        <div className="restaurant-transport-line"></div>

        <p className="restaurant-transport-text">
          {t.transportInfo}
        </p>

      </section>

    </main>
  );
}

export default Restaurant;