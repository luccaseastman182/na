import React from 'react';
import Link from 'next/link';
import { authjs } from 'authjs';

const Navbar = () => {
  const { data: session, status } = authjs();

  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link href="/">NSBS</Link>
        </div>
        <div className="space-x-4">
          <Link href="/courses" className="text-gray-300 hover:text-white">Courses</Link>
          {status === 'authenticated' ? (
            <>
              {session.user.role === 'admin' && (
                <Link href="/admin" className="text-gray-300 hover:text-white">Admin Portal</Link>
              )}
              <Link href="/student-portal" className="text-gray-300 hover:text-white">Student Portal</Link>
              <Link href="/logout" className="text-gray-300 hover:text-white">Logout</Link>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-300 hover:text-white">Login</Link>
              <Link href="/signup" className="text-gray-300 hover:text-white">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
