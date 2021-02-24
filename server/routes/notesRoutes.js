const router = require('express').Router();
const auth = require('../middlewares/auth')
const notesController = require('../controllers/note.js')

router.route('/')
	.get(auth, notesController.getNotes)
	.post(auth, notesController.createNote);

 router.route('/:id')
	.get(auth, notesController.getNote)
	.put(auth, notesController.updateNote)
	.delete(auth, notesController.deleteNote);

module.exports = router;
