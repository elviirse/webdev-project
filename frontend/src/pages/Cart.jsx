import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const [pickupTime, setPickupTime] = useState("");
  const [orderMessage, setOrderMessage] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  // save updated cart dishes in state and localStorage
  const saveCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Increase item quantity
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );

    saveCart(updatedCart);
  };

  // Decrease item quantity
  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      )
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);
  };

  // Remove item
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    saveCart(updatedCart);
  };

  // Calculate cart price total
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Send order to backend
  const placeOrder = async () => {
    setOrderMessage("");

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setOrderMessage("Please login before placing an order.");
      return;
    }

    if (cart.length === 0) {
      setOrderMessage("Your cart is empty.");
      return;
    }

    if (!pickupTime) {
      setOrderMessage("Please choose a pickup time.");
      return;
    }

    try {
      setPlacingOrder(true);

      const orderData = {
        customerId: user.customerId,

        items: cart.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
        })),

        pickupTime,
      };

      const response = await api.post("/api/orders", orderData);

      // Clear cart after successful order
      localStorage.removeItem("cart");
      setCart([]);

      // Go to confirmation page
      navigate("/order-confirmation", {
        state: {
          order: response.data,
        },
      });
    } catch (err) {
      console.error("Order error:", err);

      setOrderMessage(
        err.response?.data?.message || "Could not place the order.",
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <main className="menu-page">
      <section className="luxury-menu-header">
        <p className="luxury-menu-eyebrow">NORDIC SPICES</p>

        <h1>Your Cart</h1>

        {cart.length === 0 ? (
          <>
            <p className="luxury-menu-intro">Your cart is empty.</p>

            {orderMessage && <p>{orderMessage}</p>}
          </>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id}>
                <h3>{item.name}</h3>

                <p>
                  €{item.price.toFixed(2)} × {item.quantity}
                </p>

                <button type="button" onClick={() => decreaseQuantity(item.id)}>
                  −
                </button>

                <button type="button" onClick={() => increaseQuantity(item.id)}>
                  +
                </button>

                <button type="button" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </div>
            ))}

            <h2>Total: €{totalPrice.toFixed(2)}</h2>

            <div>
              <label htmlFor="pickupTime">
                <strong>Pickup Time:</strong>
              </label>

              <input
                id="pickupTime"
                type="datetime-local"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
              />

              <button
                type="button"
                onClick={placeOrder}
                disabled={placingOrder}
              >
                {placingOrder ? "Placing Order..." : "Place Order"}
              </button>
            </div>

            {orderMessage && <p>{orderMessage}</p>}
          </>
        )}
      </section>
    </main>
  );
}

export default Cart;
