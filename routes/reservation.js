const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");
const reservationController = require("../controllers/reservation");

router.get(
  "/reservations",
  [authCheck, adminCheck],
  reservationController.getAllReservations
);

router.get(
  "/user/reservation/:id",
  [authCheck],
  reservationController.getUserReservations
);

router.post("/reservation", [authCheck], reservationController.bookReservation);

router.put(
  "/reservation/:reservationId",
  [authCheck, adminCheck],
  reservationController.updateReservationStatus
);

router.delete(
  "/reservation/:reservationId",
  [authCheck],
  reservationController.deleteReservation
);

module.exports = router;
