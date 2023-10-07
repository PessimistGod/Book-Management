const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User Details',
        required: true,
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book List',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
