import { Link, useLocation } from "react-router-dom";

function OrderConfirmation() {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <main className="menu-page">
      <section className="luxury-menu-header">
        <p className="luxury-menu-eyebrow">NORDIC SPICES</p>

        <h1>Order Confirmed</h1>

        {order ? (
          <>
            <p className="luxury-menu-intro">
              Thank you! Your pickup order has been placed successfully.
            </p>

            <div>
              <p>
                <strong>Order Number:</strong> #{order.id}
              </p>

              <p>
                <strong>Status:</strong> {order.status}
              </p>

              <p>
                <strong>Pickup Time:</strong>{" "}
                {new Date(order.pickupTime).toLocaleString()}
              </p>

              <p>
                <strong>Total:</strong> €{Number(order.totalPrice).toFixed(2)}
              </p>
            </div>
          </>
        ) : (
          <p className="luxury-menu-intro">
            Your order information is not available.
          </p>
        )}

        <Link to="/fine-dining" className="details-link luxury-details-link">
          BACK TO MENU
          <span>→</span>
        </Link>
      </section>
    </main>
  );
}

export default OrderConfirmation;
