const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true // Add index to title
  },
  content: {
    type: String,
    required: true,
    index: true // Add index to content
  },
  vector: {
    type: [Number],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add compound text index
DocumentSchema.index({ title: 'text', content: 'text' });

// Ensure indexes are created
DocumentSchema.on('index', error => {
  if (error) {
    console.error('Document index error: %s', error);
  } else {
    console.info('Document indexing complete');
  }
});

module.exports = mongoose.model('Document', DocumentSchema);
