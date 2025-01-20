import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { authjs } from 'authjs';
import ProtectedRoute from './ProtectedRoute';

const StudyHub = () => {
  const { data: session, status } = authjs();
  const router = useRouter();
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session?.user.role !== 'student') {
      router.push('/unauthorized');
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchModules = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/modules');
        setModules(response.data);
      } catch (error) {
        console.error('Error fetching modules:', error);
        setError('Error fetching modules');
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
  };

  const handleModuleComplete = async (moduleId) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(`/api/modules/${moduleId}/complete`);
      setCompletedModules((prev) => [...prev, moduleId]);
    } catch (error) {
      console.error('Error marking module as complete:', error);
      setError('Error marking module as complete');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ProtectedRoute roles={['student']}>
      <div className="container mx-auto py-8 bg-gray-900 text-white">
        <h2 className="text-2xl font-bold mb-4">Study Hub</h2>
        <div className="flex">
          <div className="w-1/4 bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Modules</h3>
            <ul className="list-disc list-inside">
              {modules.map((module) => (
                <li key={module.id} className="mb-2">
                  <button
                    className={`text-left w-full ${completedModules.includes(module.id) ? 'line-through' : ''}`}
                    onClick={() => handleModuleSelect(module)}
                  >
                    {module.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-3/4 bg-gray-800 p-4 rounded-lg shadow-md ml-4">
            {selectedModule ? (
              <div>
                <h3 className="text-xl font-semibold mb-2">{selectedModule.title}</h3>
                <p>{selectedModule.content}</p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                  onClick={() => handleModuleComplete(selectedModule.id)}
                  disabled={completedModules.includes(selectedModule.id)}
                >
                  {completedModules.includes(selectedModule.id) ? 'Module Completed' : 'Mark Module as Complete'}
                </button>
              </div>
            ) : (
              <p>Select a module to view its content</p>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default StudyHub;
