import React from 'react';
import CourseDetails from '../../components/ui/CourseDetails';
import ProtectedRoute from '../../components/ui/ProtectedRoute';

const CourseDetailsPage = () => {
  return (
    <ProtectedRoute>
      <CourseDetails />
    </ProtectedRoute>
  );
};

export default CourseDetailsPage;
