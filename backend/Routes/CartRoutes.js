const express = require('express');
const router = express.Router();
const Cart = require('../Models/Cart');
const BookDetails = require('../Models/Books'); // Import the Book model

// Read the user's cart with book details

router.post('/create', async (req, res) => {
    try {
        const { userId, bookId, quantity } = req.body;

        let existingCart = await Cart.findOne({ userId, bookId });

        if (!existingCart) {
            existingCart = new Cart({ userId, bookId, quantity });
        } else {
            existingCart.quantity += quantity;
        }

        await existingCart.save();

        return res.status(200).json({ success: 'Cart updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/read/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Retrieve cart items with book details using 'populate'
      const cartItems = await Cart.find({ userId }).populate('bookId', 'title authors imageUrl price');
  
      if (!cartItems || cartItems.length === 0) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      res.status(200).json(cartItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });


router.put('/update/:userId/:cartItemId', async (req, res) => {
    try {
      const { userId, cartItemId } = req.params;
      const { quantity } = req.body;
  
      const cartItem = await Cart.findOneAndUpdate(
        { userId, _id: cartItemId },
        { quantity },
        { new: true } // To get the updated document
      );
  
      if (!cartItem) {
        return res.status(404).json({ error: 'Item not found in cart' });
      }
  
      return res.status(200).json({ success: 'Cart item updated successfully', cartItem });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
  

// Delete a cart item
router.delete('/delete/:userId/:cartItemId', async (req, res) => {
    try {
      const { userId, cartItemId } = req.params;
  
      const cartItem = await Cart.findOneAndDelete({ userId, _id: cartItemId });
  
      if (!cartItem) {
        return res.status(404).json({ error: 'Item not found in cart' });
      }
  
      return res.status(200).json({ success: 'Cart item deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
  
// Modify your API endpoint to fetch cart items count for all users where userId matches
router.get('/count/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const totalCount = await Cart.countDocuments({ userId });

    res.status(200).json({ totalCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


router.post('/clearCart/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Assuming you have a User model and Cart model, you can use them here
      // Clear the cart associated with the user
      await Cart.deleteMany({ userId: userId });
  
      // Return a success response
      res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
      console.error('Error clearing cart:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
module.exports = router;
