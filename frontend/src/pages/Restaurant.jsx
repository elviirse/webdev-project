import { useEffect, useState } from "react";

import { Clock, MapPin, Mail, Phone, Bus } from "lucide-react";
import { useLanguage } from "../LanguageContext.jsx";
import api from "../services/api.js";

function Restaurant() {
  const { language } = useLanguage();
  const [hslStops, setHslStops] = useState([]);
  const [hslLoading, setHslLoading] = useState(true);
  const [hslError, setHslError] = useState("");

  useEffect(() => {
    const fetchHslStops = async () => {
      try {
        setHslLoading(true);

        const response = await api.get("/api/hsl/stops");

        setHslStops(response.data);
        setHslError("");
      } catch (error) {
        console.error("Error loading HSL stops:", error);
        setHslError(
          language === "fi"
            ? "Julkisen liikenteen tietoja ei voitu ladata."
            : "Public transport information could not be loaded.",
        );
      } finally {
        setHslLoading(false);
      }
    };

    fetchHslStops();
  }, [language]);

  const text = {
    en: {
      visit: "VISIT US",
      title: "Nordic Spices",
      intro:
        "Finnish ingredients meet the warmth and flavours of Asian cuisine.",
      hours: "Opening Hours",
      weekdays: "Monday – Friday",
      weekend: "Saturday – Sunday: Closed",
      location: "Location",
      address: "",
      contact: "Contact",
      email: "Email",
      phone: "Phone",
      gettingHere: "GETTING HERE",
      transport: "Public Transport",
    },

    fi: {
      visit: "TERVETULOA",
      title: "Nordic Spices",

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
          <p className="restaurant-luxury-label">{t.visit}</p>

          <h1>{t.title}</h1>

          <div className="restaurant-ornament">
            <span></span>
            <span className="restaurant-leaf">❧</span>
            <span></span>
          </div>

          <p className="restaurant-luxury-intro">{t.intro}</p>
        </div>
      </section>

      <section className="restaurant-details-section">
        <div className="restaurant-details-heading">
          <p>
            {language === "fi" ? "SUUNNITTELE VIERAILUSI" : "PLAN YOUR VISIT"}
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
            <strong>10:00 – 22:00</strong>
            <p>{t.weekend}</p>
          </article>

          <article className="restaurant-info-card">
            <MapPin size={30} strokeWidth={1.3} />

            <h3>{t.location}</h3>

            <div className="restaurant-card-line"></div>

            <strong>Leiritie 1, 01600 Vantaa, Finland</strong>
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
              {t.phone}: +358 123 456 789
            </p>
          </article>
        </div>
      </section>

      <section className="restaurant-transport">
        <div className="restaurant-transport-icon">
          <Bus size={30} strokeWidth={1.3} />
        </div>

        <p className="restaurant-transport-label">{t.gettingHere}</p>

        <h2>{t.transport}</h2>

        <div className="restaurant-transport-line"></div>

        <p className="restaurant-transport-text">{t.transportInfo}</p>
        {hslLoading && (
          <p className="restaurant-transport-text">
            {language === "fi"
              ? "Ladataan lähimpiä pysäkkejä..."
              : "Loading nearby public transport stops..."}
          </p>
        )}

        {hslError && <p className="restaurant-transport-text">{hslError}</p>}

        {!hslLoading && !hslError && hslStops.length > 0 && (
          <div className="restaurant-hsl-stops">
            <h3>
              {language === "fi" ? "Lähimmät HSL-pysäkit" : "Nearest HSL Stops"}
            </h3>

            {hslStops.map((stop) => (
              <div className="restaurant-hsl-stop" key={stop.id}>
                <Bus size={18} strokeWidth={1.4} />

                <div>
                  <strong>{stop.name}</strong>
                  <p>
                    {stop.vehicleMode === "BUS"
                      ? language === "fi"
                        ? "Bussi"
                        : "Bus"
                      : stop.vehicleMode}
                    {" · "}
                    {stop.distance} m
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <iframe
          src="https://www.google.com/maps?q=Leiritie+1,+01600+Vantaa&output=embed"
          title="Restaurant location"
          loading="lazy"
          width="100%"
          height="380"
          style={{ border: 0, maxWidth: "700px" }}
        ></iframe>
      </section>
    </main>
  );
}

export default Restaurant;
