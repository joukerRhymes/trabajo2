const NotesDAO = require('../models/dao/NotesDAO')

class NotesController {
  constructor (db) {
    this.notesDao = new NotesDAO(db)
    this.renderHomeWithNotes = this.renderHomeWithNotes.bind(this)
    this.renderSingleNotes = this.renderSingleNotes.bind(this)
    this.renderNotesCreationForm = this.renderNotesCreationForm.bind(this)
    this.renderNotesUpdateForm = this.renderNotesUpdateForm.bind(this)
    // this.searchAndRenderNotes = this.searchAndRenderNotes.bind(this)
    this.insertAndRenderNotes = this.insertAndRenderNotes.bind(this)
    this.updateAndRenderNotes = this.updateAndRenderNotes.bind(this)
    this.deleteNotesAndRenderResponse = this.deleteNotesAndRenderResponse.bind(this)
  }

  async renderHomeWithNotes (req, res) {
    const notes = await this.notesDao.getAll()
    res.render('home', {
      notes
    })
  }

  async renderSingleNotes (req, res) {
    const id = req.params.id

    try {
      // throw Error('Murio la Base de Datos') <-------------- este es un codigo para forzar un error y botar la base de datos
      const notes = await this.notesDao.getById(id)

      if (!notes) {
        res.status(404).render('404')
        return
      }

      res.render('notes', {
        id,
        title: notes.title,
        content: notes.content,
        image: notes.image
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  renderNotesCreationForm (req, res) {
    res.render('notes-form')
  }

  async renderNotesUpdateForm (req, res) {
    const id = req.params.id

    try {
      const notes = await this.notesDao.getById(id)

      if (!notes) {
        res.status(404).render('404')
        return
      }

      res.render('notes-form', {
        id,
        title: notes.title,
        content: notes.content,
        image: notes.image
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async insertAndRenderNotes (req, res) {
    const title = req.body.title
    const content = req.body.content
    const image = req.body.image

    const notes = { title, content, image }

    try {
      const id = await this.notesDao.create(notes)

      res.redirect(`/notes/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async updateAndRenderNotes (req, res) {
    const id = req.params.id
    const title = req.body.title
    const content = req.body.content
    const image = req.body.image

    try {
      const notes = { title, content, id, image }

      await this.notesDao.update(notes)

      res.redirect(`/notes/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async deleteNotesAndRenderResponse (req, res) {
    const id = req.params.id

    try {
      const notes = await this.notesDao.getById(id)

      if (!notes) {
        res.status(404).render('404')
        return
      }

      await this.notesDao.delete(id)

      res.render('notes-deleted', {
        id,
        title: notes.title
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  // async searchAndRenderNotes (req, res) {
  //  const title = req.body.title

  //  const notes = { title }

  //  try {
  //    const id = await this.notesDao.create(notes)

  //    res.redirect(`/notes/${id}`)
  //  } catch (error) {
  //    console.log(error)
  //    res.status(500).render('500')
  //  }
  // }
}

module.exports = NotesController
