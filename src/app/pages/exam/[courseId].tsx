import React from 'react';
import Exam from '../../components/ui/Exam';
import ProtectedRoute from '../../components/ui/ProtectedRoute';

const ExamPage = ({ courseId }) => {
  return (
    <ProtectedRoute>
      <Exam courseId={courseId} />
    </ProtectedRoute>
  );
};

export default ExamPage;
