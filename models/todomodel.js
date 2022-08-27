const mongoose = require("mongoose")
  
// Database Address
const url = "mongodb://localhost:27017/db_todo"
  
// Connecting to database
mongoose.connect(url).then((ans) => {
  console.log("ConnectedSuccessful")
}).catch((err) => {
  console.log("Error in the Connection")
})
  
// Calling Schema class
const Schema = mongoose.Schema;
  
// Creating Structure of the collection
const todomodelSchema = new Schema({
text: {
    type: String,
  }
  ,
  status: {
    type: Boolean,
    default: false
  }
})
  
// Creating collection
const todomodel = mongoose.model("todo", todomodelSchema)

module.exports=todomodel;