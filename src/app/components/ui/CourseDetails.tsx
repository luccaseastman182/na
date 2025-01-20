import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchCourseDetails = async () => {
        try {
          const response = await axios.get(`/api/courses/${id}`);
          setCourse(response.data);
        } catch (error) {
          console.error('Error fetching course details:', error);
        }
      };

      fetchCourseDetails();
    }
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
      <p className="text-gray-700 mb-4">{course.description}</p>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">Course Modules</h3>
        <ul className="list-disc list-inside">
          {course.modules.map((module) => (
            <li key={module.id} className="mb-2">
              {module.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseDetails;
