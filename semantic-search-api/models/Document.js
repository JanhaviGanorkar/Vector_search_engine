const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  title: String,
  content: String,
  vector: [Number], // Store the TF-IDF vector
  metadata: {
    type: Map,
    of: String,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Document', DocumentSchema);
