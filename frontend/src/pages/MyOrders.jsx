import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";

function MyOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!token || !user) {
        navigate("/login");
        return;
      }

      try {
        const response = await api.get(
          `/api/orders/customer/${user.customerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setOrders(response.data);
      } catch (err) {
        console.error("My Orders error:", err);
        setError("Could not load your orders.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [navigate]);

  if (loading) {
    return (
      <main className="menu-page">
        <section className="luxury-menu-header">
          <p className="luxury-menu-eyebrow">NORDIC SPICES</p>
          <h1>Loading Orders...</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="menu-page">
      <section className="luxury-menu-header">
        <p className="luxury-menu-eyebrow">NORDIC SPICES</p>
        <h1>My Orders</h1>

        {error && <p>{error}</p>}

        {!error && orders.length === 0 && (
          <p className="luxury-menu-intro">
            You have not placed any orders yet.
          </p>
        )}

        {orders.map((order) => (
          <div key={order.id}>
            <h3>Order #{order.id}</h3>

            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <p>
              <strong>Total:</strong> €{Number(order.totalPrice).toFixed(2)}
            </p>

            <p>
              <strong>Pickup Time:</strong> {order.pickupTime}
            </p>

            <p>
              <strong>Order Date:</strong> {order.orderDate}
            </p>

            <hr />
          </div>
        ))}

        <Link to="/account" className="details-link luxury-details-link">
          Back to account
          <span>→</span>
        </Link>
      </section>
    </main>
  );
}

export default MyOrders;
