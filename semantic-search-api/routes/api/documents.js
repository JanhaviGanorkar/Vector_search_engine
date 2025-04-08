const express = require('express');
const router = express.Router();
const Document = require('../../models/Document');
const Vocabulary = require('../../models/Vocabulary');
const { processText, createVector, cosineSimilarity } = require('../../utils/vectorizer');

// Helper function to get or create vocabulary
async function getVocabulary() {
  let vocabulary = await Vocabulary.findOne();
  if (!vocabulary) {
    vocabulary = new Vocabulary({ terms: [] });
    await vocabulary.save();
  }
  return vocabulary;
}

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
    
    // Get current vocabulary
    const vocabulary = await getVocabulary();
    const vocabSet = new Set(vocabulary.terms);
    
    // Process text and update vocabulary
    const tokens = processText(content);
    let vocabularyUpdated = false;
    
    tokens.forEach(token => {
      if (!vocabSet.has(token)) {
        vocabSet.add(token);
        vocabularyUpdated = true;
      }
    });

    // Update vocabulary if changed
    if (vocabularyUpdated) {
      vocabulary.terms = Array.from(vocabSet);
      await vocabulary.save();
    }
    
    // Create vector using current vocabulary
    const vector = createVector(content, Array.from(vocabSet));
    
    // Save document
    const document = new Document({ title, content, vector });
    await document.save();
    
    res.status(201).json(document);
  } catch (err) {
    console.error('Document creation error:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Debugging and fixing the search functionality
router.post('/search', async (req, res) => {
  try {
    const { query, page = 1, limit = 10, filters = {} } = req.body;
    if (!query?.trim()) {
      return res.status(400).json({ message: 'Query is required' });
    }

    // Get vocabulary for vector search
    const vocabulary = await getVocabulary();
    if (!vocabulary || vocabulary.terms.length === 0) {
      return res.status(500).json({ message: 'Vocabulary is empty. Please ingest documents first.' });
    }

    const queryVector = createVector(query, vocabulary.terms);

    // MongoDB text search (full-text search)
    const textSearchResults = await Document.find(
      { $text: { $search: query }, ...filters },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    // Regex-based search for partial word matching
    const regexSearchResults = await Document.find({
      content: { $regex: query, $options: "i" },
      ...filters
    });

    // Merge results (avoid duplicates)
    const allResults = [...new Map([...textSearchResults, ...regexSearchResults].map(doc => [doc._id.toString(), doc])).values()];

    if (allResults.length === 0) {
      return res.status(404).json({ message: 'No matching documents found.' });
    }

    // Calculate vector similarities
    const results = allResults.map(doc => ({
      ...doc.toObject(),
      similarity: cosineSimilarity(queryVector, doc.vector),
      score: doc._doc.score || 0 // Include text search score
    }))
    .filter(doc => doc.similarity > 0 || doc.score > 0) // Filter relevant results
    .map(doc => ({
      ...doc,
      relevance: (doc.score || 0) + (doc.similarity || 0) // Combine text score & similarity
    }))
    .sort((a, b) => b.relevance - a.relevance); // Sort by relevance

    // Pagination
    const startIndex = (page - 1) * limit;
    const paginatedResults = results.slice(startIndex, startIndex + limit);

    res.json({
      results: paginatedResults,
      total: results.length,
      page,
      limit
    });
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ message: 'Search failed', error: err.message });
  }
});

// GET /api/documents/:id - Retrieve a specific document by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.json(document);
  } catch (err) {
    console.error('Error fetching document:', err);
    res.status(500).json({ message: 'Failed to fetch document', error: err.message });
  }
});

module.exports = router;
