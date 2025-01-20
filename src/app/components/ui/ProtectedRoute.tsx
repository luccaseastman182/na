import React from 'react';
import { authjs } from 'authjs';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children, roles, redirectPath = '/unauthorized' }) => {
  const { data: session, status } = authjs();
  const router = useRouter();

  React.useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/login');
    } else if (roles && !roles.includes(session.user.role)) {
      router.push(redirectPath);
    }
  }, [session, status, router, roles, redirectPath]);

  if (status === 'loading' || !session) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
