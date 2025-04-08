import { useState } from 'react'
import { addDocument } from '../../src/lib/api'

const AddDocument = ({ onSuccess }) => {
  const [uploadLoading, setUploadLoading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const handleDocumentUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const content = formData.get('content');

    if (!title.trim() || !content.trim()) {
      alert('Both title and content are required');
      return;
    }

    try {
      await addDocument(title, content);
      e.target.reset();
      alert('Document added successfully!');
    } catch (err) {
      alert('Failed to add document: ' + err.message);
    }
  }

  return (
    <form onSubmit={handleDocumentUpload} className="w-full max-w-lg space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Document title"
        className="w-full h-12 px-4 rounded-lg border border-border bg-muted/50"
        disabled={uploadLoading}
        required
      />
      <textarea
        name="content"
        placeholder="Document content"
        className="w-full h-32 px-4 py-2 rounded-lg border border-border bg-muted/50"
        disabled={uploadLoading}
        required
      />
      <button
        type="submit"
        disabled={uploadLoading}
        className="w-full h-12 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        {uploadLoading ? 'Adding Document...' : 'Add Document'}
      </button>

      {uploadSuccess && (
        <div className="text-green-600 text-sm">Document added successfully!</div>
      )}
      {uploadError && (
        <div className="text-red-500 text-sm">{uploadError}</div>
      )}
    </form>
  )
}

export default AddDocument
