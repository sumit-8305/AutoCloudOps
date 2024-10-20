"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [runningInstances, setRunningInstances] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [totalInstances, setTotalInstances] = useState<number | null>(null);

  // Dummy data to display in case of an error
  const dummyData = {
    runningInstances: 3,
    totalInstances: 10,
  };

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
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('An unexpected error occurred');
        }
        // Set dummy data in case of an error
        setRunningInstances(dummyData.runningInstances);
        setTotalInstances(dummyData.totalInstances);
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
        <Link href="/projects/add-credentials">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Manage AWS Credentials
          </button>
        </Link>
      </div>

      {loading && <p className="mb-4">Loading data...</p>}
      {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
      {errorMessage && (
        <div className="mb-4 text-yellow-500">
          Dummy data showing: Running Instances: {dummyData.runningInstances}, Total Instances: {dummyData.totalInstances}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {/* Card for Running Instances */}
        <div className="bg-blue-600 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-white">Running EC2 Instances</h2>
          <p className="text-2xl text-white">{runningInstances !== null ? runningInstances : 'N/A'}</p>
        </div>

        {/* Card for Total Instances */}
        <div className="bg-green-600 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-white">Total EC2 Instances</h2>
          <p className="text-2xl text-white">{totalInstances !== null ? totalInstances : 'N/A'}</p>
        </div>

        {/* Additional Dummy Metrics Card */}
        <div className="bg-yellow-600 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-white">Other Metrics</h2>
          <p className="text-2xl text-white">More data can go here</p>
        </div>

        {/* Health Status Card */}
        <div className="bg-red-600 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-white">Health Status</h2>
          <p className="text-2xl text-white">All systems operational</p>
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
