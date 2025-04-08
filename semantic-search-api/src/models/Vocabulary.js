const mongoose = require('mongoose');

const VocabularySchema = new mongoose.Schema({
  terms: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model('Vocabulary', VocabularySchema);
