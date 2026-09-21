function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-brand">
          <h2>NORDIC SPICES</h2>

          <p>Finnish Ingredients. Indian Soul.</p>

          <a
            href="https://www.instagram.com/nordic_spices12/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="instagram-link"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="5"
                stroke="white"
                strokeWidth="2"
              />

              <circle
                cx="12"
                cy="12"
                r="4"
                stroke="white"
                strokeWidth="2"
              />

              <circle
                cx="17.5"
                cy="6.5"
                r="1"
                fill="white"
              />
            </svg>
          </a>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/menu">Menu</a>
          <a href="/reservation">Reservation</a>
          <a href="/restaurant">Restaurant</a>
        </div>

        <div className="footer-info">
          <h3>Contact</h3>

          <p>Helsinki, Finland</p>
          <p>info@nordicspices.fi</p>
          <p>+358 XX XXX XXXX</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Nordic Spices. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;