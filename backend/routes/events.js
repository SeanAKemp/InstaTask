const router = require("express").Router();
let userModel = require("../models/user.model.js");
const { addCalendarEvent } = require("../src/addCalendarEvent.js");
const { deleteCalendarEvent } = require("../src/deleteCalendarEvent.js");
const { updateCalendar } = require("../src/updateCalendar.js");

router.route("/").get((req, res) => {
  userModel
    .findById(req.user._id)
    .then((user) => res.json(user.calendar.events))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const id = req.user._id;
  const newEvent = req.event;
  addCalendarEvent(id, newEvent)
    .then(() => console.log("Successfully added event to calendar."))
    .catch((err) => console.log("Error: " + err));
});

router.route("/delete").put((req, res) => {
  const id = req.user._id;
  const newEvent = req.event.uid;
  deleteCalendarEvent(id, newEvent)
    .then(() => console.log("Successfully deleted event from calendar."))
    .catch((err) => console.log("Error: " + err));
});

router.route("/update").put((req, res) => {
  const id = req.user._id;
  const calendarLink = req.user.calendarLink;
  let eventList = async () => {
    return await parseICS(calendarLink).then((list) => {
      return list;
    });
  };
  let tempList = eventList();
  tempList
    .then((list) => updateCalendar(id, list))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
