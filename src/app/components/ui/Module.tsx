import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProtectedRoute from './ProtectedRoute';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStore } from 'zustand';

const moduleSchema = z.object({
  modules: z.array(z.object({
    id: z.string(),
    title: z.string().min(1, 'Module title is required'),
  })),
  completedModules: z.array(z.string()),
});

const useModuleStore = create((set) => ({
  modules: [],
  completedModules: [],
  showPopup: false,
  fetchModules: async (courseId) => {
    try {
      const response = await axios.get(`/api/courses/${courseId}/modules`);
      set({ modules: response.data });
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  },
  fetchCompletedModules: async (courseId) => {
    try {
      const response = await axios.get(`/api/courses/${courseId}/completed-modules`);
      set({ completedModules: response.data });
    } catch (error) {
      console.error('Error fetching completed modules:', error);
    }
  },
  handleModuleComplete: (moduleId) => set((state) => ({
    completedModules: [...state.completedModules, moduleId],
  })),
  handleButtonClick: () => set({ showPopup: true }),
  handleConfirm: () => set({ showPopup: false }),
  handleCancel: () => set({ showPopup: false }),
}));

const Module = ({ courseId }) => {
  const { modules, completedModules, showPopup, fetchModules, fetchCompletedModules, handleModuleComplete, handleButtonClick, handleConfirm, handleCancel } = useModuleStore();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(moduleSchema),
  });

  useEffect(() => {
    fetchModules(courseId);
    fetchCompletedModules(courseId);
  }, [courseId, fetchModules, fetchCompletedModules]);

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
