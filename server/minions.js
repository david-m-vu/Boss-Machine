const express = require("express");
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require("./db.js");
const minionsRouter = express.Router();

minionsRouter.get("", (req, res, next) => {
    let allMinions = getAllFromDatabase("minions")
    res.send(allMinions);
});

minionsRouter.get("/:minionsId", (req, res, next) => {
    let minion = getFromDatabaseById("minions", req.params.minionsId);
    if (minion) {
        res.send(minion);
    } else {
        res.status(404).send();
    }
})

minionsRouter.post("/", (req, res, next) => {
    let body = req.body;
    try {
        let newMinion = addToDatabase("minions", body);
        res.status(201).send(newMinion)
    } catch (error) {
        res.status(400).send()
    }
})

minionsRouter.put("/:minionsId", (req, res, next) => {
    let body = req.body;
    try {
        let updatedMinion = updateInstanceInDatabase("minions", body);
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
    if (deleteFromDatabasebyId("minions", req.params.minionsId)) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
})

//work endpoints UNFINISHED
// minionsRouter.get("/:minionsId/work", (req, res, next) => {
//     let work = getFromDatabaseById("work", req.params.minionsId);

//     if (work) {
//         res.send(work);
//     } else {
//         res.status(404).send();
//     }
// })

module.exports = minionsRouter;