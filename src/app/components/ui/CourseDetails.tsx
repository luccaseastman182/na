import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { z } from 'zod';
import { create } from 'zustand';
import LoadingSpinner from './LoadingSpinner';
import ErrorHandling from './ErrorHandling';

const courseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(1, 'Price is required'),
  topics: z.array(z.object({
    title: z.string().min(1, 'Topic title is required'),
    modules: z.array(z.object({
      title: z.string().min(1, 'Module title is required'),
      content: z.string().min(1, 'Module content is required'),
    })).min(8, 'Each topic must have at least 8 modules'),
  })).min(7, 'Course must have at least 7 topics'),
});

const useCourseStore = create((set) => ({
  course: null,
  progress: 0,
  error: null,
  loading: false,
  fetchCourseDetails: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`/api/courses/${id}`);
      set({ course: response.data });
    } catch (error) {
      set({ error: 'Error fetching course details' });
    } finally {
      set({ loading: false });
    }
  },
  fetchProgress: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`/api/courses/${id}/progress`);
      set({ progress: response.data.progress });
    } catch (error) {
      set({ error: 'Error fetching progress' });
    } finally {
      set({ loading: false });
    }
  },
}));

const CourseDetails = () => {
  const { course, progress, error, loading, fetchCourseDetails, fetchProgress } = useCourseStore();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchCourseDetails(id);
      fetchProgress(id);
    }
  }, [id, fetchCourseDetails, fetchProgress]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorHandling error={error} />;
  }

  if (!course) {
    return <div>Loading...</div>;
  }

  const StudentPortal = dynamic(() => import('./StudentPortal'), { ssr: false });
  const TakeExamButton = dynamic(() => import('./TakeExamButton'), { ssr: false });

  return (
    <div className="container mx-auto py-8 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4 text-gray-100">{course.title}</h2>
      <p className="text-gray-300 mb-4">{course.description}</p>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2 text-gray-100">Course Modules</h3>
        <ul className="list-disc list-inside">
          {course.modules.map((module) => (
            <li key={module.id} className="mb-2 text-gray-300">
              {module.title}
            </li>
          ))}
        </ul>
        <div className="mt-4 text-gray-300">
          <p>Progress: {progress} modules completed out of {course.modules.length}</p>
        </div>
        <TakeExamButton courseId={id} />
      </div>
      <StudentPortal studentId={course.studentId} />
    </div>
  );
};

export default CourseDetails;
