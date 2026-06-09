const mongoose = require('mongoose')

const password = process.argv[2]
const url = `mongodb+srv://Abhay_GHR:${password}@notes-db.a7sbhi8.mongodb.net/noteApp?retryWrites=true&w=majority&appName=notes-db`
const name = process.argv[3]
const number = process.argv[4]

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(name && number){

  const person = new Person({
  name: name,
  number: number,
})

console.log(person)

person.save().then(result => {
  console.log(`Added ${name} number ${number} to phonebook`)
  mongoose.connection.close()
})

}
else{
    console.log("listing phonebook")
    Person.find({}).then(result => {
      result.forEach(Person => {
        console.log(Person)
      })
      mongoose.connection.close()
    })
}