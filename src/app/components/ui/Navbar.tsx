import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link href="/">NSBS</Link>
        </div>
        <div className="space-x-4">
          <Link href="/courses" className="text-gray-300 hover:text-white">Courses</Link>
          <Link href="/login" className="text-gray-300 hover:text-white">Login</Link>
          <Link href="/signup" className="text-gray-300 hover:text-white">Signup</Link>
          <Link href="/courselist" className="text-gray-300 hover:text-white">Course List</Link>
          <Link href="/course/[id]" className="text-gray-300 hover:text-white">Course Details</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
