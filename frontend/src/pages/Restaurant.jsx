import { useLanguage } from "../LanguageContext.jsx";

function Restaurant() {
  const { language } = useLanguage();

  const text = {
    en: {
      visit: "VISIT US",
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
    <div className="restaurant-page">
      <div className="restaurant-heading">
        <p className="section-small">{t.visit}</p>

        <h1>Nordic Spices</h1>

        <p>{t.intro}</p>
      </div>

      <div className="restaurant-info-grid">
        <section className="info-card">
          <h2>{t.hours}</h2>
          <p>{t.weekdays}</p>
          <p>11:00 – 15:00</p>
          <p>{t.weekend}</p>
        </section>

        <section className="info-card">
          <h2>{t.location}</h2>
          <p>Helsinki, Finland</p>
          <p>{t.address}</p>
        </section>

        <section className="info-card">
          <h2>{t.contact}</h2>
          <p>{t.email}: info@nordicspices.fi</p>
          <p>{t.phone}: +358 XX XXX XXXX</p>
        </section>
      </div>

      <section className="transport-section">
        <p className="section-small">{t.gettingHere}</p>

        <h2>{t.transport}</h2>

        <p>{t.transportInfo}</p>
      </section>
    </div>
  );
}

export default Restaurant;