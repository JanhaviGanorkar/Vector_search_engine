import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-black text-white">
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
         
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
              Vector Search Engine
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400">
            Perform blazing-fast semantic and keyword searches across your data using the power of vector embeddings.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-6">
            <a
              href="/get-started"
              className="h-12 px-6 text-base inline-flex items-center justify-center bg-white text-black rounded-md hover:bg-white-700 transition-all"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="/docs"
              className="h-12 px-6 text-base inline-flex items-center justify-center border-2 border-white text-white rounded-md hover:bg-blue-900/20  transition-all"
            >
              Read Docs
            </a>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full max-w-6xl h-6 bg-gradient-to-r from-cyan-600/20 via-blue-500/20 to-indigo-600/20 blur-3xl" />
    </section>
  );
};

export default HeroSection;
