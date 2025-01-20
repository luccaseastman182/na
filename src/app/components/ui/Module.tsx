import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProtectedRoute from './ProtectedRoute';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { create } from 'zustand';

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
  loading: false,
  error: null,
  fetchModules: async (courseId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`/api/courses/${courseId}/modules`);
      set({ modules: response.data });
    } catch (error) {
      console.error('Error fetching modules:', error);
      set({ error: 'Error fetching modules' });
    } finally {
      set({ loading: false });
    }
  },
  fetchCompletedModules: async (courseId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`/api/courses/${courseId}/completed-modules`);
      set({ completedModules: response.data });
    } catch (error) {
      console.error('Error fetching completed modules:', error);
      set({ error: 'Error fetching completed modules' });
    } finally {
      set({ loading: false });
    }
  },
  handleModuleComplete: async (moduleId) => {
    set({ loading: true, error: null });
    try {
      await axios.post(`/api/modules/${moduleId}/complete`);
      set((state) => ({
        completedModules: [...state.completedModules, moduleId],
      }));
    } catch (error) {
      console.error('Error marking module as complete:', error);
      set({ error: 'Error marking module as complete' });
    } finally {
      set({ loading: false });
    }
  },
  handleButtonClick: () => set({ showPopup: true }),
  handleConfirm: () => set({ showPopup: false }),
  handleCancel: () => set({ showPopup: false }),
}));

const Module = ({ courseId }) => {
  const { modules, completedModules, showPopup, loading, error, fetchModules, fetchCompletedModules, handleModuleComplete, handleButtonClick, handleConfirm, handleCancel } = useModuleStore();
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
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <ul className="list-disc list-inside">
            {modules.map((module) => (
              <li key={module.id} className="mb-2">
                {module.title}
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                  onClick={() => handleModuleComplete(module.id)}
                  disabled={completedModules.includes(module.id)}
                >
                  {completedModules.includes(module.id) ? 'Module Completed' : 'Mark Module as Complete'}
                </button>
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
