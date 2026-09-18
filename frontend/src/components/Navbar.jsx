import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/" className="logo">
        NORDIC SPICES
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/menu">Lunch Menu</Link>
        <Link to="/reservation">Reservation</Link>
        <Link to="/restaurant">Restaurant</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;