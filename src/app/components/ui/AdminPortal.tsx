import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authjs } from 'authjs';
import axios from 'axios';
import dynamic from 'next/dynamic';
import ProtectedRoute from './ProtectedRoute';
import CourseCreator from './CourseCreator';
import { create } from 'zustand';

const useCourseStore = create((set) => ({
  courses: [],
  fetchCourses: async () => {
    const response = await axios.get('/api/courses');
    set({ courses: response.data });
  },
  addCourse: async (data) => {
    await axios.post('/api/courses', data);
    set((state) => ({ courses: [...state.courses, data] }));
  },
}));

const AdminPortal = () => {
  const { data: session, status } = authjs();
  const router = useRouter();
  const { courses, fetchCourses } = useCourseStore();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session?.user.role !== 'admin') {
      router.push('/unauthorized');
    }
  }, [status, session, router]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session?.user.role !== 'admin') {
    return <div>Access denied</div>;
  }

  return (
    <ProtectedRoute roles={['admin']}>
      <div className="container mx-auto p-4 bg-gray-900 text-white">
        <h1 className="text-2xl font-bold mb-4">Admin Portal</h1>
        <h2 className="text-xl font-bold mb-4">Course Creation</h2>
        <CourseCreator />
        <h2 className="text-xl font-bold mb-4">Existing Courses</h2>
        <ul>
          {courses.map((course) => (
            <li key={course.id} className="mb-2">
              <h3 className="text-lg font-bold">{course.title}</h3>
              <p>{course.description}</p>
              <p>Price: ${course.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </ProtectedRoute>
  );
};

export default AdminPortal;
