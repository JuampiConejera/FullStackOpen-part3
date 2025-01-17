const express = require('express')
const app = express()
require('dotenv').config()

const Person = require('./models/person')


let persons = [
]

app.use(express.static('dist'))

const cors = require('cors')
const morgan = require('morgan')

app.use(cors())

app.use(express.json())

morgan.token('body', (request) => JSON.stringify(request.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/info', (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date().toISOString()}</p>
    `
  )
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if(!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  } else {
    const person = new Person({
      id: parseInt(Math.random()*10000),
      name: body.name,
      number: body.number
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  }
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
  .then(result => {
    response.status(204).end()
  })
})

app.use(unknownEndpoint)

morgan.token('POST', (request, response) => {
  return console.log(request)
})
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})