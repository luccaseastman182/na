import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { create } from 'zustand';

const eligibilitySchema = z.object({
  isEligible: z.boolean(),
});

const useEligibilityStore = create((set) => ({
  isEligible: false,
  error: null,
  checkEligibility: async (courseId) => {
    try {
      const response = await axios.get(`/api/courses/${courseId}/eligibility`);
      const parsedResponse = eligibilitySchema.parse(response.data);
      set({ isEligible: parsedResponse.isEligible });
    } catch (error) {
      set({ error: 'Error checking eligibility' });
    }
  },
}));

const TakeExamButton = ({ courseId }) => {
  const { isEligible, error, checkEligibility } = useEligibilityStore();
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
      {error && <p className="text-red-500">{error}</p>}
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
