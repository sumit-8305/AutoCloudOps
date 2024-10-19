"use client"
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';

export default function Page () {
  const { user, isLoaded, isSignedIn } = useUser();
  const [awsAccessKey, setAwsAccessKey] = useState('');
  const [awsSecretKey, setAwsSecretKey] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    console.log('AWS Access Key ID:', awsAccessKey);
    console.log('AWS Secret Access Key:', awsSecretKey);
    console.log(user?.emailAddresses[0]?.emailAddress);
    console.log(user?.username);

    if (!awsAccessKey || !awsSecretKey) {
      setMessage('Please fill in all fields.');
      return;
    }

    

    try {
      const res = await fetch('/api/add-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          awsAccessKey,
          awsSecretKey,
          email: user?.emailAddresses[0]?.emailAddress || '', // Use optional chaining and fallback to an empty string
          username: user?.username, // Handle possible undefined values
        }),
      });

      const result = await res.json();
      if (res.ok) {
        setMessage('AWS Credentials saved successfully!');
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage('An error occurred while saving the credentials.');
    }
  };

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>Please sign in to access this page.</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Manage AWS Credentials</h1>

      {message && <p className="text-green-500 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="awsAccessKey">
            AWS Access Key
          </label>
          <input
            id="awsAccessKey"
            type="text"
            value={awsAccessKey}
            onChange={(e) => setAwsAccessKey(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="awsSecretKey">
            AWS Secret Key
          </label>
          <input
            id="awsSecretKey"
            type="password"
            value={awsSecretKey}
            onChange={(e) => setAwsSecretKey(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Save AWS Credentials
        </button>
      </form>
    </div>
  );
};


