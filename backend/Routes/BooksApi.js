const express = require('express');
const router = express.Router();

const BookDetails = require('../Models/Books');
const Rating = require('../Models/Rating');
const Cart = require('../Models/Cart');

const ITEMS_PER_PAGE = 10;

router.post('/create', async (req, res) =>  {
    try {
        if (req.method === 'POST') {
            const details = new BookDetails(req.body);
                
            const requiredFields = [{ key: 'title', message: 'Title is required' }, { key: 'authors', message: 'Author field is required' }, { key: 'price', message: 'Price field is required' },{key : 'genre', message:'Genre Field is required'}, { key: 'imageUrl', message: 'Image Url is required' }];
            for (const field of requiredFields) {
                if (!details[field.key]) {
                    return res.status(400).json({ error: field.message });
                }
            }
            await details.save();
            res.status(201).json({ success: 'Book Added successfully' });
        }
    } catch (error) {
      console.log(error)
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
);



router.get('/read', async (req, res) => {
  try {
    const perPage = parseInt(req.query.perPage) || ITEMS_PER_PAGE; // Default to 10 books per page
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const totalBooks = await BookDetails.countDocuments();
    const totalPages = Math.ceil(totalBooks / perPage);
    
    const books = await BookDetails.find()
    .sort({ _id: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      currentPage: page,
      totalPages,
      books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


router.put('/update/:id', async (req, res) => {
  try {
    const updatedBook = await BookDetails.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } 
    );
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



router.delete('/delete/:id', async (req, res) => {
try {
const { id } = req.params;

await Cart.deleteMany({ bookId: id });
await Rating.deleteMany({ bookId: id });
const deletedDetails = await BookDetails.findByIdAndRemove(id);


if (!deletedDetails) {
  return res.status(404).json({ error: 'Book not found' });
}

res.status(204).send();
} catch (error) {
console.error(error);
res.status(500).json({ error: error.message });
}
});


router.get('/edit/:id', async (req, res) => {
  try {
    const book = await BookDetails.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/rate', async (req, res) => {
  try {
    const bookId = req.params.id;
    const { userId, rating } = req.body;

    const book = await BookDetails.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const existingRating = await Rating.findOne({ userId, bookId });

    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
    } else {
      const newRating = new Rating({ userId, bookId, rating });
      await newRating.save();
      book.ratings.push(newRating);
    }

    await book.save();

    res.json({ message: 'Rating added/updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/search', async (req, res) => {
  try {
    const { query, page } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const searchRegex = new RegExp(query, 'i');

    const skip = (page - 1) * ITEMS_PER_PAGE;

    // Find books that match the search query with pagination
    const books = await BookDetails.find({
      $or: [
        { title: { $regex: searchRegex } },
        { authors: { $regex: searchRegex } },
        { genre: { $regex: searchRegex } },
      ],
    })
      .skip(skip)
      .limit(ITEMS_PER_PAGE);

    const totalBooks = await BookDetails.countDocuments({
      $or: [
        { title: { $regex: searchRegex } },
        { authors: { $regex: searchRegex } },
        { genre: { $regex: searchRegex } },
      ],
    });

    const totalPages = Math.ceil(totalBooks / ITEMS_PER_PAGE);

    res.status(200).json({ books, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


router.get('/:bookId/ratings', async (req, res) => {
  const { bookId } = req.params;

  try {
    const ratings = await Rating.find({ bookId });

    if (!ratings || ratings.length === 0) {
      return res.status(404).json({ averageRating: null });
    }

    const totalRatings = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    const averageRating = totalRatings / ratings.length;

    res.status(200).json({ averageRating });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});






module.exports = router;