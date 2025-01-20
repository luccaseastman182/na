import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCourseStore } from './AdminPortal';

const eligibilitySchema = z.object({
  isEligible: z.boolean(),
});

const TakeExamButton = ({ courseId }) => {
  const { isEligible, error, loading, checkEligibility } = useCourseStore();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(eligibilitySchema),
  });

  useEffect(() => {
    checkEligibility(courseId);
  }, [courseId, checkEligibility]);

  const handleTakeExam = () => {
    if (isEligible) {
      window.location.href = `/courses/${courseId}/exam`;
    }
  };

  return (
    <div>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline">{error}</span>
      </div>}
      {loading && <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
      </div>}
      <button
        className={`px-4 py-2 rounded ${isEligible ? 'bg-blue-500 text-white' : 'bg-gray-400'}`}
        onClick={handleTakeExam}
        disabled={!isEligible}
      >
        {isEligible ? 'Take Exam' : 'Complete All Modules to Take Exam'}
      </button>
    </div>
  );
};

export default TakeExamButton;
