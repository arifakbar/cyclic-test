const Reservation = require("../models/reservation");

exports.getAllReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.status(200).json({
      data: reservations,
      message: "Reservations fetched successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.getUserReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find({ reservedBy: req.params.id });
    res.status(200).json({
      data: reservations,
      message: "Fetched user reservations successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.updateReservationStatus = async (req, res, next) => {
  const { reservationId } = req.params;
  try {
    const { status } = req.body;
    const reservation = await Reservation.findByIdAndUpdate(
      reservationId,
      {
        status: status,
      },
      { new: true }
    );
    res.status(201).json({
      data: reservation,
      message: "Reservation status updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.deleteReservation = async (req, res, next) => {
  const { reservationId } = req.params;
  try {
    await Reservation.findByIdAndDelete(reservationId);
    res.status(200).json({ message: "Successfully deleted reservation" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.bookReservation = async (req, res, next) => {
  try {
    const newReservation = new Reservation(req.body);
    await newReservation.save();
    res.status(201).json({
      data: newReservation,
      message: "Reservation created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Some error occured" });
  }
};
