import { useState } from "react";
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
      title: "Reserve a Table",
      intro: "Join us for a Finnish–Indian fine-dining lunch experience.",
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
      button: "Check Availability",
      thankYou: "Thank you",
      message:
        "Reservation details received. Final availability will be confirmed by the restaurant.",
    },

    fi: {
      title: "Varaa pöytä",
      intro:
        "Tule nauttimaan suomalais-intialaisesta fine dining -lounaskokemuksesta.",
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
      button: "Tarkista saatavuus",
      thankYou: "Kiitos",
      message:
        "Varaustiedot on vastaanotettu. Ravintola vahvistaa lopullisen saatavuuden.",
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
    <div className="reservation-page">

      <div className="reservation-heading">
        <p className="section-small">NORDIC SPICES</p>

        <h1>{t.title}</h1>

        <p>{t.intro}</p>
      </div>

      <form className="reservation-form" onSubmit={handleSubmit}>

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
                {number} {number === 1 ? t.guest : t.guestsWord}
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

        <button type="submit" className="reservation-btn">
          {t.button}
        </button>

        {submitted && (
          <div className="reservation-message">
            <strong>
              {t.thankYou}, {formData.name}.
            </strong>

            <p>{t.message}</p>
          </div>
        )}

      </form>

    </div>
  );
}

export default Reservation;