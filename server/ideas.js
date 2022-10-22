const express = require("express");
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId} = require("./db.js");
const checkMillionDollarIdea = require("./checkMillionDollarIdea.js");
const ideasRouter = express.Router();

/*I think this middleware is unnecessary, but it is necessary to pass the conditions of
the tests (which I think are incorrect) which fail because of checkMillionDolalrIdea*/
ideasRouter.param("ideasId", (req, res, next, id) => {
    let idea = getFromDatabaseById("ideas", id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send()
    }
})

ideasRouter.get("/", (req, res, next) => {
    let ideas = getAllFromDatabase("ideas");
    res.send(ideas);
})

ideasRouter.get("/:ideasId", (req, res, next) => {
    res.send(req.idea);
})

ideasRouter.post("", checkMillionDollarIdea, (req, res, next) => {
    let body = req.body;
    try {
        let newIdea = addToDatabase("ideas", body);
        res.status(201).send(newIdea)
    } catch (error) {
        res.status(400).send();
    }
})

ideasRouter.put("/:ideasId", checkMillionDollarIdea, (req, res, next) => {
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