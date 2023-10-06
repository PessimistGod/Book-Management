const express = require('express');
const router = express.Router();

const BookDetails = require('../Models/Books');


router.post('/create', async (req, res) =>  {
    try {
        if (req.method === 'POST') {
            const details = new BookDetails(req.body);
                
            const requiredFields = [{ key: 'imageUrl', message: 'Image Url is required' }, { key: 'authors', message: 'Author field is required' }, { key: 'price', message: 'Price field is required' }];
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
  const details = await BookDetails.find();
  res.status(200).json(details);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: error.message });
}
});


router.put('/update/:id', async (req, res) => {
try {
  const { id } = req.params;
  const updatedData = req.body;
  const updatedDetails = await BookDetails.findByIdAndUpdate(id, updatedData, { new: true });

  if (!updatedDetails) {
    return res.status(404).json({ error: 'Details not found' });
  }

  res.status(200).json({ success: 'Updated Successfully' });
} catch (error) {
  console.error(error);
  res.status(500).json({ error: error.message });
}
});



router.delete('/delete/:id', async (req, res) => {
try {
const { id } = req.params;

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

module.exports = router;