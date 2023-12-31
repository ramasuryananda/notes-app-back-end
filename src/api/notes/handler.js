class NoteHandler {
    constructor(service) {
        this._service = service;

        this.postNoteHandler = this.postNoteHandler.bind(this);
        this.getNotesHandler = this.getNotesHandler.bind(this);
        this.getNoteByIdHandler = this.getNoteByIDHandler.bind(this);
        this.putNoteByIdHandler = this.putNoteByIDHandler.bind(this);
        this.deleteNoteByIdHandler = this.deleteNoteByIDHandler.bind(this);

        console.log(this._service);
    }

    postNoteHandler(request, h) {
        try {
            const { title = 'Untitled', tags, body } = request.payload;
            const noteId = this._service.addNote(title, body, tags);
            const response = h.response({
                status: 'success',
                message: 'Catatan berhasil ditambahkan',
                data: {
                noteId,
                },
            });
            response.code(201);
            return response;
        } catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message,
            });
            response.code(400);
            return response;
        }
    }

    getNotesHandler() {
        const notes = this._service.getNotes();
        return {
            status: 'success',
            data: {
                notes,
            },
        };
    }

    getNoteByIDHandler(request, h) {
        try {
            const { id } = request.params;
            const note = this._service.getNoteById(id);
            return {
                status: 'success',
                data: {
                    note,
                },
            };
        } catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message,
            });

            response.code(404);
            return response;
        }
    }

    putNoteByIDHandler(request, h) {
        try {
            const { id } = request.params;

            this._service.editNoteById(id, request.payload);
            return {
                status: 'success',
                message: 'Catatan berhasil diperbarui',
            };
        } catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message,
            });
            response.code(404);
            return response;
        }
    }

    deleteNoteByIDHandler(request, h) {
        try {
            const { id } = request.params;
            this._service.deleteNoteById(id);
            return {
                status: 'success',
                message: 'Catatan berhasil dihapus',
            };
        } catch (error) {
            const response = h.response({
                status: 'fail',
                error: error.message,
            });

            response.code(404);
            return response;
        }
    }
}

module.exports = NoteHandler;
