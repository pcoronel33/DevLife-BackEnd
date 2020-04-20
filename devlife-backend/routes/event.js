const express = require("express");
const {
  getEvents,
  createEvent,
  eventsByUser,
  eventById,
  isPoster,
  updateEvent,
  deleteEvent,
  photo,
  singleEvent,
  like,
  unlike,
  comment,
  uncomment,
  updateComment
} = require("../controllers/event");
const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { createEventValidator } = require("../validator/index");

const router = express.Router();

router.get("/events", getEvents);

// like unlike
router.put("/event/like", requireSignin, like);
router.put("/event/unlike", requireSignin, unlike);

// comments
router.put("/event/comment", requireSignin, comment);
router.put("/event/uncomment", requireSignin, uncomment);
router.put("/event/updatecomment", requireSignin, updateComment);

// event routes
router.post(
  "/event/new/:userId",
  requireSignin,
  createEvent,
  createEventValidator
);

router.post(
  "/event/new/:userId",
  requireSignin,
  createEvent,
  createEventValidator
);
router.get("/events/by/:userId", requireSignin, eventsByUser);
router.get("/event/:eventId", singleEvent);
router.put("/event/:eventId", requireSignin, isPoster, updateEvent);
router.delete("/event/:eventId", requireSignin, isPoster, deleteEvent);
// photo
router.get("/event/photo/:eventId", photo);

// any route containing :userId, our app will first execute userById()
router.param("userId", userById);
// any route containing :eventId, our app will first execute eventById()
router.param("eventId", eventById);

module.exports = router;
