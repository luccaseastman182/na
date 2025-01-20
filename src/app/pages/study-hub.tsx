import React from 'react';
import StudyHub from '../components/ui/StudyHub';
import ProtectedRoute from '../components/ui/ProtectedRoute';

const StudyHubPage = () => {
  return (
    <ProtectedRoute roles={['student']}>
      <StudyHub />
    </ProtectedRoute>
  );
};

export default StudyHubPage;
