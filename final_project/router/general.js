const express = require('express');
let books = require("./booksdb.js");
let booklist = books.books;
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

//Util Methods
const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }

//Main Methods
public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    if (username && password) {
        if (!doesExist(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
        } 
    else {
        return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get booklist
public_users.get('/',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve("Promise resolved")
        },6000)})
        
        myPromise.then((successMessage) => {
            console.log("callback " + successMessage)
            res.send(JSON.stringify({books},null, 4));
    })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve("Promise resolved")
        },6000)})
        
        myPromise.then((successMessage) => {
            console.log("callback " + successMessage)
            let isbn = req.params.isbn;
            res.send(books[isbn]);
    
        })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve("Promise resolved ")
        },6000)})
        
    
        myPromise.then((successMessage) => {
            console.log("callback " + successMessage)
            const bookauthor = req.params.author;
            for (const [key, value] of Object.entries(books)) {
                if(value["author"]==bookauthor){
                    res.send(books[key]);
                }
              }    
        })
});

// Get books based on title
public_users.get('/title/:title',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve("Promise resolved.")
        },6000)})
        
        console.log("Before promise");
        //Call the promise and wait for it to be resolved and then print a message.
        myPromise.then((successMessage) => {
            console.log("From Callback " + successMessage)
            const bookname = req.params.title;
            for (const [key, value] of Object.entries(books)) {
                if(value["title"]==bookname){
                    res.send(books[key]);
                }
              }
        })
        console.log("After promise");

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]["reviews"])
});



module.exports.general = public_users;
