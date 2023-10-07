const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title:{
        type:String,
        required: false,
    },
    authors:{
        type:String,
        required: false,
    },
    price:{
        type:String,
        required: false,
    },
    genre:{
        type: String,
        required: false,
    },
    description:{
        type:String,
        required: false,
    },
    language:{
        type:String,
        required: false,
    },
    publicationDate:{
        type:String,
        required: false,
    },
    imageUrl:{
        type:String,
        required: false,
    }
},{timestamps:true});

mongoose.models = {}
const BookDetails = mongoose.model('Book List', BookSchema)

module.exports = BookDetails;