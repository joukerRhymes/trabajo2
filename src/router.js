const express = require('express')
const NotesController = require('./controllers/NotesController')
const PageController = require('./controllers/PageController')
const SqlClient = require('./lib/SqlClient')

const router = express.Router()

// Database Client
const sqlClient = new SqlClient()

// Controllers
const pageController = new PageController()
const notesController = new NotesController(sqlClient)

// Routes
router.get('/', notesController.renderHomeWithNotes)
router.get('/about', pageController.renderAbout)

router.get('/notes/create', notesController.renderNotesCreationForm)
router.post('/notes/create', notesController.insertAndRenderNotes)

router.get('/notes/:id', notesController.renderSingleNotes)

router.get('/notes/:id/update', notesController.renderNotesUpdateForm)
router.post('/notes/:id/update', notesController.updateAndRenderNotes)

router.post('/notes/:id/delete', notesController.deleteNotesAndRenderResponse)

router.get('*', pageController.renderNotFound)

module.exports = router
