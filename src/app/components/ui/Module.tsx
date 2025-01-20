import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MarkCompleteButton from './MarkCompleteButton';

const Module = ({ courseId }) => {
  const [modules, setModules] = useState([]);
  const [completedModules, setCompletedModules] = useState([]);

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

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Course Modules</h2>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <ul className="list-disc list-inside">
          {modules.map((module) => (
            <li key={module.id} className="mb-2">
              {module.title}
              <MarkCompleteButton moduleId={module.id} onComplete={() => handleModuleComplete(module.id)} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Module;
