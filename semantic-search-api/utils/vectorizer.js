const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const TfIdf = natural.TfIdf;

function processText(text) {
  // Tokenize and clean text
  return tokenizer.tokenize(text.toLowerCase());
}

function createVector(text, vocabulary) {
  const tfidf = new TfIdf();
  tfidf.addDocument(text);
  
  // Create vector based on vocabulary
  return vocabulary.map(term => {
    const measure = tfidf.tfidf(term, 0);
    return isNaN(measure) ? 0 : measure;
  });
}

function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB) || 0;
}

module.exports = { processText, createVector, cosineSimilarity };
