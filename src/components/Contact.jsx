import React from "react";

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Contact Us</h1>
      <p className="mb-4 text-gray-700">
        Have questions or need help? Fill out the form below or reach us through our contact details.
      </p>

      <form className="space-y-4">
        <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-lg" />
        <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-lg" />
        <textarea placeholder="Your Message" className="w-full p-3 border rounded-lg h-32"></textarea>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Send Message
        </button>
      </form>
    </div>
  );
}