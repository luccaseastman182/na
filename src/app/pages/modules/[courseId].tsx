import React from 'react';
import Module from '../../components/ui/Module';
import ProtectedRoute from '../../components/ui/ProtectedRoute';

const ModulePage = ({ courseId }) => {
  return (
    <ProtectedRoute>
      <Module courseId={courseId} />
    </ProtectedRoute>
  );
};

export default ModulePage;
