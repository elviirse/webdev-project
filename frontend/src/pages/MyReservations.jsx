import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";

function MyReservations() {
  const navigate = useNavigate();

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadReservations = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!token || !user) {
        navigate("/login");
        return;
      }

      try {
        const response = await api.get(
          `/api/reservations/customer/${user.customerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setReservations(response.data);
      } catch (err) {
        console.error("My Reservations error:", err);
        setError("Could not load your reservations.");
      } finally {
        setLoading(false);
      }
    };

    loadReservations();
  }, [navigate]);

  if (loading) {
    return (
      <main className="menu-page">
        <section className="luxury-menu-header">
          <p className="luxury-menu-eyebrow">NORDIC SPICES</p>
          <h1>Loading Reservations...</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="menu-page">
      <section className="luxury-menu-header">
        <p className="luxury-menu-eyebrow">NORDIC SPICES</p>

        <h1>My Reservations</h1>

        {error && <p>{error}</p>}

        {!error && reservations.length === 0 && (
          <p className="luxury-menu-intro">
            You have no reservations yet.
          </p>
        )}

        {reservations.map((reservation) => (
          <div key={reservation.id}>
            <h3>Reservation #{reservation.id}</h3>

            <p>
              <strong>Status:</strong> {reservation.status}
            </p>

            <p>
              <strong>Date:</strong> {reservation.date}
            </p>

            <p>
              <strong>Time:</strong> {reservation.time}
            </p>

            <p>
              <strong>Guests:</strong> {reservation.numberOfGuests}
            </p>

            <p>
              <strong>Table:</strong> {reservation.tableId}
            </p>

            {reservation.specialRequests && (
              <p>
                <strong>Special Requests:</strong>{" "}
                {reservation.specialRequests}
              </p>
            )}

            <hr />
          </div>
        ))}

        <Link
          to="/account"
          className="details-link luxury-details-link"
        >
          BACK TO ACCOUNT
          <span>→</span>
        </Link>
      </section>
    </main>
  );
}

export default MyReservations;