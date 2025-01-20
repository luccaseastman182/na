import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const ProtectedRoute = ({ children, roles }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/login');
    } else if (roles && !roles.includes(session.user.role)) {
      router.push('/unauthorized');
    }
  }, [session, status, router, roles]);

  if (status === 'loading' || !session) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
