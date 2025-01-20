import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(0);
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

      const fetchProgress = async () => {
        try {
          const response = await axios.get(`/api/courses/${id}/progress`);
          setProgress(response.data.progress);
        } catch (error) {
          console.error('Error fetching course progress:', error);
        }
      };

      fetchCourseDetails();
      fetchProgress();
    }
  }, [id]);

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
