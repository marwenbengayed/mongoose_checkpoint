require("dotenv").config();
const mongoose = require("mongoose");

// Set Up the Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected from: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
  }
};

// Create person schema
const PersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

// Create Person model
const PersonModel = mongoose.model("Person", PersonSchema);
connectDB();

//Create and Save a Record of a Model:
const person = new PersonModel({
  name: "Marwen",
  age: 28,
  favoriteFoods: ["pasta","kokous", "cheescake"],
});

person
  .save()
  .then((data) => {
    if (data === person) console.log("Document inserted succussfully!");
  })
  .catch((err) => {
    console.error("Insert document failed: " + err);
  });

// Create Many Records with model.create()
const arrayOfPeople = [
  { name: "chiheb", age: 30, favoriteFoods: ["pizza","chicken wings"] },
  { name: "Haroun", age: 4, favoriteFoods: ["indomie", "chocolate", "ice cream"] },
  { name: "Rahma", age: 45, favoriteFoods: ["rice"] },
];

PersonModel.create(arrayOfPeople).then((result) => {
  console.log(result);
});

//Use model.find() to Search Your Database
PersonModel.find({ name: "Haroun" })
  .then((docs) => {
    console.log("Result of find() :", docs);
  })
  .catch((err) => {
    console.log(err);
  });

//Use model.findOne()
PersonModel.findOne({ favoriteFoods: "chicken wings" })
  .then((docs) => {
    console.log("Result of findOne() :", docs);
  })
  .catch((err) => {
    console.log(err);
  });

//Use model.findById()
PersonModel.findById("65534ff98e09b7d0e653cc0f")
  .then((docs) => {
    console.log("Result of findById() :", docs);
  })
  .catch((err) => {
    console.log(err);
  });

//Perform Classic Updates by Running Find, Edit, then Save

PersonModel.findById("65534ff98e09b7d0e653cc10")
  .then((docs) => {
    //docs.favoriteFoods.push("hamburger");
    //docs.save();
    console.log("Person Updated by Find, Edit, then Save");
  })
  .catch((err) => {
    console.log(err);
  });
//Updates on a Document Using model.findOneAndUpdate()
PersonModel.findOneAndUpdate(
  { name: "Rahma" },
  { $set: { age: 20 } },
  { new: true }
)
  .then((docs) => {
    console.log("Person Updated by findOneAndUpdate");
  })
  .catch((err) => {
    console.log(err);
  });

//Using model.findByIdAndRemove
PersonModel.findByIdAndDelete("65534ff98e09b7d0e653cc0f")
  .then((docs) => {
    console.log("Person deleted");
  })
  .catch((err) => {
    console.log(err);
  });

//Delete Many Documents with model.remove()
PersonModel.remove({ name: "Mary" }).then((result) => {
  console.log(result);
});

//Chain Search Query Helpers to Narrow Search Results
PersonModel.find({ favoriteFoods: "burritos" })
  .sort({ name: "desc" })
  .limit(2)
  .select("-age")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });