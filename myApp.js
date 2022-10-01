require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema=new mongoose.Schema(
  {
    name:{type:String,required:true},
    age :  {type:Number},
    favoriteFoods:[String]
  }
);

const Person=mongoose.model("Person",personSchema);

 let createAndSavePerson = function(done) {
    let person = new Person({
      name: "Jane Fonda", 
      age: 84, 
      favoriteFoods: ["eggs", "fish", "fresh fruit"]
    });

   person.save(function(err,data){
      console.log(data);
      done(null, data)
   })

};


var arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];


const createManyPeople = (arrayOfPeople, done) => {
  let people=Person.create(arrayOfPeople,(err,data)=>{
    console.log(data)
    done(null , data);
  }) 
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName},(err,data)=>{
    console.log(data)
    done(null , data);
  })
  
};

const findOneByFood = (food, done) => {
  Person.findOne( {favoriteFoods:food},(err,data)=>{
    console.log(data)
    done(null , data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId,(err,data)=>{
    console.log(data)
    done(null , data);
  }) 
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  let person =Person.findById(personId,(err,person)=>{
    person.favoriteFoods.push(foodToAdd);
    console.log(person);

    person.save(function(err,data){
      console.log(data);
      done(null, data)
   })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new: true},(err,data)=>{
      console.log(data);
      done(null, data)
   })
  };

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,(err,data)=>{
  done(null , data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
 
  Person.remove({name: nameToRemove}, (err, data) => {
    if(err) return console.log(err);
    done(null, data);
  })

};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  let item=Person.find({favoriteFoods:foodToSearch});
  item.sort({name:1}).limit(2).select({age:0}).exec((err,data)=>{
    done(null , data);
  })

  
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
