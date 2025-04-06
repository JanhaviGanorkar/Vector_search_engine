import React from "react";

export default function Privacy() {
  return (
    <div className="container py-12 px-4 mx-auto">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="prose prose-zinc dark:prose-invert">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information Collection and Use</h2>
            <p className="text-muted-foreground mb-4">
              Our vector search engine processes and stores only the code snippets and documentation that users explicitly submit. 
              We do not collect any personal information beyond what is necessary for basic service functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="text-muted-foreground mb-4">
              All code snippets and vectors are stored securely in our database. We employ industry-standard encryption 
              and security measures to protect your data.
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Secure HTTPS encryption for all data transfers</li>
              <li>Regular security audits and updates</li>
              <li>Limited access to production databases</li>
              <li>Data backups with encryption at rest</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Vector Storage</h2>
            <p className="text-muted-foreground mb-4">
              Code snippets are converted into vector embeddings using TF-IDF. These vectors are used solely for 
              search functionality and are stored securely alongside the original content.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Deletion</h2>
            <p className="text-muted-foreground">
              Users can request the deletion of their submitted content at any time. Contact our support team to 
              initiate the removal process.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
