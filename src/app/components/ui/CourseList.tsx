import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { create } from 'zustand';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import LoadingSpinner from './LoadingSpinner';
import ErrorHandling from './ErrorHandling';

const courseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(1, 'Price is required'),
});

const useCourseStore = create((set) => ({
  courses: [],
  loading: false,
  error: null,
  fetchCourses: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('/api/courses');
      set({ courses: response.data });
    } catch (error) {
      set({ error: 'Error fetching courses' });
    } finally {
      set({ loading: false });
    }
  },
}));

const CourseList = () => {
  const { courses, loading, error, fetchCourses } = useCourseStore();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(courseSchema),
  });

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <div className="container mx-auto py-8 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4 text-gray-100">Available Courses</h2>
      {loading && <LoadingSpinner />}
      {error && <ErrorHandling error={error} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-gray-100">{course.title}</h3>
            <p className="text-gray-300 mb-4">{course.description}</p>
            <a href={`/courses/${course.id}`} className="text-blue-500 hover:underline">View Details</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
