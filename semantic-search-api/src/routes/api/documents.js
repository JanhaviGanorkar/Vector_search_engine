const express = require('express');
const router = express.Router();
const Document = require('../../models/Document');
const Vocabulary = require('../../models/Vocabulary');
const { processText, createVector, cosineSimilarity } = require('../../utils/vectorizer');

async function getVocabulary() {
  let vocabulary = await Vocabulary.findOne();
  if (!vocabulary) {
    vocabulary = new Vocabulary({ terms: [] });
    await vocabulary.save();
  }
  return vocabulary;
}

router.get('/', async (req, res) => {
  try {
    const documents = await Document.find({}).sort('-createdAt');
    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching documents', error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;

    const vocabulary = await getVocabulary();
    const vocabSet = new Set(vocabulary.terms);

    const tokens = processText(content);
    let vocabularyUpdated = false;

    tokens.forEach(token => {
      if (!vocabSet.has(token)) {
        vocabSet.add(token);
        vocabularyUpdated = true;
      }
    });

    if (vocabularyUpdated) {
      vocabulary.terms = Array.from(vocabSet);
      await vocabulary.save();
    }

    const vector = createVector(content, Array.from(vocabSet));

    const document = new Document({ title, content, vector });
    await document.save();

    res.status(201).json(document);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

router.post('/search', async (req, res) => {
  try {
    const { query, page = 1, limit = 10, filters = {} } = req.body;
    if (!query?.trim()) {
      return res.status(400).json({ message: 'Query is required' });
    }

    const vocabulary = await getVocabulary();
    if (!vocabulary || vocabulary.terms.length === 0) {
      return res.status(500).json({ message: 'Vocabulary is empty. Please ingest documents first.' });
    }

    const queryVector = createVector(query, vocabulary.terms);

    const textSearchResults = await Document.find(
      { $text: { $search: query }, ...filters },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    const regexSearchResults = await Document.find({
      content: { $regex: query, $options: "i" },
      ...filters
    });

    const allResults = [...new Map([...textSearchResults, ...regexSearchResults].map(doc => [doc._id.toString(), doc])).values()];

    if (allResults.length === 0) {
      return res.status(404).json({ message: 'No matching documents found.' });
    }

    const results = allResults.map(doc => ({
      ...doc.toObject(),
      similarity: cosineSimilarity(queryVector, doc.vector),
      score: doc._doc.score || 0
    }))
    .filter(doc => doc.similarity > 0 || doc.score > 0)
    .map(doc => ({
      ...doc,
      relevance: (doc.score || 0) + (doc.similarity || 0)
    }))
    .sort((a, b) => b.relevance - a.relevance);

    const startIndex = (page - 1) * limit;
    const paginatedResults = results.slice(startIndex, startIndex + limit);

    res.json({
      results: paginatedResults,
      total: results.length,
      page,
      limit
    });
  } catch (err) {
    res.status(500).json({ message: 'Search failed', error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.json(document);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch document', error: err.message });
  }
});

module.exports = router;
