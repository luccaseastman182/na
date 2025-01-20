import React from 'react';
import ErrorHandling from '../components/ui/ErrorHandling';

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-white">Page Not Found</h2>
        <ErrorHandling error={{ message: 'The page you are looking for does not exist.' }} />
      </div>
    </div>
  );
};

export default NotFoundPage;
