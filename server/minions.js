const express = require("express");
const db = require("./db.js");
const minionsRouter = express.Router();

minionsRouter.get("", (req, res, next) => {
    let allMinions = db.getAllFromDatabase("minions")
    res.send(allMinions);
});

minionsRouter.get("/:minionsId", (req, res, next) => {
    let minion = db.getFromDatabaseById("minions", req.params.minionsId);
    if (minion) {
        res.send(minion);
    } else {
        res.status(404).send();
    }
})

minionsRouter.post("/", (req, res, next) => {
    let body = req.body;
    try {
        let newMinion = db.addToDatabase("minions", body);
        res.status(201).send(newMinion)
    } catch (error) {
        res.status(400).send()
    }
})

minionsRouter.put("/:minionsId", (req, res, next) => {
    let body = req.body;
    try {
        let updatedMinion = db.updateInstanceInDatabase("minions", body);
        if (updatedMinion) {
            res.send(updatedMinion);
        } else {
            res.status(404).send()
        }
    } catch (error) {
        res.status(400).send();
    }
})

minionsRouter.delete("/:minionsId", (req, res, next) => {
    if (db.deleteFromDatabasebyId("minions", req.params.id)) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
})

module.exports = minionsRouter;