const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  
  const Person = mongoose.model('Person', personSchema)
  
  const person = new Person({
    name: 'HTML is x',
    number: 'easy',
  })
  
  /*
  note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })
  */
  Person.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
})