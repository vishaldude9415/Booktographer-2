const express = require('express')
const Article = require('../models/articles')
const multer = require('multer');
const fs = require('fs');
const { request } = require('http');
const router = require('express').Router()

// define the storage for the multer
const storage = multer.diskStorage({
    destination: function(request, file, callback) {
        callback(null, './public/uploads');
    },

    // add back the extension 
    filename: function(request, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
});

// upload parameter for the multer 
const upload = multer({
    storage:storage,
});



router.get('/new',(req, res)=> {
    res.render('articles/new', {article : new Article()})
})


router.get('/:id', async(req,res) => {
       const article = await Article.findById(req.params.id)
       console.log(req.params.id);
       if(article == null) res.render('/')
       res.render('articles/show', {article : article })
})



router.post('/', upload.array('image',5), async (req,res)=>{

    let  article = new Article({
         title : req.body.title,         
         description : req.body.description,         
         markdown : req.body.markdown,   
         image1 : req.files[0].filename,
         image2 : req.files[1].filename,  
    })
    try{
        console.log(req.files[0].filename);
        console.log(req.files[1].filename);

        await article.save()
        var myid = article.id;
        res.redirect(`/articles/${article.id}`)
        
    }catch(e){
        console.log(e);
        res.render('articles/new', {article : article })
    }
})



module.exports = router