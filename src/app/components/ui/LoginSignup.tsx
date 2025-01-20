import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { authjs } from 'authjs';
import { create } from 'zustand';
import Notification from './Notification';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const useAuthStore = create((set) => ({
  user: null,
  login: async (data) => {
    try {
      const response = await authjs.login(data);
      set({ user: response.data });
      setNotification({ message: 'Login successful', type: 'success' });
    } catch (error) {
      console.error('Error logging in:', error);
      set({ error });
      setNotification({ message: 'Failed to login', type: 'error' });
    }
  },
  signup: async (data) => {
    try {
      const response = await authjs.signup(data);
      set({ user: response.data });
      setNotification({ message: 'Signup successful', type: 'success' });
    } catch (error) {
      console.error('Error signing up:', error);
      set({ error });
      setNotification({ message: 'Failed to signup', type: 'error' });
    }
  },
}));

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const { login, signup } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        await login(data);
      } else {
        await signup(data);
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      setError(error);
    } finally {
      setLoading(false);
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
        <Notification message={notification.message} type={notification.type} />
      </div>
    </div>
  );
};

export default LoginSignup;
