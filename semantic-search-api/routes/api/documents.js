const express = require('express');
const router = express.Router();
const Document = require('../../models/Document');

// POST /api/documents
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const document = new Document({ title, content });
    await document.save();
    res.json(document);
  } catch (err) {
    console.error('Document creation error:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// POST /api/documents/search
router.post('/search', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }

    const results = await Document.find({
      $or: [
        { title: { $regex: query, $options: 'i' }},
        { content: { $regex: query, $options: 'i' }}
      ]
    });

    res.json(results);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ 
      message: 'Failed to perform search',
      error: err.message 
    });
  }
});

module.exports = router;
