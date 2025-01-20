import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authjs } from 'authjs';
import { z } from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import dynamic from 'next/dynamic';
import ProtectedRoute from './ProtectedRoute';
import CourseCreator from './CourseCreator';
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
  const { courses, fetchCourses, addCourse } = useCourseStore();
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(courseSchema),
  });

  const { fields: topicFields, append: appendTopic, remove: removeTopic } = useFieldArray({
    control,
    name: 'topics',
  });

  const { fields: moduleFields, append: appendModule, remove: removeModule } = useFieldArray({
    control,
    name: 'topics.modules',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await addCourse(data);
      alert('Course created successfully');
    } catch (error) {
      console.error('Error creating course:', error);
      setError(error);
      alert('Failed to create course');
    } finally {
      setLoading(false);
    }
  };

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
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
          <div className="mb-4">
            <label className="block">Course Title</label>
            <input
              type="text"
              {...register('title')}
              className="w-full p-2 border border-gray-300 rounded bg-gray-800 text-white"
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block">Course Description</label>
            <textarea
              {...register('description')}
              className="w-full p-2 border border-gray-300 rounded bg-gray-800 text-white"
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block">Course Price</label>
            <input
              type="number"
              {...register('price')}
              className="w-full p-2 border border-gray-300 rounded bg-gray-800 text-white"
            />
            {errors.price && <p className="text-red-500">{errors.price.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block">Topics</label>
            {topicFields.map((topic, topicIndex) => (
              <div key={topic.id} className="mb-4">
                <label className="block">Topic Title</label>
                <input
                  type="text"
                  {...register(`topics.${topicIndex}.title`)}
                  className="w-full p-2 border border-gray-300 rounded bg-gray-800 text-white"
                />
                {errors.topics?.[topicIndex]?.title && <p className="text-red-500">{errors.topics[topicIndex].title.message}</p>}
                <label className="block">Modules</label>
                {moduleFields.map((module, moduleIndex) => (
                  <div key={module.id} className="mb-4">
                    <label className="block">Module Title</label>
                    <input
                      type="text"
                      {...register(`topics.${topicIndex}.modules.${moduleIndex}.title`)}
                      className="w-full p-2 border border-gray-300 rounded bg-gray-800 text-white"
                    />
                    {errors.topics?.[topicIndex]?.modules?.[moduleIndex]?.title && <p className="text-red-500">{errors.topics[topicIndex].modules[moduleIndex].title.message}</p>}
                    <label className="block">Module Content</label>
                    <textarea
                      {...register(`topics.${topicIndex}.modules.${moduleIndex}.content`)}
                      className="w-full p-2 border border-gray-300 rounded bg-gray-800 text-white"
                    />
                    {errors.topics?.[topicIndex]?.modules?.[moduleIndex]?.content && <p className="text-red-500">{errors.topics[topicIndex].modules[moduleIndex].content.message}</p>}
                    <button type="button" onClick={() => removeModule(moduleIndex)} className="bg-red-500 text-white p-2 rounded mt-2">Remove Module</button>
                  </div>
                ))}
                <button type="button" onClick={() => appendModule({ title: '', content: '' })} className="bg-blue-500 text-white p-2 rounded">Add Module</button>
                <button type="button" onClick={() => removeTopic(topicIndex)} className="bg-red-500 text-white p-2 rounded mt-2">Remove Topic</button>
              </div>
            ))}
            <button type="button" onClick={() => appendTopic({ title: '', modules: [{ title: '', content: '' }] })} className="bg-blue-500 text-white p-2 rounded">Add Topic</button>
          </div>
          <button type="submit" className="bg-green-500 text-white p-2 rounded">Create Course</button>
        </form>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandling error={error} />}
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
        <h2 className="text-xl font-bold mb-4">Course Creation</h2>
        <CourseCreator />
      </div>
    </ProtectedRoute>
  );
};

export default AdminPortal;
