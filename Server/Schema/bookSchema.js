const mongoose = require ("mongoose");

const BookSchema= new mongoose.Schema({
   title :{
    type:String,
    required:true
   },
   author :{
    type: String,
    required:true
   },
   eddition :{
      type: String,
      required:true
     },  
   publisher :{
    type : String,
    required:true
   },
  url:{
    type : String,
    required:true
  },
  
})

const Book = new mongoose.model("book",BookSchema);
module.exports=Book;