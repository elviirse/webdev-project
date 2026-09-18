// Temporary reservation data
let reservations = [];
let nextReservationId = 1;

// Create a new reservation
export const createReservation = (req, res) => {
  const { customerId, date, time, numberOfGuests, specialRequests } = req.body;

  // Basic validation
  if (
    !customerId ||
    Number(customerId) < 1 ||
    !date ||
    !time ||
    numberOfGuests === undefined
  ) {
    return res.status(400).json({
      message:
        "Valid customer ID, date, time and number of guests are required",
    });
  }

  if (Number(numberOfGuests) < 1) {
    return res.status(400).json({
      message: "Number of guests must be at least 1",
    });
  }

  const newReservation = {
    id: nextReservationId++,
    customerId,
    date,
    time,
    numberOfGuests: Number(numberOfGuests),
    specialRequests: specialRequests || "",
    status: "pending",
    createdAt: new Date(),
  };

  reservations.push(newReservation);

  res.status(201).json({
    message: "Reservation created successfully",
    reservation: newReservation,
  });
};

// Get all reservations
export const getAllReservations = (req, res) => {
  res.json(reservations);
};

// Get reservation by ID
export const getReservationById = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: "Invalid reservation ID",
    });
  }

  const reservation = reservations.find((reservation) => reservation.id === id);

  if (!reservation) {
    return res.status(404).json({
      message: "Reservation not found",
    });
  }

  res.json(reservation);
};
// Update reservation status
export const updateReservationStatus = (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body || {};

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: "Invalid reservation ID",
    });
  }

  const allowedStatuses = ["pending", "confirmed", "cancelled", "completed"];

  const reservation = reservations.find((reservation) => reservation.id === id);

  if (!reservation) {
    return res.status(404).json({
      message: "Reservation not found",
    });
  }

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid reservation status",
    });
  }

  reservation.status = status;

  res.json({
    message: "Reservation status updated successfully",
    reservation,
  });
};
