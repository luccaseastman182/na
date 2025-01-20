import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExamVoucher = ({ studentId, courseId }) => {
  const [vouchers, setVouchers] = useState(2);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axios.get(`/api/students/${studentId}/courses/${courseId}/vouchers`);
        setVouchers(response.data.vouchers);
      } catch (error) {
        setError('Error fetching exam vouchers');
      }
    };

    fetchVouchers();
  }, [studentId, courseId]);

  const handlePurchaseVoucher = async () => {
    try {
      const response = await axios.post(`/api/students/${studentId}/courses/${courseId}/vouchers/purchase`);
      setVouchers(response.data.vouchers);
    } catch (error) {
      setError('Error purchasing exam voucher');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Exam Vouchers</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p className="text-lg">You have {vouchers} exam vouchers remaining.</p>
        <button
          onClick={handlePurchaseVoucher}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Purchase Additional Voucher ($149)
        </button>
      </div>
    </div>
  );
};

export default ExamVoucher;
