import { BookOpen, Code, Search, Zap } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Semantic Search",
    description: "Advanced search capabilities using TF-IDF and vector similarity to find relevant code snippets.",
  },
  {
    icon: Code,
    title: "Code Understanding",
    description: "Intelligent parsing and analysis of code to understand context and relationships.",
  },
  {
    icon: Zap,
    title: "Fast Performance",
    description: "Optimized vector storage and retrieval for quick and efficient search results.",
  },
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Comprehensive documentation search across multiple programming languages and frameworks.",
  },
];

export default function About() {
  return (
    <div className="container py-12 px-4 mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Vector Search</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A powerful semantic search engine built for developers, making it easier to find and understand code snippets and documentation.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {features.map((feature) => (
          <div key={feature.title} className="p-6 rounded-lg border border-border/60 bg-muted/30">
            <feature.icon className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <p className="text-muted-foreground mb-6">
          Our search engine uses advanced natural language processing and vector similarity techniques to understand the semantic meaning behind code snippets and documentation.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Vector Embeddings</h3>
            <p className="text-muted-foreground">
              We convert code and text into high-dimensional vectors using TF-IDF, capturing the semantic relationships between different pieces of content.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Similarity Matching</h3>
            <p className="text-muted-foreground">
              When you search, we compare your query with our vector database using cosine similarity to find the most relevant matches.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
