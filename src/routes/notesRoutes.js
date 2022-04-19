const { Router } = require('express');
const router = Router();
const {renderNotesForm,createNoteAdd,renderNotes,renderNoteEdit,createNoteUpdate,renderNoteDelete} = require('../controllers/notesControllers')
const {isAuthenticated} = require('../helpers/auths');
//New Nota
router.get('/notas/add',isAuthenticated,renderNotesForm);
router.post('/notas-add',isAuthenticated,createNoteAdd);
//Get All Note
router.get('/notas',isAuthenticated, renderNotes);
//EditNote
router.get('/notas/edit/:id',isAuthenticated,renderNoteEdit);
//PutNote
router.put('/notas/edit/:id',isAuthenticated,createNoteUpdate);
//DeleteNote
router.delete('/notas/delete/:id',isAuthenticated,renderNoteDelete)
module.exports = router;