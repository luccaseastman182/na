import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProtectedRoute from './ProtectedRoute';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { create } from 'zustand';
import LoadingSpinner from './LoadingSpinner';
import ErrorHandling from './ErrorHandling';

const answerSchema = z.object({
  answers: z.record(z.string().min(1, 'Answer is required')),
});

const useExamStore = create((set) => ({
  questions: [],
  answers: {},
  score: null,
  error: null,
  attempts: 0,
  examDate: null,
  isEligible: false,
  loading: false,
  fetchQuestions: async (courseId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`/api/courses/${courseId}/exam`);
      set({ questions: response.data, examDate: new Date().toISOString() });
    } catch (error) {
      set({ error: 'Error fetching exam questions' });
    } finally {
      set({ loading: false });
    }
  },
  checkEligibility: async (courseId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`/api/courses/${courseId}/eligibility`);
      set({ isEligible: response.data.isEligible });
    } catch (error) {
      set({ error: 'Error checking eligibility' });
    } finally {
      set({ loading: false });
    }
  },
  submitExam: async (courseId, answers) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`/api/courses/${courseId}/exam/submit`, { answers });
      set((state) => ({ score: response.data.score, attempts: state.attempts + 1 }));
    } catch (error) {
      set({ error: 'Error submitting exam' });
    } finally {
      set({ loading: false });
    }
  },
  setAnswer: (questionId, answer) => set((state) => ({
    answers: {
      ...state.answers,
      [questionId]: answer,
    },
  })),
}));

const Exam = ({ courseId }) => {
  const { questions, answers, score, error, attempts, examDate, isEligible, loading, fetchQuestions, checkEligibility, submitExam, setAnswer } = useExamStore();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(answerSchema),
  });

  useEffect(() => {
    checkEligibility(courseId);
  }, [courseId, checkEligibility]);

  const onSubmit = (data) => {
    submitExam(courseId, data.answers);
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 bg-gray-900 text-white">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Final Exam</h2>
        {error && <ErrorHandling error={error} />}
        {loading && <LoadingSpinner />}
        {score !== null ? (
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <p className="text-lg text-gray-300">Your score: {score}</p>
            <p className="text-lg text-gray-300">{score >= 80 ? 'Pass' : 'Fail'}</p>
            <p className="text-lg text-gray-300">Attempts: {attempts}</p>
            <p className="text-lg text-gray-300">Exam Date: {examDate}</p>
          </div>
        ) : (
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <button onClick={() => fetchQuestions(courseId)} className="bg-blue-500 text-white px-4 py-2 rounded mb-4" disabled={!isEligible}>
              {isEligible ? 'Start Exam' : 'Complete All Modules to Take Exam'}
            </button>
            {questions.length > 0 && (
              <form onSubmit={handleSubmit(onSubmit)}>
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
