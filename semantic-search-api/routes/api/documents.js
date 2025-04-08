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

// POST /api/documents/search - Search documents
router.post('/search', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query?.trim()) {
      return res.status(400).json({ message: 'Query is required' });
    }

    // Get vocabulary for vector search
    const vocabulary = await getVocabulary();
    const queryVector = createVector(query, vocabulary.terms);

    // MongoDB text search (full-text search)
    const textSearchResults = await Document.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    // Regex-based search for partial word matching
    const regexSearchResults = await Document.find({
      content: { $regex: query, $options: "i" } // Case-insensitive search
    });

    // Merge results (avoid duplicates)
    const allResults = [...new Map([...textSearchResults, ...regexSearchResults].map(doc => [doc._id.toString(), doc])).values()];

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
    .sort((a, b) => b.relevance - a.relevance) // Sort by relevance
    .slice(0, 10); // Limit results

    res.json(results);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ message: 'Search failed', error: err.message });
  }
});

module.exports = router;
