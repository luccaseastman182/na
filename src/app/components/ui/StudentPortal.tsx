import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProtectedRoute from './ProtectedRoute';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { create } from 'zustand';

const courseSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  progress: z.number().min(0).max(100),
  certificates: z.array(z.object({
    id: z.string(),
    title: z.string().min(1, 'Certificate title is required'),
    url: z.string().url('Invalid URL'),
  })),
});

const useStudentStore = create((set) => ({
  courses: [],
  progress: {},
  certificates: [],
  error: null,
  loading: false,
  fetchCourses: async (studentId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`/api/students/${studentId}/courses`);
      set({ courses: response.data });
    } catch (error) {
      set({ error: 'Error fetching courses' });
    } finally {
      set({ loading: false });
    }
  },
  fetchProgress: async (studentId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`/api/students/${studentId}/progress`);
      set({ progress: response.data });
    } catch (error) {
      set({ error: 'Error fetching progress' });
    } finally {
      set({ loading: false });
    }
  },
  fetchCertificates: async (studentId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`/api/students/${studentId}/certificates`);
      set({ certificates: response.data });
    } catch (error) {
      set({ error: 'Error fetching certificates' });
    } finally {
      set({ loading: false });
    }
  },
}));

const StudentPortal = ({ studentId }) => {
  const { courses, progress, certificates, error, loading, fetchCourses, fetchProgress, fetchCertificates } = useStudentStore();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(courseSchema),
  });

  useEffect(() => {
    fetchCourses(studentId);
    fetchProgress(studentId);
    fetchCertificates(studentId);
  }, [studentId, fetchCourses, fetchProgress, fetchCertificates]);

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 bg-gray-900 text-white">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Student Portal</h2>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline">{error.message}</span>
        </div>}
        {loading && <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
        </div>}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-100">My Courses</h3>
          <ul className="list-disc list-inside">
            {courses.map((course) => (
              <li key={course.id} className="mb-2 text-gray-300">
                {course.title}
                <div className="mt-2">
                  <p>Progress: {progress[course.id] || 0}%</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-100">My Certificates</h3>
          <ul className="list-disc list-inside">
            {certificates.map((certificate) => (
              <li key={certificate.id} className="mb-2 text-gray-300">
                {certificate.title}
                <div className="mt-2">
                  <a href={certificate.url} className="text-blue-500 hover:underline">Download Certificate</a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default StudentPortal;
