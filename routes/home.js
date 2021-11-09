const express = require('express')
const app = express();
const multer = require('multer')
const Article = require('../models/articles')
const Contact = require('../models/contact')
const Genre = require('../models/genre')
const router = require('express').Router()


const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './public/uploads');
    },

    // add back the extension 
    filename: function (request, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
});

// upload parameter for the multer 
const upload = multer({
    storage: storage,
});



router.get('/home', (req, res) => {
    res.render('articles/home')
})
router.get('/contact', (req, res) => {
    res.render('articles/contact')
})

router.get('/about', (req, res) => {
    res.render('articles/about')
})

// router.get('/genre', (req, res) => {
//     Genre.find().then(books => {
//         // console.log(books);
//         res.render('articles/genre', { books: books })
//     })
// })


router.get('/genre', (req, res) => {
    Genre.find({}).sort({date : 'asc'}).exec(function(err,model){
        // console.log(model);
        res.render('articles/genre', { books: model , allBooks : model});
    });
});




router.get('/login', (req, res) => {
    res.render('articles/login')
})

router.get('/genre/book', (req, res) => {
    res.render('articles/book')
})

router.get('/genre/book/:id', (req, res) => {
    Genre.findById(req.params.id).then((book_detail) => {
        // console.log(book_detail);
        res.render('articles/book', { book_detail: book_detail })
    })
})



router.get('/genre/insert', (req, res) => {
    res.render('articles/genre_post')
})
// router.get('/genre/insert',(req, res)=> {
//     res.render('articles/genre_post')
// })


// router.get('/:id', async(req,res) => {
//        const article = await Article.findById(req.params.id)
//        if(article == null) res.render('/')
//        res.render('articles/show', {article : article })
// })



router.post('/contact', async (req, res) => {
    let contact = new Contact({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Country: req.body.Country,
        Message: req.body.Message,
        // createdAt : 77473473
    })
    try {
        await contact.save();
        res.redirect('/');
        // console.log(req.body);
    } catch (e) {
        console.log(e);
    }

})


router.post('/genre/post', upload.array('image', 5), async (req, res) => {
    let genre = new Genre({
        Book_Name: req.body.book_name,
        Author_Name: req.body.author_name,
        Short_Book_Description: req.body.short_book_description,
        Detail_Book_Description: req.body.detail_book_description,
        About_Author: req.body.about_author,
        Quote: req.body.quote,
        Snapdeal_Link: req.body.snapdeal_link,
        Amazon_Link: req.body.amazon_link,
        Flipkart_Link: req.body.flipkart_link,
        Book_Image: req.files[0].filename,
        Author_Image: req.files[1].filename,
        Book_pdf: req.files[2].filename
    })
    try {
        await genre.save();
        // console.log(req.body)
        // res.send(req.body);
        res.redirect('/admin')
    } catch (e) {
        console.log(e);
    }
})

// router.post('/search', async (req, res) => {
//     console.log(req.body.Book_Name)
//     const allresult = await Genre.find();
    
//     Genre.find({$or : [{ Book_Name: req.body.Book_Name },{Author_Name : req.body.Author_Name}]}, (err, docs) => {
//         if (docs[0]) {
//             res.render('articles/genre', { books: docs , allBooks : allresult})
//         }
//         else {
//             res.redirect('/genre');
//             console.log(err);
            
//         }
//     })

//     const result = await Genre.find();
    
// })




// router.post('/search', async (req, res) => {
//     console.log(req.body.Book_Name)
//     const allresult = await Genre.find();
//     let bookName = req.body.Book_Name;            
//     let authorName = req.body.Author_Name;
//     console.log(improvename)
//     var bookRegex = new RegExp(bookName,"i");

    // await Genre.find({ Book_Name : {$regex :  bookRegex}}).then(vish =>{

//        console.log(vish);
//    })
    
// })



router.post('/search', async (req, res) => {
    console.log(req.body.Book_Name)
    const allresult = await Genre.find();
    
    let bookName = req.body.Book_Name;            
    let authorName = req.body.Author_Name;
    // var bookRegex = new RegExp(bookName,"i");
    if((req.body.Book_Name)){
    var bookRegex = new RegExp(bookName,"i");
    // console.log(bookRegex)

    Genre.find({$or : [{ Book_Name : {$regex :  bookRegex} },{Author_Name : req.body.Author_Name}]}, (err, docs) => {
        if (docs[0]) {
            res.render('articles/genre', { books: docs , allBooks : allresult})
        }
        else {
            res.redirect('/genre');
            console.log(err);
            
        }
    })
}

if((req.body.Author_Name)){
    var authorRegex = new RegExp(authorName,"i");
    console.log(authorRegex)
    // console.log(bookRegex)

    Genre.find({$or : [{ Book_Name : req.body.Book_Name },{Author_Name : {$regex :  authorRegex} }]}, (err, docs) => {
        if (docs[0]) {
            res.render('articles/genre', { books: docs , allBooks : allresult})
        }
        else {
            res.redirect('/genre');
            console.log(err);
            
        }
    })
}

// if((req.body.Author_Name)&&(req.body.Author_Name)){
//     var authorRegex = new RegExp(authorName,"i");
//     console.log(authorRegex)

//     Genre.find({$or : [{ Book_Name : {$regex :  authorRegex} },{Author_Name : req.body.Author_Name }]}, (err, docs) => {
//         if (docs[0]) {
//             res.render('articles/genre', { books: docs , allBooks : allresult})
//         }
//         else {
//             res.redirect('/genre');
//             console.log(err);
            
//         }
//     })
// }




    const result = await Genre.find();
    
})


module.exports = router