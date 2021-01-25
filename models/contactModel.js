  
const mongoose = require('mongoose')

const ContactSchema = mongoose.Schema({
          fullname: {type: String, trim:true},
          email: {type: String, trim:true},
          message: {type: String, trim:true},
          createdon: {type: String, trim:true},
          statusOf_text: {type: Boolean, trim:true},
          reply_on: {type: String, trim:true},
        
    

})
//
const Contact = mongoose.model('Contact', ContactSchema)
module.exports = Contact