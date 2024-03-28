require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')

const Note = require('./models/Note')

const notFound = require('./middleware/notFound.js')

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(elements => {
    response.json(elements)
  })
})

app.get('/api/notes/:id', (request, response) => {
  const { id } = request.params
  Note.findById(id)
    .then(note => {
      if (note) return response.json(note)
      response.status(404).end()
    })
})

app.post('/api/notes', (request, response) => {
  const {
    content,
    important = false
  } = request.body

  if (!content) {
    return response.status(400).json({
      error: 'required "content" field is missing'
    })
  }

  const note = new Note({
    content,
    date: new Date(),
    important
  })

  try {
    const savedNote = note.save()
    response.json(savedNote)
  } catch (error) {
    console.error(error)
  }
})

app.put('/api/notes/:id', (request, response) => {
  const { id } = request.params
  const note = request.body

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then(result => {
      response.json(result)
    }).catch((error) => {
      console.error(error)
    })
})

app.delete('/api/notes/:id', (request, response) => {
  const { id } = request.params
  const res = Note.findByIdAndDelete(id)
  if (res === null) return response.sendStatus(404)

  response.status(204).end()
})

app.use(notFound)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
