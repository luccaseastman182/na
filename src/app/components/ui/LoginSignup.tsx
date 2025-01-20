import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { authjs } from 'authjs';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    if (isLogin) {
      // Handle login logic
      try {
        const response = await authjs.login(data);
        alert('Login successful');
      } catch (error) {
        console.error('Error logging in:', error);
        alert('Failed to login');
      }
    } else {
      // Handle signup logic
      try {
        const response = await authjs.signup(data);
        alert('Signup successful');
      } catch (error) {
        console.error('Error signing up:', error);
        alert('Failed to signup');
      }
    }
  };

  const handleAccountUpdate = async (data) => {
    try {
      const response = await authjs.updateAccount(data);
      alert('Account updated successfully');
    } catch (error) {
      console.error('Error updating account:', error);
      alert('Failed to update account');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-white">{isLogin ? 'Login' : 'Signup'}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full p-2 border border-gray-600 rounded mt-1 bg-gray-700 text-white"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              {...register('password')}
              className="w-full p-2 border border-gray-600 rounded mt-1 bg-gray-700 text-white"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mt-4"
          >
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-300">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 underline"
          >
            {isLogin ? 'Signup' : 'Login'}
          </button>
        </p>
        <p className="mt-4 text-center text-gray-300">
          <button
            onClick={() => handleAccountUpdate({ email: 'newemail@example.com', password: 'newpassword' })}
            className="text-blue-500 underline"
          >
            Update Account
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
