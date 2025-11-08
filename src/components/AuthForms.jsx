import React, { useState } from 'react';

export default function AuthForms({ mode = 'login', onSubmit, switchMode }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="max-w-md w-full bg-white/80 backdrop-blur rounded-xl shadow p-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">
        {mode === 'login' ? 'Welcome back' : 'Create an account'}
      </h2>
      <form onSubmit={submit} className="space-y-4">
        {mode === 'register' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
              required
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
        >
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </button>
      </form>
      <p className="text-sm text-gray-600 mt-4 text-center">
        {mode === 'login' ? 'New here?' : 'Already have an account?'}{' '}
        <button onClick={switchMode} className="text-blue-600 hover:underline">
          {mode === 'login' ? 'Create one' : 'Sign in'}
        </button>
      </p>
    </div>
  );
}
