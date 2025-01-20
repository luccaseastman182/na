import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentPortal = ({ studentId }) => {
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`/api/students/${studentId}/courses`);
        setCourses(response.data);
      } catch (error) {
        setError('Error fetching courses');
      }
    };

    const fetchProgress = async () => {
      try {
        const response = await axios.get(`/api/students/${studentId}/progress`);
        setProgress(response.data);
      } catch (error) {
        setError('Error fetching progress');
      }
    };

    fetchCourses();
    fetchProgress();
  }, [studentId]);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Student Portal</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">My Courses</h3>
        <ul className="list-disc list-inside">
          {courses.map((course) => (
            <li key={course.id} className="mb-2">
              {course.title}
              <div className="mt-2">
                <p>Progress: {progress[course.id] || 0}%</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentPortal;
