"use client";
import { useState, useEffect } from 'react';

interface EC2Instance {
  id: string;
  name: string;
}

export default function ManageEC2() {
  const [instanceId, setInstanceId] = useState('');
  const [newInstanceType, setNewInstanceType] = useState('');
  const [instances, setInstances] = useState<EC2Instance[]>([]);
  const [dummyInstances, setDummyInstances] = useState<EC2Instance[]>([
    { id: 'dummy-1', name: 'Dummy Instance 1' },
    { id: 'dummy-2', name: 'Dummy Instance 2' }
  ]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstances = async () => {
      try {
        const response = await fetch('/api/get-ec2-instances'); // Update with your API endpoint
        if (!response.ok) throw new Error('Failed to fetch instances');
        const data = await response.json();
        setInstances(data.instances); // Adjust based on your API response
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('An unexpected error occurred');
        }
        // Load user's dummy data from local storage
        const storedDummyData = localStorage.getItem('dummyInstances');
        if (storedDummyData) {
          setDummyInstances(JSON.parse(storedDummyData));
        }
      }
    };

    fetchInstances();
  }, []);

  const handleAddInstance = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/add-ec2-instance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ instanceType: newInstanceType }), // Modify this as per your API
      });

      if (!response.ok) throw new Error('Failed to add EC2 instance');

      // Optionally, you can refetch instances or update state
      setNewInstanceType('');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unexpected error occurred');
      }
      // If adding fails, add to dummy data
      const newDummyInstance = { id: `dummy-${Date.now()}`, name: newInstanceType };
      setDummyInstances((prev) => [...prev, newDummyInstance]);
      localStorage.setItem('dummyInstances', JSON.stringify([...dummyInstances, newDummyInstance]));
      setNewInstanceType(''); // Clear the input
    } finally {
      setLoading(false);
    }
  };

  const handleTerminateInstance = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/terminate-ec2-instance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ instanceId }), // Replace with the actual instance ID you want to terminate
      });

      if (!response.ok) throw new Error('Failed to terminate EC2 instance');
      // Optionally, you can refetch instances or update state
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleShutdownInstance = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/shutdown-ec2-instance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ instanceId }), // Replace with the actual instance ID you want to shut down
      });

      if (!response.ok) throw new Error('Failed to shut down EC2 instance');
      // Optionally, you can refetch instances or update state
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Manage EC2 Instances</h1>

      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      <form onSubmit={handleAddInstance} className="mb-6 flex space-x-4">
        <input
          type="text"
          placeholder="Instance Type"
          value={newInstanceType}
          onChange={(e) => setNewInstanceType(e.target.value)}
          className="border border-gray-300 p-3 rounded-md flex-grow"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Instance'}
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-4">Existing EC2 Instances</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {instances.length > 0 ? (
          instances.map((instance) => (
            <div key={instance.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col">
              <h3 className="text-lg font-bold mb-2">{instance.name}</h3>
              <p className="text-gray-600 mb-4">ID: {instance.id}</p>
              <div className="flex space-x-2 mt-auto">
                <button
                  onClick={() => {
                    setInstanceId(instance.id);
                    handleShutdownInstance();
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-3 rounded"
                >
                  Shutdown
                </button>
                <button
                  onClick={() => {
                    setInstanceId(instance.id);
                    handleTerminateInstance();
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded"
                >
                  Terminate
                </button>
              </div>
            </div>
          ))
        ) : (
          dummyInstances.map(instance => (
            <div key={instance.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col">
              <h3 className="text-lg font-bold mb-2">{instance.name}</h3>
              <p className="text-gray-600 mb-4">ID: {instance.id}</p>
              <div className="flex space-x-2 mt-auto">
                <button
                  onClick={() => {
                    setInstanceId(instance.id);
                    handleShutdownInstance();
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-3 rounded"
                >
                  Shutdown
                </button>
                <button
                  onClick={() => {
                    setInstanceId(instance.id);
                    handleTerminateInstance();
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded"
                >
                  Terminate
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Display dummy data message if there was an error */}
      {errorMessage && (
        <div className="mt-4 text-yellow-500">
          <p>Showing dummy data due to an error:</p>
          <ul>
            {dummyInstances.map(instance => (
              <li key={instance.id}>{instance.name} (ID: {instance.id})</li>
            ))}
          </ul>
        </div>
      )}

      {/* Logout button for testing purposes */}
      
    </div>
  );
}
