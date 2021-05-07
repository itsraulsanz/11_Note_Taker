// LOAD DATA
const path = require("path");

const dbFunctionality = require("../db/db")

// ROUTING

module.exports = (app) => {
//GET "/api/notes" will respond with all the notes from db.json
app.get("/api/notes", (request, response) => {
    console.log("get request made")
    dbFunctionality.getAllNotes().then((notes) => {
        return response.json(notes)
    })
})

//POST "api/notes" add a note to the db.json
app.post("/api/notes", (request, response) => {
    console.log("post request made")
    dbFunctionality.addNewNote(request.body).then((note) => response.json(note))
})

//DELETE "/api/notes" will delete a  note from the db.json file
app.delete("/api/notes/:id", (request, response) => {
    console.log("Delete request made")
})
  };

