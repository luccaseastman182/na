import React from 'react';
import StudentPortal from '../components/ui/StudentPortal';
import ProtectedRoute from '../components/ui/ProtectedRoute';

const StudentPortalPage = () => {
  return (
    <ProtectedRoute>
      <StudentPortal />
    </ProtectedRoute>
  );
};

export default StudentPortalPage;
