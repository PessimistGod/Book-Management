const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    authors:{
        type:String,
        required: true,
    },
    price:{
        type:String,
        required: true,
    },
    genre:{
        type: String,
        required: true,
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
        required: true,
    },
    ratings: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Rating',
        },
      ]
},{timestamps:true});

mongoose.models = {}
const BookDetails = mongoose.model('Book List', BookSchema)

module.exports = BookDetails;