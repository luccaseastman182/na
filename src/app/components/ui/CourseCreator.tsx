import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
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

const CourseCreator = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(courseSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'modules',
  });

  const onSubmit = async (data) => {
    try {
      await axios.post('/api/courses', data);
      alert('Course created successfully');
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Failed to create course');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Course</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          {fields.map((field, index) => (
            <div key={field.id} className="mb-4">
              <label className="block text-gray-700">Module Title</label>
              <input
                type="text"
                {...register(`modules.${index}.title`)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.modules?.[index]?.title && <p className="text-red-500">{errors.modules[index].title.message}</p>}
              <label className="block text-gray-700">Module Content</label>
              <textarea
                {...register(`modules.${index}.content`)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.modules?.[index]?.content && <p className="text-red-500">{errors.modules[index].content.message}</p>}
              <button type="button" onClick={() => remove(index)} className="bg-red-500 text-white p-2 rounded mt-2">Remove Module</button>
            </div>
          ))}
          <button type="button" onClick={() => append({ title: '', content: '' })} className="bg-blue-500 text-white p-2 rounded">Add Module</button>
        </div>
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Create Course</button>
      </form>
    </div>
  );
};

export default CourseCreator;
