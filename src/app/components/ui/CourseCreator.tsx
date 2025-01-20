import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useStore } from 'zustand';

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
  addCourse: async (data) => {
    await axios.post('/api/courses', data);
    set((state) => ({ courses: [...state.courses, data] }));
  },
}));

const CourseCreator = () => {
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

  const { addCourse } = useCourseStore();

  const onSubmit = async (data) => {
    try {
      await addCourse(data);
      alert('Course created successfully');
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Failed to create course');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Create a New Course</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-300">Course Title</label>
          <input
            type="text"
            {...register('title')}
            className="w-full p-2 border border-gray-300 rounded bg-gray-800 text-white"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Course Description</label>
          <textarea
            {...register('description')}
            className="w-full p-2 border border-gray-300 rounded bg-gray-800 text-white"
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Course Price</label>
          <input
            type="number"
            {...register('price')}
            className="w-full p-2 border border-gray-300 rounded bg-gray-800 text-white"
          />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Topics</label>
          {topicFields.map((topic, topicIndex) => (
            <div key={topic.id} className="mb-4">
              <label className="block text-gray-300">Topic Title</label>
              <input
                type="text"
                {...register(`topics.${topicIndex}.title`)}
                className="w-full p-2 border border-gray-300 rounded bg-gray-800 text-white"
              />
              {errors.topics?.[topicIndex]?.title && <p className="text-red-500">{errors.topics[topicIndex].title.message}</p>}
              <label className="block text-gray-300">Modules</label>
              {moduleFields.map((module, moduleIndex) => (
                <div key={module.id} className="mb-4">
                  <label className="block text-gray-300">Module Title</label>
                  <input
                    type="text"
                    {...register(`topics.${topicIndex}.modules.${moduleIndex}.title`)}
                    className="w-full p-2 border border-gray-300 rounded bg-gray-800 text-white"
                  />
                  {errors.topics?.[topicIndex]?.modules?.[moduleIndex]?.title && <p className="text-red-500">{errors.topics[topicIndex].modules[moduleIndex].title.message}</p>}
                  <label className="block text-gray-300">Module Content</label>
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
    </div>
  );
};

export default CourseCreator;
