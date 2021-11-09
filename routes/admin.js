const express = require('express');
const router = require('express').Router();
const Genre = require('../models/genre')
const Contact = require('../models/contact')


router.get('/',(req, res) => {
    Genre.find().then(books => {
        // console.log(books);
        res.render('admin/admin', { books : books });
    }) 
})

router.get('/new_book',(req, res) => {
    Genre.find().then(books => {
        // console.log(books);
        res.render('admin/new_book');
    }) 
})

router.get('/book/:id',(req, res) => {
    Genre.findById(req.params.id).then(book =>{
        // console.log(book);
        res.render('admin/edit_book', { book : book })
    })
})


router.get('/contacts',(req, res) => {
    Contact.find().then(contact =>{
        // console.log(contact);
        const temp = contact;
        res.render('admin/contact', { contact : contact });
    })
    try{
        // console.log('Contacts fetched Successfully from database');
    }catch(err){
        console.log(err);
    }
    
})


router.delete('/book/:id', async (req, res) => {
      await Genre.findByIdAndDelete(req.params.id);
      res.redirect('/admin')
})


// router.put('/edit/:id',(req, res)=> {
//     Genre.findByIdAndUpdate(req.params.id,req.body,{new:true}, (err , todo)=>{
//         return res.send(todo);
//     })
// })
router.put('/edit/:id', (req, res)=>{

       Genre.findById(req.params.id).then(book =>{
           console.log(book)
        
                book.Book_Name = req.body.book_name
                book.Author_Name = req.body.author_name
                book.Short_Book_Description = req.body.short_book_description
                book.Detail_Book_Description = req.body.detail_book_description
                book.About_Author = req.body.about_author
                book.Quote = req.body.quote
                book.Snapdeal_Link = req.body.snapdeal_link
                book.Amazon_Link = req.body.amazon_link
                book.Flipkart_Link = req.body.flipkart_link
                
                book.save()
       })
    try{
       res.redirect('/admin');
    }catch (e){
        res.send(e)
    }
})
// function saveArticleAndRedirect(path) {
//     return async (req, res) => {
//         let article = req.article
//         article.Author_Name = req.body.author_name
//         article.Book_Name = req.body.book_name
//         article.Short_Book_Description = req.body.short_book_description
//         article.Detail_Book_Description = req.body.detail_book_description
//         article.About_Author = req.body.about_author
//         article.Quote = req.body.quote
//         article.Snapdeal_Link = req.body.snapdeal_link
//         article.Amazon_Link = req.body.amazon_link
//         article.Flipkart_Link = req.body.flipkart_link
//         try{
//             article = await article.save()
//             res.send(article)
//         }catch (e) {
//             res.send(e);
//         }
//     }







module.exports = router;