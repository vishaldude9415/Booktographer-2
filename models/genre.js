const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
  
        Book_Name : {
            type : String,
            // required : true
        },
        Author_Name : {
            type : String,
            // required : true
        },
        Short_Book_Description : {
            type : String,
        },
        Detail_Book_Description : {
            type : String,
        },
        About_Author : {
            type : String,
        },
        Quote : {
            type : String,
        },
        Snapdeal_Link : {
            type : String,
        },
        Amazon_Link : {
            type : String,
        },
        Flipkart_Link : {
            type : String,
        },
        Book_Image : {
            type : String,
        },
        Author_Image : {
            type : String,
        },
        Book_pdf : {
            type : String,
        },
        createdAt : {
            type : Date,
            default : Date.now()
        }
                                                                                                                
});
genreSchema.index({
    Book_Name: 'text',
    Author_Name: 'text'
  });


module.exports = mongoose.model('Genre', genreSchema)