import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const { login: authLogin } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const { signup } = await import('../services/api');
      const resp = await signup(formData);
      if (resp.token) {
        try {
          authLogin(resp.token, resp.user);
        } catch (e) {
          localStorage.setItem('token', resp.token);
          if (resp.user) localStorage.setItem('user', JSON.stringify(resp.user));
        }
      }
      navigate('/');
    } catch (err: any) {
      console.error('Signup error', err);
      setError(err.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">Sign up to start ordering from FlavorCraft</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
              <input name="name" required value={formData.name} onChange={handleChange} className="w-full rounded-lg p-3 border border-gray-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full rounded-lg p-3 border border-gray-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input name="password" type="password" required value={formData.password} onChange={handleChange} className="w-full rounded-lg p-3 border border-gray-200" />
            </div>
          </div>

          <div>
            <button type="submit" className="w-full py-3 px-4 rounded-lg bg-brand-orange text-white font-bold">Sign up</button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">Already have an account? <Link to="/login" className="text-brand-orange font-medium">Sign in</Link></p>
        </div>

        {error && <div className="text-red-600 text-center">{error}</div>}
      </div>
    </div>
  );
};
