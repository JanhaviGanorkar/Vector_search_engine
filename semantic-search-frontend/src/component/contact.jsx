import React from 'react';

const ContactForm = () => {
  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
            Contact Us
          </span>
        </h2>
        <p className="text-lg md:text-xl text-gray-400 mb-8">
          Have questions or need support? Send us a message!
        </p>
        <form className="space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full h-12 px-4 rounded-md bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400 outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full h-12 px-4 rounded-md bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400 outline-none"
          />
          <textarea
            placeholder="Your Message"
            className="w-full h-32 p-4 rounded-md bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400 outline-none"
          />
          <button
            type="submit"
            className="h-12 w-full bg-white text-black rounded-md hover:bg-gray-300 transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;