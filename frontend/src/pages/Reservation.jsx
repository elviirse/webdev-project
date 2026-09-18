import { useState } from "react";

function Reservation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: "2",
    specialRequests: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    setMessage(
      "Reservation details received. Final availability will be confirmed by the restaurant."
    );
  }

  return (
    <div className="reservation-page">

      <div className="reservation-heading">
        <p className="section-small">NORDIC SPICES</p>
        <h1>Reserve a Table</h1>

        <p>
          Join us for a Finnish–Indian fine-dining lunch experience.
        </p>
      </div>

      <form className="reservation-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="name">Full Name</label>

          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>

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
            <label htmlFor="date">Date</label>

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
            <label htmlFor="time">Time</label>

            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            >
              <option value="">Select time</option>
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
          <label htmlFor="guests">Number of Guests</label>

          <select
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
          >
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
            <option value="5">5 Guests</option>
            <option value="6">6 Guests</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="specialRequests">
            Allergies & Special Requests
          </label>

          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows="5"
            placeholder="Please tell us about allergies, dietary requirements or other requests."
          />
        </div>

        <button type="submit" className="reservation-btn">
          Check Availability
        </button>

        {message && (
          <div className="reservation-message">
            <strong>Thank you, {formData.name}.</strong>
            <p>{message}</p>
          </div>
        )}

      </form>

    </div>
  );
}

export default Reservation;