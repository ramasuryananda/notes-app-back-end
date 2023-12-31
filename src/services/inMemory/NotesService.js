const { nanoid } = require('nanoid');

class NotesService {
    constructor() {
        this._notes = [];
    }

    addNote({
        title,
        body,
        tags,
    }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const newNote = {
            title, tags, body, id, createdAt, updatedAt,
        };

        this._notes.push(newNote);
        const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

        if (!isSuccess) {
            throw new Error('failed to insert new notes');
        }

        return newNote.id;
    }

    getNotes() {
        return this._notes;
    }

    getNoteById(id) {
        const note = this._notes.filter((n) => id === n.id)[0];

        if (!note) {
            throw new Error('note not found');
        }

        return note;
    }

    editNoteById(id, { title, body, tags }) {
        const index = this._notes.findIndex((note) => note.id === id);

        if (index === -1) {
            throw new Error('Notes not found');
        }

        const updatedAt = new Date().toISOString();

        this._notes[index] = {
            ...this._notes[index],
            title,
            tags,
            body,
            updatedAt,
        };
    }

    deleteNoteById(id) {
        const index = this._notes.findIndex((n) => n.id === id);
        if (index === -1) {
            throw new Error('Notes not found');
        }

        this._notes.splice(index, 1);
    }
}

module.exports = NotesService;
