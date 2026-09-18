function Restaurant() {
  return (
    <div className="restaurant-page">
      <div className="restaurant-heading">
        <p className="section-small">VISIT US</p>
        <h1>Nordic Spices</h1>
        <p>
          Finnish ingredients meet the warmth and flavours of Indian cuisine.
        </p>
      </div>

      <div className="restaurant-info-grid">
        <section className="info-card">
          <h2>Opening Hours</h2>
          <p>Monday – Friday</p>
          <p>11:00 – 15:00</p>
          <p>Saturday – Sunday: Closed</p>
        </section>

        <section className="info-card">
          <h2>Location</h2>
          <p>Helsinki, Finland</p>
          <p>Restaurant address will be added here.</p>
        </section>

        <section className="info-card">
          <h2>Contact</h2>
          <p>Email: info@nordicspices.fi</p>
          <p>Phone: +358 XX XXX XXXX</p>
        </section>
      </div>

      <section className="transport-section">
        <p className="section-small">GETTING HERE</p>
        <h2>Public Transport</h2>
        <p>
          Public transport information will be provided using
          an open transport API.
        </p>
      </section>
    </div>
  );
}

export default Restaurant;