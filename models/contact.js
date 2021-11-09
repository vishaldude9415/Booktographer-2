const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  
        FirstName : {
            type : String,
            required : true
        },
        LastName : {
            type : String
        },
        Email : {
            type : String ,
            required : true
        },
        Country : {
            type : String ,
            required : true
        },
        Message : {
            type : String ,
            required : true
        },
        // createdAt : {
        //     type : Date,
        //     // default : (new Date().getDate())+'/'+((new Date().getMonth()+1))+'/'+(new Date().getFullYear())+' '+(new Date().getHours()) + ":" + (new Date().getMinutes()) + ":" + (new Date().getSeconds())
        //     default : Date.now()
        // ,}                                                                                                           
},{ timestamps : true })


module.exports = mongoose.model('Contact', contactSchema)