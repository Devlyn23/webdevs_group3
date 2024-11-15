const express = require('express')
const router = express.Router()
const Question = require('../models/question')

// Getting All questions that match survey_id
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find(req.body)
    res.json(questions)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Creating One question
router.post('/', async (req, res) => {
  const question = new Question({
    question: req.body.question,
    surveyid: req.body.surveyid,
    type: req.body.type
  })

  if (req.body.type == "YN" || req.body.type == "W" || req.body.type == "RN") {
    try {
      const newQuestion = await question.save()
      res.status(201).json(newQuestion)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  } else {
      res.status(400).json({ message: "Type is Invalid"})
  }
})

// Updating One question
router.put('/:id', async (req, res) => {
  const questions = await Question.findById(req.body._id)
  if (req.body.question != null) {
    let update = {$set: {question: req.body.question}}
    try {
      await Question.updateOne(questions, update)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }
  if (req.body.type != null) {
    let update = {$set: {type: req.body.type}}
    try {
        await Question.updateOne(questions, update)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }
  try {
    const updatedQuestion = await Question.findById(req.body._id)
    res.json(updatedQuestion)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One question
router.delete('/:id', async (req, res) => {
  if (req.body._id != null) {
    try {
      const questions = await Question.findById(req.body._id)
      await Question.deleteOne(questions)
      res.json({ message: 'Deleted Question' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  } else {
    res.status(400).json({ message: "No ID was Input" })
  }
})

// Deleting All questions with survey_id
router.delete('/', async (req, res) => {
  try {
    await Question.deleteMany(req.body)
    res.json({ message: 'Deleted Questions' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router