"use client";

import { useState } from 'react';

export default function Page (){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formspreeUrl = process.env.NEXT_PUBLIC_FORMSPREE_URL; // Use NEXT_PUBLIC_ prefix for client-side

    // Check if the URL is defined
    if (!formspreeUrl) {
      setStatus('Form submission URL is not defined.');
      return;
    }

    const response = await fetch(formspreeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name, email, feedback }),
    });

    if (response.ok) {
      setStatus('Feedback sent successfully!');
      setName('');
      setEmail('');
      setFeedback('');
    } else {
      setStatus('Failed to send feedback.');
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-xl w-full ">
        <h2 className="text-3xl font-bold mb-6 text-center">Feedback Form</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <input 
            type="text" 
            placeholder="Your Name" 
            value={name}
            onChange={(e) => setName(e.target.value)} 
            required 
            className="border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea 
            placeholder="Your Feedback" 
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)} 
            required 
            className="border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={6}
          />
          <button type="submit" className="bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition">
            Submit Feedback
          </button>
          {status && <p className={`mt-2 ${status.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>{status}</p>}
        </form>
      </div>
    </div>
  );
};


