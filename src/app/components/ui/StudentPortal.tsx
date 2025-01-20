import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentPortal = ({ studentId }) => {
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState({});
  const [certificates, setCertificates] = useState([]);
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

    const fetchCertificates = async () => {
      try {
        const response = await axios.get(`/api/students/${studentId}/certificates`);
        setCertificates(response.data);
      } catch (error) {
        setError('Error fetching certificates');
      }
    };

    fetchCourses();
    fetchProgress();
    fetchCertificates();
  }, [studentId]);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Student Portal</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
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
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">My Certificates</h3>
        <ul className="list-disc list-inside">
          {certificates.map((certificate) => (
            <li key={certificate.id} className="mb-2">
              {certificate.title}
              <div className="mt-2">
                <a href={certificate.url} className="text-blue-500 hover:underline">Download Certificate</a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentPortal;
