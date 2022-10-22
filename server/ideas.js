const express = require("express");
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId} = require("./db.js");
const ideasRouter = express.Router();

ideasRouter.get("/", (req, res, next) => {
    let ideas = getAllFromDatabase("ideas");
    res.send(ideas);
})

ideasRouter.get("/:ideasId", (req, res, next) => {
    let idea = getFromDatabaseById("ideas", req.params.ideasId);
    if (idea) {
        res.send(idea);
    } else {
        res.status(404).send();
    }
})

ideasRouter.post("", (req, res, next) => {
    let body = req.body;
    try {
        let newIdea = addToDatabase("ideas", body);
        res.status(201).send(newIdea)
    } catch (error) {
        res.status(400).send();
    }
})

ideasRouter.put("/:ideaId", (req, res, next) => {
    let body = req.body;
    try {
        let updatedIdea = updateInstanceInDatabase("ideas", body);
        if (updatedIdea) {
            res.send(updatedIdea); 
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(400).send();
    }
})

ideasRouter.delete("/:ideasId", (req, res, next) => {
    if (deleteFromDatabasebyId("ideas", req.params.ideasId)) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
})



module.exports = ideasRouter;