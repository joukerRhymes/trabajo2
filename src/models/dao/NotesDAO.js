class NotesDAO {
  constructor (dbClient) {
    this.db = dbClient
    this.getAll = this.getAll.bind(this)
    this.getById = this.getById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getAll () {
    const response = await this.db.query('SELECT id, title, content, image FROM notes')
    const rows = response[0]
    return rows
  }

  async getById (id) {
    const response = await this.db.query('SELECT id, title, content, image FROM notes WHERE id = ?', [id])
    const rows = response[0]
    return rows[0]
  }

  // async search (notes) {
  //  const response = await this.db.query('INSERT INTO search(title)VALUES(?)', [notes.title])
  //  const result = response[0]
  //  return result
  // }

  async create (notes) {
    const response = await this.db.query('INSERT INTO notes (title, content, image) VALUES (?, ?, ?)', [notes.title, notes.content, notes.image])
    const result = response[0]
    return result.insertId
  }

  async update (notes) {
    const response = await this.db.query('UPDATE notes SET title = ?, content = ?, image = ? WHERE id = ?', [notes.title, notes.content, notes.image, notes.id])
    const result = response[0]
    return result
  }

  async delete (id) {
    const response = await this.db.query('DELETE FROM notes WHERE id = ?', [id])
    const result = response[0]
    return result
  }
}

module.exports = NotesDAO
