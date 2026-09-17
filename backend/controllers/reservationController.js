// Temporary reservation data
let reservations = [];
let nextReservationId = 1;

// Create a new reservation
export const createReservation = (req, res) => {
  const { customerId, date, time, numberOfGuests, specialRequests } = req.body;

  // Basic validation
  if (!customerId || !date || !time || !numberOfGuests) {
    return res.status(400).json({
      message: "Customer ID, date, time and number of guests are required",
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

// Get one reservation by ID
export const getReservationById = (req, res) => {
  const id = Number(req.params.id);

  const reservation = reservations.find((reservation) => reservation.id === id);

  if (!reservation) {
    return res.status(404).json({
      message: "Reservation not found",
    });
  }

  res.json(reservation);
};
