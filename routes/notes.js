const express = require('express')
const router = express.Router()
const Note = require('../models/note')

router.get('/', (req, res) => {
  res.send('Hi there')
})

router.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find({})
    if (!notes) {
      throw new Error('An error occured while fetching notes')
    }
    res.status(200).json(notes)
  } catch (error) {
    res.status(500).json({ message: 'An error occured while fetching notes' })
    console.log(error)
  }
})

router.get('/api/notes/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
    if (!note) {
      throw new Error('An error occured while fetching a note')
    }
    res.status(200).json(note)
  } catch (error) {
    res.status(500).json({ message: 'An error occured while fetching a note' })
    console.log(error)
  }
})

router.post('/api/notes', async (req, res) => {
  try {
    const { title, description } = req.body

    const note = await Note.create({ title, description })
    if (!note) {
      throw new Error('An error occured while creating a note')
    }
    res.status(201).json(note)
  } catch (error) {
    res.status(500).json({ message: 'An error occured while creating a note' })
    console.log(error)
  }
})

router.put('/api/notes/:id', async (req, res) => {
  try {
    const { title, description } = req.body

    const note = await Note.findByIdAndUpdate(req.params.id, { title, description })
    if (!note) {
      throw new Error('An error occured while updating a note')
    }
    res.status(201).json(note)
  } catch (error) {
    res.status(500).json({ message: 'An error occured while updating a note' })
    console.log(error)
  }
})

module.exports = router
