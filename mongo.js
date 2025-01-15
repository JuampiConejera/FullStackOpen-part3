const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://juampiconejera:${password}@cluster0.q047y.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const PhonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonebook = mongoose.model('Phonebook', PhonebookSchema)

if (!process.argv[3]) {
    Phonebook.find({}).then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })
} else {
    const phonebook = new Phonebook({
      name: `${process.argv[3]}`,
      number: `${process.argv[4]}`,
    })
    
    phonebook.save().then(() => {
      console.log(`added ${process.argv[3]} number ${process.argv[4]} to Phonebook`)
      mongoose.connection.close()
    })
}

