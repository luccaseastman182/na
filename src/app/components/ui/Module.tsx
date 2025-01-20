import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProtectedRoute from './ProtectedRoute';

const Module = ({ courseId }) => {
  const [modules, setModules] = useState([]);
  const [completedModules, setCompletedModules] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}/modules`);
        setModules(response.data);
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };

    const fetchCompletedModules = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}/completed-modules`);
        setCompletedModules(response.data);
      } catch (error) {
        console.error('Error fetching completed modules:', error);
      }
    };

    fetchModules();
    fetchCompletedModules();
  }, [courseId]);

  const handleModuleComplete = (moduleId) => {
    setCompletedModules([...completedModules, moduleId]);
  };

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleConfirm = () => {
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 bg-gray-900 text-white">
        <h2 className="text-2xl font-bold mb-4">Course Modules</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <ul className="list-disc list-inside">
            {modules.map((module) => (
              <li key={module.id} className="mb-2">
                {module.title}
                {showPopup && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-md">
                      <p>Are you sure you want to mark this module as complete?</p>
                      <div className="mt-4 flex justify-end">
                        <button className="px-4 py-2 bg-gray-300 rounded mr-2" onClick={handleCancel}>
                          Cancel
                        </button>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleConfirm}>
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Module;
