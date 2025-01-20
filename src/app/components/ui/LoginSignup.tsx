import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { authjs } from 'authjs';
import { create } from 'zustand';

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
      alert('Login successful');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Failed to login');
    }
  },
  signup: async (data) => {
    try {
      const response = await authjs.signup(data);
      set({ user: response.data });
      alert('Signup successful');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Failed to signup');
    }
  },
  updateAccount: async (data) => {
    try {
      const response = await authjs.updateAccount(data);
      set({ user: response.data });
      alert('Account updated successfully');
    } catch (error) {
      console.error('Error updating account:', error);
      alert('Failed to update account');
    }
  },
}));

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const { login, signup, updateAccount } = useAuthStore();

  const onSubmit = async (data) => {
    if (isLogin) {
      await login(data);
    } else {
      await signup(data);
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
            onClick={() => updateAccount({ email: 'newemail@example.com', password: 'newpassword' })}
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
