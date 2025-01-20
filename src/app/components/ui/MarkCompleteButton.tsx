import React, { useState } from 'react';
import axios from 'axios';

const MarkCompleteButton = ({ moduleId, onComplete }) => {
  const [isComplete, setIsComplete] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleMarkComplete = async () => {
    try {
      await axios.post(`/api/modules/${moduleId}/complete`);
      setIsComplete(true);
      onComplete();
    } catch (error) {
      console.error('Error marking module complete:', error);
    }
  };

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleConfirm = () => {
    handleMarkComplete();
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <button
        className={`px-4 py-2 rounded ${isComplete ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
        onClick={handleButtonClick}
        disabled={isComplete}
      >
        {isComplete ? 'Module Complete' : 'Mark Complete'}
      </button>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md">
            <p>Are you sure you want to mark this module as complete?</p>
            <div className="mt-4 flex justify-end">
              <button className="px-4 py-2 bg-gray-300 rounded mr-2" onClick={handleCancel}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkCompleteButton;
