"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [runningInstances, setRunningInstances] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [totalInstances, setTotalInstances] = useState<number | null>(null); // New state for total instances

  useEffect(() => {
    const fetchInstances = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/get-running-instances');

        if (!response.ok) throw new Error('Failed to fetch instances');

        const data = await response.json();
        setRunningInstances(data.runningInstances || 0);
        setTotalInstances(data.totalInstances || 0);
      } catch (error) {
        // Type assertion to handle unknown error
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInstances();
  }, []);

  return (
    <div className="flex flex-col p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        {/* Button to navigate to the AWS credentials page */}
        <Link href="/projects/add-credentials">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Manage AWS Credentials
          </button>
        </Link>
      </div>

      {loading && <p className="mb-4">Loading data...</p>} {/* Loading indicator */}
      {errorMessage && (
        <div className="mb-4 text-red-500">{errorMessage}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-600 p-4 rounded-md">
          <h2 className="text-lg font-semibold">Running EC2 Instances</h2>
          <p className="text-2xl">{runningInstances !== null ? runningInstances : 'N/A'}</p>
        </div>
        <div className="bg-green-600 p-4 rounded-md">
          <h2 className="text-lg font-semibold">Total EC2 Instances</h2>
          <p className="text-2xl">{totalInstances !== null ? totalInstances : 'N/A'}</p>
        </div>
        {/* Add more cards here as needed */}
        <div className="bg-yellow-600 p-4 rounded-md">
          <h2 className="text-lg font-semibold">Other Metrics</h2>
          <p className="text-2xl">More data can go here</p>
        </div>
        <div className="bg-red-600 p-4 rounded-md">
          <h2 className="text-lg font-semibold">Health Status</h2>
          <p className="text-2xl">All systems operational</p>
        </div>
      </div>

      {runningInstances === 0 && (
        <div className="mt-4 text-yellow-500">
          No running EC2 instances found.
        </div>
      )}
    </div>
  );
}
