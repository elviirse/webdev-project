import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>NORDIC SPICES</h2>
          <p>Finnish Ingredients. Indian Soul.</p>
        </div>

        <div className="footer-links">
          <h3>Explore</h3>
          <Link to="/">Home</Link>
          <Link to="/menu">Lunch Menu</Link>
          <Link to="/reservation">Reservation</Link>
          <Link to="/restaurant">Restaurant</Link>
        </div>

        <div className="footer-info">
          <h3>Opening Hours</h3>
          <p>Monday – Friday</p>
          <p>11:00 – 15:00</p>
          <p>Helsinki, Finland</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Nordic Spices. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;