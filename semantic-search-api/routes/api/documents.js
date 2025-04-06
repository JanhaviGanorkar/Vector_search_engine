const express = require('express');
const router = express.Router();
const Document = require('../../models/Document');
const { processText, createVector, cosineSimilarity } = require('../../utils/vectorizer');

// Store global vocabulary for TF-IDF
let globalVocabulary = new Set();

// GET /api/documents - List all documents
router.get('/', async (req, res) => {
  try {
    const documents = await Document.find({}).sort('-createdAt');
    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching documents', error: err.message });
  }
});

// POST /api/documents - Create new document
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    
    // Process text and update vocabulary
    const tokens = processText(content);
    tokens.forEach(token => globalVocabulary.add(token));
    
    // Create vector using TF-IDF
    const vector = createVector(content, Array.from(globalVocabulary));
    
    const document = new Document({ title, content, vector });
    await document.save();
    
    res.status(201).json(document);
  } catch (err) {
    res.status(500).json({ message: 'Error creating document', error: err.message });
  }
});

// POST /api/documents/search - Search documents
router.post('/search', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query?.trim()) {
      return res.status(400).json({ message: 'Query is required' });
    }

    // Get query vector
    const queryTokens = processText(query);
    const queryVector = createVector(query, Array.from(globalVocabulary));

    // Get all documents
    const documents = await Document.find({});
    
    // Calculate similarities and sort results
    const results = documents
      .map(doc => ({
        ...doc.toObject(),
        similarity: cosineSimilarity(queryVector, doc.vector)
      }))
      .filter(doc => doc.similarity > 0)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 10); // Top 10 results

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Search failed', error: err.message });
  }
});

module.exports = router;
