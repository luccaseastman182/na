import React from 'react';
import CourseList from '../../components/ui/CourseList';
import ProtectedRoute from '../../components/ui/ProtectedRoute';

const CourseListPage = () => {
  return (
    <ProtectedRoute>
      <CourseList />
    </ProtectedRoute>
  );
};

export default CourseListPage;
