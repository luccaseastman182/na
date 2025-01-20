import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProtectedRoute from './ProtectedRoute';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 bg-gray-900 text-white">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Available Courses</h2>
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
    </ProtectedRoute>
  );
};

export default CourseList;
