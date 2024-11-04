const express = require('express')
const router = express.Router()
const User = require('../Schema/userSchema')
const Book = require('../Schema/bookSchema')

// router.post('/signup',async(req,res)=>{
//     try{
//    const {uname,email,pass,cpass}= req.body
//    console.log('req signup',req.body)
//    const user= await User.create({uname,email,pass})
//    console.log('user',user)
//    if(user!=null){
//     res.json({msg:'signup successfull'})
//    }
//    else{
//     res.json({msg:'problem in signup'})
//    }
//     }
//     catch(e){
//         console.log('server error in signup',e)
//     }
// })

// router.post('/login',async(req,res)=>{
//     try{
//     const {email,pass} = req.body
//     console.log('req login',req.body)
//     const checkUser = await User.findOne({email})
//     if(checkUser!=null){
//         res.json(checkUser)
//     }
//     else{
//         res.json({msg:'problem in login'})
//     }
//     }
//     catch(e){
//         console.log('server error in login',e)
//     }
// })

router.post('/storeBookdetail',async(req,res)=>{
    try{
       const {title,author,eddition,publisher,url} = req.body
        console.log('book detail in api',req.body)
       const bookExist = await Book.findOne({title,author,eddition,publisher})
      if(bookExist){
        console.log('book already exists')
        res.json({msg:'book already exists'})
      }
      else {
      console.log('not exist')
       const book= await Book.create({title,author,eddition,publisher,url})
   console.log('book',book)
   if(book!=null){
    console.log('yes')
    res.json({msg:'book uploaded successfully'})
   }
   else{
    res.json({msg:'problem in upload book'})
    console.log('no')
   }
}
    }
    catch(e){
        console.log('server error in storing book detail')
    }
});

router.get('/getBookdetails' ,async(req,res)=>{
    try{
      const books = await Book.find()
      if(books){
        res.json(books)
      }
      else{
        console.log('something wrong in fetching bookdetails')
      }
      
    }
    catch(e){
        console.log('server error in getbookdetails',e)
    }
})
module.exports = router