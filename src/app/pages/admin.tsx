import React from 'react';
import AdminPortal from '../components/ui/AdminPortal';
import ProtectedRoute from '../components/ui/ProtectedRoute';

const AdminPage = () => {
  return (
    <ProtectedRoute roles={['admin']}>
      <AdminPortal />
    </ProtectedRoute>
  );
};

export default AdminPage;
