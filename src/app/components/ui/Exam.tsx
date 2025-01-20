import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Exam = ({ courseId }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [error, setError] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [examDate, setExamDate] = useState(null);
  const [isEligible, setIsEligible] = useState(false);

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

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`/api/courses/${courseId}/exam`);
      setQuestions(response.data);
      setExamDate(new Date().toISOString());
    } catch (error) {
      setError('Error fetching exam questions');
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/api/courses/${courseId}/exam/submit`, { answers });
      setScore(response.data.score);
      setAttempts(attempts + 1);
    } catch (error) {
      setError('Error submitting exam');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Final Exam</h2>
      {error && <p className="text-red-500">{error}</p>}
      {score !== null ? (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-lg">Your score: {score}</p>
          <p className="text-lg">{score >= 80 ? 'Pass' : 'Fail'}</p>
          <p className="text-lg">Attempts: {attempts}</p>
          <p className="text-lg">Exam Date: {examDate}</p>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <button onClick={fetchQuestions} className="bg-blue-500 text-white px-4 py-2 rounded mb-4" disabled={!isEligible}>
            {isEligible ? 'Start Exam' : 'Complete All Modules to Take Exam'}
          </button>
          {questions.length > 0 && (
            <form onSubmit={handleSubmit}>
              {questions.map((question) => (
                <div key={question.id} className="mb-4">
                  <p className="text-lg">{question.text}</p>
                  {question.options.map((option) => (
                    <label key={option} className="block">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        onChange={() => handleAnswerChange(question.id, option)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
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
  );
};

export default Exam;
