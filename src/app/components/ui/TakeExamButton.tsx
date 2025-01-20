import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TakeExamButton = ({ courseId }) => {
  const [isEligible, setIsEligible] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkEligibility = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}/eligibility`);
        setIsEligible(response.data.isEligible);
      } catch (error) {
        setError('Error checking eligibility');
      }
    };

    checkEligibility();
  }, [courseId]);

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
