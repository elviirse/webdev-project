import api from "./api.js";

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// =========================
// MENU
// =========================

export const getMenuItems = async () => {
  const response = await api.get("/api/menu");
  return response.data;
};

export const createMenuItem = async (menuItem) => {
  const response = await api.post("/api/menu", menuItem, {
    headers: authHeaders(),
  });

  return response.data;
};

export const updateMenuItem = async (id, menuItem) => {
  const response = await api.patch(`/api/menu/${id}`, menuItem, {
    headers: authHeaders(),
  });

  return response.data;
};

export const deleteMenuItem = async (id) => {
  const response = await api.delete(`/api/menu/${id}`, {
    headers: authHeaders(),
  });

  return response.data;
};

// =========================
// ORDERS
// =========================

export const getOrders = async () => {
  const response = await api.get("/api/orders", {
    headers: authHeaders(),
  });

  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await api.patch(
    `/api/orders/${id}/status`,
    { status },
    {
      headers: authHeaders(),
    },
  );

  return response.data;
};

// =========================
// RESERVATIONS
// =========================

export const getReservations = async () => {
  const response = await api.get("/api/reservations", {
    headers: authHeaders(),
  });

  return response.data;
};

export const updateReservationStatus = async (id, status) => {
  const response = await api.patch(
    `/api/reservations/${id}/status`,
    { status },
    {
      headers: authHeaders(),
    },
  );

  return response.data;
};

export const archiveReservation = async (id) => {
  const response = await api.patch(
    `/api/reservations/${id}/archive`,
    {},
    {
      headers: authHeaders(),
    },
  );

  return response.data;
};
