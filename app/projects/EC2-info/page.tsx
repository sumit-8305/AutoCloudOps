"use client"
import { useState, useEffect } from 'react';

interface EC2Instance {
  id: string;
  name: string;
}

export default function ManageEC2() {
  const [instanceId, setInstanceId] = useState('');
  const [newInstanceType, setNewInstanceType] = useState('');
  const [instances, setInstances] = useState<EC2Instance[]>([]);
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
      <h1 className="text-2xl font-bold mb-4">Manage EC2 Instances</h1>

      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      <form onSubmit={handleAddInstance} className="mb-4">
        <h2 className="text-lg font-semibold">Add New EC2 Instance</h2>
        <input
          type="text"
          placeholder="Instance Type"
          value={newInstanceType}
          onChange={(e) => setNewInstanceType(e.target.value)}
          className="border p-2 rounded-md mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Instance'}
        </button>
      </form>

      <h2 className="text-lg font-semibold mb-2">Existing EC2 Instances</h2>
      <ul>
        {instances.map((instance) => (
          <li key={instance.id} className="flex justify-between items-center mb-2">
            <span>{instance.name} (ID: {instance.id})</span>
            <div>
              <button
                onClick={() => {
                  setInstanceId(instance.id);
                  handleShutdownInstance();
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2"
              >
                Shutdown
              </button>
              <button
                onClick={() => {
                  setInstanceId(instance.id);
                  handleTerminateInstance();
                }}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
              >
                Terminate
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
