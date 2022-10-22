const express = require("express");
const { getAllFromDatabase, addToDatabase, createMeeting, deleteAllFromDatabase } = require("./db.js");
const meetingsRouter = express.Router();

meetingsRouter.get("/", (req, res, next) => {
    let meetings = getAllFromDatabase("meetings");
    res.send(meetings);
})

meetingsRouter.post("/", (req, res, next) => {
    try {
        let newMeeting = createMeeting();
        addToDatabase("meetings", newMeeting);
        res.status(201).send(newMeeting);
    } catch (error) {
        //Will probably never reach this point because the new meeting is defined within the server rather than in the request body
        res.status(400).send();
    }    
})

meetingsRouter.delete("/", (req, res, next) => {
    deleteAllFromDatabase("meetings");
    res.status(204).send();
})

module.exports = meetingsRouter;