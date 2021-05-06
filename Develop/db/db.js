const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile)


class dbFunctionality {

    readFile(){{
        return readFileAsync('db/db.json', 'utf-8')
    }}

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
}

module.exports = new dbFunctionality();