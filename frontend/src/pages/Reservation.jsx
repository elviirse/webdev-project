import { useState } from "react";
import { CalendarDays, Clock, Users } from "lucide-react";
import { useLanguage } from "../LanguageContext.jsx";

function Reservation() {
  const { language } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: "2",
    specialRequests: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const text = {
    en: {
      label: "RESERVATIONS",
      title: "Reserve Your Table",
      intro:
        "Join us for a dining experience where Nordic ingredients meet the warmth of Indian flavours.",
      fullName: "Full Name",
      namePlaceholder: "Your name",
      email: "Email",
      date: "Date",
      time: "Time",
      selectTime: "Select time",
      guests: "Number of Guests",
      guest: "Guest",
      guestsWord: "Guests",
      requests: "Allergies & Special Requests",
      requestsPlaceholder:
        "Please tell us about allergies, dietary requirements or other requests.",
      button: "CHECK AVAILABILITY",
      thankYou: "Thank you",
      message:
        "Reservation details received. Final availability will be confirmed by the restaurant.",
      lunch: "Opening Hours",
      lunchHours: "Monday–Friday · 11:00–14:00",
      experience: "Fine Dining",
      experienceText: "Finnish ingredients · Asian soul",
      party: "Your Party",
      partyText: "Tables for 1–6 guests",
    },

    fi: {
      label: "PÖYTÄVARAUKSET",
      title: "Varaa Pöytä",
      intro:
        "Tule nauttimaan ruokailuelämyksestä, jossa pohjoismaiset raaka-aineet kohtaavat intialaisten makujen lämmön.",
      fullName: "Koko nimi",
      namePlaceholder: "Nimesi",
      email: "Sähköposti",
      date: "Päivämäärä",
      time: "Aika",
      selectTime: "Valitse aika",
      guests: "Vieraiden määrä",
      guest: "vieras",
      guestsWord: "vierasta",
      requests: "Allergiat ja erityistoiveet",
      requestsPlaceholder:
        "Kerro meille allergioista, ruokavaliovaatimuksista tai muista toiveista.",
      button: "TARKISTA SAATAVUUS",
      thankYou: "Kiitos",
      message:
        "Varaustiedot on vastaanotettu. Ravintola vahvistaa lopullisen saatavuuden.",
      lunch: "Lounas",
      lunchHours: "Maanantai–perjantai · 11:00–14:00",
      experience: "Fine Dining",
      experienceText: "Suomalaiset raaka-aineet · Intialainen sielu",
      party: "Seurueesi",
      partyText: "Pöydät 1–6 vieraalle",
    },
  };

  const t = text[language];

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="luxury-reservation-page">
      <section className="reservation-hero">
        <div className="reservation-hero-overlay"></div>

        <div className="reservation-hero-content">
          <p className="reservation-label">{t.label}</p>

          <h1>{t.title}</h1>

          <div className="reservation-ornament">
            <span></span>
            <span className="reservation-leaf">❧</span>
            <span></span>
          </div>

          <p>{t.intro}</p>
        </div>
      </section>

      <section className="reservation-main">
        <div className="reservation-info-panel">
          <p className="reservation-info-label">NORDIC SPICES</p>

          <h2>
            {language === "fi"
              ? "Suunnittele vierailusi"
              : "Plan Your Visit"}
          </h2>

          <div className="reservation-info-item">
            <Clock size={24} strokeWidth={1.4} />

            <div>
              <h3>{t.lunch}</h3>
              <p>{t.lunchHours}</p>
            </div>
          </div>

          <div className="reservation-info-item">
            <CalendarDays size={24} strokeWidth={1.4} />

            <div>
              <h3>{t.experience}</h3>
              <p>{t.experienceText}</p>
            </div>
          </div>

          <div className="reservation-info-item">
            <Users size={24} strokeWidth={1.4} />

            <div>
              <h3>{t.party}</h3>
              <p>{t.partyText}</p>
            </div>
          </div>

          <span className="reservation-big-leaf">❧</span>
        </div>

        <form
          className="reservation-form luxury-reservation-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="name">{t.fullName}</label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t.namePlaceholder}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">{t.email}</label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">{t.date}</label>

              <input
                id="date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">{t.time}</label>

              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              >
                <option value="">{t.selectTime}</option>
                <option value="11:00">11:00</option>
                <option value="11:30">11:30</option>
                <option value="12:00">12:00</option>
                <option value="12:30">12:30</option>
                <option value="13:00">13:00</option>
                <option value="13:30">13:30</option>
                <option value="14:00">14:00</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="guests">{t.guests}</label>

            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
            >
              {[1, 2, 3, 4, 5, 6].map((number) => (
                <option key={number} value={number}>
                  {number}{" "}
                  {number === 1 ? t.guest : t.guestsWord}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="specialRequests">
              {t.requests}
            </label>

            <textarea
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows="5"
              placeholder={t.requestsPlaceholder}
            />
          </div>

          <button
            type="submit"
            className="reservation-btn luxury-reservation-btn"
          >
            {t.button}
            <span>→</span>
          </button>

          {submitted && (
            <div className="reservation-message luxury-reservation-message">
              <strong>
                {t.thankYou}, {formData.name}.
              </strong>

              <p>{t.message}</p>
            </div>
          )}
        </form>
      </section>
    </main>
  );
}

export default Reservation;