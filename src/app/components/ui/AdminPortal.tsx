import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

const courseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(1, 'Price is required'),
  modules: z.array(z.object({
    title: z.string().min(1, 'Module title is required'),
    content: z.string().min(1, 'Module content is required'),
  })).min(1, 'At least one module is required'),
});

const AdminPortal = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(courseSchema),
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axios.get('/api/courses');
      setCourses(response.data);
    };

    fetchCourses();
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.post('/api/courses', data);
      alert('Course created successfully');
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Failed to create course');
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session?.user.role !== 'admin') {
    return <div>Access denied</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Portal</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        <div className="mb-4">
          <label className="block text-gray-700">Course Title</label>
          <input
            type="text"
            {...register('title')}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Course Description</label>
          <textarea
            {...register('description')}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Course Price</label>
          <input
            type="number"
            {...register('price')}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Modules</label>
          <div>
            {errors.modules && <p className="text-red-500">{errors.modules.message}</p>}
            <div className="mb-2">
              <label className="block text-gray-700">Module Title</label>
              <input
                type="text"
                {...register('modules.0.title')}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.modules?.[0]?.title && <p className="text-red-500">{errors.modules[0].title.message}</p>}
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Module Content</label>
              <textarea
                {...register('modules.0.content')}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.modules?.[0]?.content && <p className="text-red-500">{errors.modules[0].content.message}</p>}
            </div>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create Course</button>
      </form>
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
  );
};

export default AdminPortal;
