const util = require("util");
const fs = require("fs");

// Package to generate the ids
const uuid = require("uuid");
const { request } = require("http");

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

class dbFunctionality {

    readFile(){{
        return readFileAsync('db/db.json', 'utf-8')
    }}

    writeFile(notes){
        return writeFileAsync('db/db.json', JSON.stringify(notes))
    }

    getAllNotes() {
        return this.readFile().then((dbNotes) => {
            let parsedDbNotes;
            try {
                parsedDbNotes = [].concat(JSON.parse(dbNotes))
            } catch (error) {
                parsedDbNotes = [];
            }
            return parsedDbNotes;
        })
    }

    addNewNote(note){
        //this function is going to take a note as an argument
        //get all the notes from the db.json
        //rewrite the notes with the new addtion back to the db.json
        note.id = uuid.v4();
        return this.readFile().then((dbNotes) => {
            let parsedDbNotes;
            try {
                parsedDbNotes = [].concat(JSON.parse(dbNotes))
            } catch (error) {
                parsedDbNotes = [];
            }
            parsedDbNotes.push(note);
            return this.writeFile(parsedDbNotes);
        })
    }

    deleteNoteById(id) {
        //this function is going to get all the notes
        //then its going filtered them and only keep the notes without the id passed in
        //then it is going to write the filtered notes to the db.json file
        return this.readFile().then((dbNotes) => {
            let parsedDbNotes;
            try {
                parsedDbNotes = [].concat(JSON.parse(dbNotes))
            } catch (error) {
                parsedDbNotes = [];
            }
            const filteredNotes = parsedDbNotes.filter(function(note){
                return note.id !== id 
            })
            console.log(id)
            console.log(filteredNotes)
            return this.writeFile(filteredNotes);
        })
    }
}

module.exports = new dbFunctionality();