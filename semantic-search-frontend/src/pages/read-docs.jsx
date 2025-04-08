import React from "react";

export default function ReadDocs() {
  return (
    <div className="container py-12 px-4 mx-auto">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Documentation</h1>
        <div className="prose prose-zinc dark:prose-invert">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <p className="text-muted-foreground mb-4">
              This application allows you to upload documents and perform semantic searches using vector similarity. Follow the steps below to get started:
            </p>
            <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
              <li>Create an account or log in if you already have one.</li>
              <li>Upload documents through the "Add Document" page.</li>
              <li>Use the search functionality to find relevant documents based on your query.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Document upload with title and content fields.</li>
              <li>Semantic search using vector similarity.</li>
              <li>Secure storage of documents and vectors.</li>
              <li>Responsive design for seamless usage across devices.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">API Endpoints</h2>
            <p className="text-muted-foreground mb-4">
              The backend provides the following API endpoints:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><code>POST /api/auth/login</code>: Log in to your account.</li>
              <li><code>POST /api/auth/register</code>: Register a new account.</li>
              <li><code>POST /api/documents</code>: Upload a new document.</li>
              <li><code>POST /api/documents/search</code>: Search for documents using a query.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Technical Details</h2>
            <p className="text-muted-foreground mb-4">
              This application uses the following technologies:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Frontend: React with Vite and Tailwind CSS.</li>
              <li>Backend: Node.js with Express and MongoDB.</li>
              <li>Vectorization: TF-IDF for semantic search.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Support</h2>
            <p className="text-muted-foreground">
              If you encounter any issues or have questions, please contact our support team through the provided channels.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}