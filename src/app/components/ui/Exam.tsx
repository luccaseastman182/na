import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProtectedRoute from './ProtectedRoute';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const answerSchema = z.object({
  answers: z.record(z.string().min(1, 'Answer is required')),
});

const Exam = ({ courseId }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [error, setError] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [examDate, setExamDate] = useState(null);
  const [isEligible, setIsEligible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(answerSchema),
  });

  useEffect(() => {
    const checkEligibility = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/courses/${courseId}/eligibility`);
        setIsEligible(response.data.isEligible);
      } catch (error) {
        setError('Error checking eligibility');
      } finally {
        setLoading(false);
      }
    };

    checkEligibility();
  }, [courseId]);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/courses/${courseId}/exam`);
      setQuestions(response.data);
      setExamDate(new Date().toISOString());
    } catch (error) {
      setError('Error fetching exam questions');
    } finally {
      setLoading(false);
    }
  };

  const submitExam = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`/api/courses/${courseId}/exam/submit`, { answers: data.answers });
      setScore(response.data.score);
      setAttempts((prevAttempts) => prevAttempts + 1);
    } catch (error) {
      setError('Error submitting exam');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 bg-gray-900 text-white">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Final Exam</h2>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline">{error}</span>
        </div>}
        {loading && <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
        </div>}
        {score !== null ? (
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <p className="text-lg text-gray-300">Your score: {score}</p>
            <p className="text-lg text-gray-300">{score >= 80 ? 'Pass' : 'Fail'}</p>
            <p className="text-lg text-gray-300">Attempts: {attempts}</p>
            <p className="text-lg text-gray-300">Exam Date: {examDate}</p>
          </div>
        ) : (
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <button onClick={fetchQuestions} className="bg-blue-500 text-white px-4 py-2 rounded mb-4" disabled={!isEligible}>
              {isEligible ? 'Start Exam' : 'Complete All Modules to Take Exam'}
            </button>
            {questions.length > 0 && (
              <form onSubmit={handleSubmit(submitExam)}>
                {questions.map((question) => (
                  <div key={question.id} className="mb-4">
                    <p className="text-lg text-gray-300">{question.text}</p>
                    {question.options.map((option) => (
                      <label key={option} className="block text-gray-300">
                        <input
                          type="radio"
                          name={`answers.${question.id}`}
                          value={option}
                          {...register(`answers.${question.id}`)}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ))}
                    {errors.answers?.[question.id] && <p className="text-red-500">{errors.answers[question.id].message}</p>}
                  </div>
                ))}
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                  Submit Exam
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Exam;
