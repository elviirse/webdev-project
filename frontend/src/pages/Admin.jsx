import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService.js";

import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getOrders,
  updateOrderStatus,
  getReservations,
  updateReservationStatus,
} from "../services/adminService.js";

const emptyForm = {
  name: "",
  nameFi: "",
  description: "",
  descriptionFi: "",
  price: "",
  menuType: "lunch",
  category: "buffet",
  dayOfWeek: "Monday",
  glutenFree: false,
  lactoseFree: false,
  vegetarian: false,
  vegan: false,
  isActive: true,
};

const fineDiningCategories = [
  { value: "amuse_bouche", label: "Amuse-Bouche" },
  { value: "starter", label: "Starter" },
  { value: "soup", label: "Soup" },
  { value: "main", label: "Main Course" },
  { value: "side", label: "Side" },
  { value: "dessert", label: "Dessert" },
  {
    value: "drink",
    label: "Signature Non-Alcoholic Drink",
  },
  { value: "tasting_menu", label: "Tasting Menu" },
];

const orderStatuses = [
  "pending",
  "preparing",
  "ready",
  "completed",
  "cancelled",
];

const reservationStatuses = ["pending", "confirmed", "cancelled", "completed"];

function Admin() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [activeSection, setActiveSection] = useState("menu");

  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const data = await getCurrentUser(token);

        if (data.customer.role !== "admin") {
          navigate("/account");
          return;
        }

        setAdmin(data.customer);

        const menu = await getMenuItems();
        setMenuItems(menu);
      } catch (err) {
        setError(
          err.response?.data?.message || "Could not load the admin dashboard.",
        );
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (name === "menuType") {
      setFormData((current) => ({
        ...current,
        menuType: value,
        category: value === "lunch" ? "buffet" : "starter",
        dayOfWeek: value === "lunch" ? current.dayOfWeek || "Monday" : "",
      }));

      return;
    }

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const refreshMenu = async () => {
    const menu = await getMenuItems();
    setMenuItems(menu);
  };

  const handleSubmitMenuItem = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    const menuData = {
      ...formData,
      price: Number(formData.price),

      dayOfWeek: formData.menuType === "lunch" ? formData.dayOfWeek : null,

      category: formData.menuType === "lunch" ? "buffet" : formData.category,
    };

    try {
      if (editingId) {
        await updateMenuItem(editingId, menuData);

        setMessage("Menu item updated successfully.");
      } else {
        await createMenuItem(menuData);

        setMessage("Menu item created successfully.");
      }

      await refreshMenu();

      setFormData(emptyForm);
      setEditingId(null);
    } catch (err) {
      setError(err.response?.data?.message || "Could not save menu item.");
    }
  };

  const handleEditMenuItem = (item) => {
    const itemMenuType = item.menuType || "lunch";

    setEditingId(item.id);

    setFormData({
      name: item.name || "",
      nameFi: item.nameFi || "",
      description: item.description || "",
      descriptionFi: item.descriptionFi || "",
      price: item.price ?? "",

      menuType: itemMenuType,

      category:
        item.category || (itemMenuType === "lunch" ? "buffet" : "starter"),

      dayOfWeek: itemMenuType === "lunch" ? item.dayOfWeek || "Monday" : "",

      glutenFree: Boolean(item.glutenFree),
      lactoseFree: Boolean(item.lactoseFree),
      vegetarian: Boolean(item.vegetarian),
      vegan: Boolean(item.vegan),
      isActive: Boolean(item.isActive),
    });

    setError("");
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
    setMessage("");
  };

  const handleArchiveMenuItem = async (id) => {
    const confirmed = window.confirm(
      "Archive this menu item? It will disappear from the customer menu but remain in the database.",
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setMessage("");

      await deleteMenuItem(id);

      await refreshMenu();

      if (editingId === id) {
        setEditingId(null);
        setFormData(emptyForm);
      }

      setMessage("Menu item archived successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Could not archive menu item.");
    }
  };

  const handleRestoreMenuItem = async (item) => {
    try {
      setError("");
      setMessage("");

      await updateMenuItem(item.id, {
        name: item.name,
        nameFi: item.nameFi || "",
        description: item.description || "",
        descriptionFi: item.descriptionFi || "",
        price: Number(item.price),

        menuType: item.menuType || "lunch",

        category:
          item.category ||
          (item.menuType === "fine_dining" ? "starter" : "buffet"),

        dayOfWeek:
          item.menuType === "fine_dining" ? null : item.dayOfWeek || "Monday",

        glutenFree: Boolean(item.glutenFree),

        lactoseFree: Boolean(item.lactoseFree),

        vegetarian: Boolean(item.vegetarian),

        vegan: Boolean(item.vegan),

        isActive: true,
      });

      await refreshMenu();

      setMessage("Menu item restored successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Could not restore menu item.");
    }
  };

  const loadOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load orders.");
    }
  };

  const loadReservations = async () => {
    try {
      const data = await getReservations();

      setReservations(data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load reservations.");
    }
  };

  const handleSectionChange = async (section) => {
    setActiveSection(section);
    setError("");
    setMessage("");

    if (section === "orders") {
      await loadOrders();
    }

    if (section === "reservations") {
      await loadReservations();
    }
  };

  const handleOrderStatusChange = async (id, status) => {
    setError("");
    setMessage("");

    try {
      await updateOrderStatus(id, status);

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === id ? { ...order, status } : order,
        ),
      );

      setMessage("Order status updated successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Could not update order status.");
    }
  };

  const handleReservationStatusChange = async (id, status) => {
    setError("");
    setMessage("");

    try {
      await updateReservationStatus(id, status);

      setReservations((currentReservations) =>
        currentReservations.map((reservation) =>
          reservation.id === id
            ? {
                ...reservation,
                status,
              }
            : reservation,
        ),
      );

      setMessage("Reservation status updated successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Could not update reservation status.",
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  if (loading) {
    return <main className="admin-page">Loading admin dashboard...</main>;
  }

  return (
    <main className="admin-page">
      <section className="admin-container">
        <h1>Admin Dashboard</h1>

        <p>Welcome, {admin?.name}</p>

        <div className="admin-navigation">
          <button type="button" onClick={() => handleSectionChange("menu")}>
            Manage Menu
          </button>

          <button type="button" onClick={() => handleSectionChange("orders")}>
            Manage Orders
          </button>

          <button
            type="button"
            onClick={() => handleSectionChange("reservations")}
          >
            Manage Reservations
          </button>
        </div>

        {error && <p className="auth-error">{error}</p>}

        {message && <p className="auth-success">{message}</p>}

        {activeSection === "menu" && (
          <section className="admin-section">
            <h2>{editingId ? "Edit Menu Item" : "Add Menu Item"}</h2>

            <form onSubmit={handleSubmitMenuItem}>
              <label htmlFor="menuType">Menu Type</label>

              <select
                id="menuType"
                name="menuType"
                value={formData.menuType}
                onChange={handleChange}
              >
                <option value="lunch">Lunch Menu</option>

                <option value="fine_dining">À La Carte Menu</option>
              </select>

              <label htmlFor="name">Dish Name</label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label htmlFor="nameFi">Dish Name in Finnish</label>

              <input
                id="nameFi"
                name="nameFi"
                type="text"
                value={formData.nameFi}
                onChange={handleChange}
              />

              <label htmlFor="description">Description</label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />

              <label htmlFor="descriptionFi">Description in Finnish</label>

              <textarea
                id="descriptionFi"
                name="descriptionFi"
                value={formData.descriptionFi}
                onChange={handleChange}
              />

              <label htmlFor="price">Price</label>

              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />

              {formData.menuType === "lunch" && (
                <>
                  <label htmlFor="dayOfWeek">Day</label>

                  <select
                    id="dayOfWeek"
                    name="dayOfWeek"
                    value={formData.dayOfWeek}
                    onChange={handleChange}
                  >
                    <option value="Monday">Monday</option>

                    <option value="Tuesday">Tuesday</option>

                    <option value="Wednesday">Wednesday</option>

                    <option value="Thursday">Thursday</option>

                    <option value="Friday">Friday</option>
                  </select>
                </>
              )}

              {formData.menuType === "fine_dining" && (
                <>
                  <label htmlFor="category">Category</label>

                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    {fineDiningCategories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </>
              )}

              <div className="admin-checkboxes">
                <label>
                  <input
                    type="checkbox"
                    name="glutenFree"
                    checked={formData.glutenFree}
                    onChange={handleChange}
                  />
                  Gluten Free
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="lactoseFree"
                    checked={formData.lactoseFree}
                    onChange={handleChange}
                  />
                  Lactose Free
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="vegetarian"
                    checked={formData.vegetarian}
                    onChange={handleChange}
                  />
                  Vegetarian
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="vegan"
                    checked={formData.vegan}
                    onChange={handleChange}
                  />
                  Vegan
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                  />
                  Active
                </label>
              </div>

              <button type="submit">
                {editingId ? "Save Changes" : "Add Menu Item"}
              </button>

              {editingId && (
                <button type="button" onClick={handleCancelEdit}>
                  Cancel Edit
                </button>
              )}
            </form>

            <h2>Current Menu</h2>

            {menuItems.length === 0 ? (
              <p>No menu items found.</p>
            ) : (
              menuItems.map((item) => (
                <div key={item.id} className="admin-menu-item">
                  <div>
                    <strong>{item.name}</strong>

                    {item.nameFi && <p>{item.nameFi}</p>}

                    <p>
                      {item.menuType === "fine_dining"
                        ? `À La Carte — ${item.category || "No category"}`
                        : `Lunch — ${item.dayOfWeek || "No day"}`}
                      {" — €"}
                      {Number(item.price).toFixed(2)}
                    </p>

                    <p>
                      Status: {Boolean(item.isActive) ? "Active" : "Archived"}
                    </p>
                  </div>

                  <div className="admin-item-actions">
                    <button
                      type="button"
                      onClick={() => handleEditMenuItem(item)}
                    >
                      Edit
                    </button>

                    {Boolean(item.isActive) ? (
                      <button
                        type="button"
                        onClick={() => handleArchiveMenuItem(item.id)}
                      >
                        Archive
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleRestoreMenuItem(item)}
                      >
                        Restore
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </section>
        )}

        {activeSection === "orders" && (
          <section className="admin-section">
            <h2>Order Management</h2>

            {orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="admin-order-item">
                  <h3>Order #{order.id}</h3>

                  <p>
                    <strong>Customer ID:</strong> {order.customerId}
                  </p>

                  <p>
                    <strong>Order date:</strong> {order.orderDate}
                  </p>

                  <p>
                    <strong>Pickup time:</strong> {order.pickupTime}
                  </p>

                  <p>
                    <strong>Total:</strong> €
                    {Number(order.totalPrice).toFixed(2)}
                  </p>

                  <label htmlFor={`order-status-${order.id}`}>Status</label>

                  <select
                    id={`order-status-${order.id}`}
                    value={order.status}
                    onChange={(event) =>
                      handleOrderStatusChange(order.id, event.target.value)
                    }
                  >
                    {orderStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              ))
            )}
          </section>
        )}

        {activeSection === "reservations" && (
          <section className="admin-section">
            <h2>Reservation Management</h2>

            {reservations.length === 0 ? (
              <p>No reservations found.</p>
            ) : (
              reservations.map((reservation) => (
                <div key={reservation.id} className="admin-reservation-item">
                  <h3>Reservation #{reservation.id}</h3>

                  <p>
                    <strong>Customer ID:</strong> {reservation.customerId}
                  </p>

                  <p>
                    <strong>Table ID:</strong> {reservation.tableId}
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
                    <strong>Special requests:</strong>{" "}
                    {reservation.specialRequests || "None"}
                  </p>

                  <label htmlFor={`reservation-status-${reservation.id}`}>
                    Status
                  </label>

                  <select
                    id={`reservation-status-${reservation.id}`}
                    value={reservation.status}
                    onChange={(event) =>
                      handleReservationStatusChange(
                        reservation.id,
                        event.target.value,
                      )
                    }
                  >
                    {reservationStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              ))
            )}
          </section>
        )}

        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </section>
    </main>
  );
}

export default Admin;
