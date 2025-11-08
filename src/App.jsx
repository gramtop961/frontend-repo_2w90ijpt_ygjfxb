import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Jobs from './components/Jobs';
import Charts from './components/Charts';
import Profile from './components/Profile';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function useAuth() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [mode, setMode] = useState('login');

  const login = async ({ email, password }) => {
    const res = await fetch(`${API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      return { ok: true };
    }
    return { ok: false, message: data.message || 'Login failed' };
  };

  const register = async ({ name, email, password }) => {
    const res = await fetch(`${API}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      return login({ email, password });
    }
    return { ok: false, message: data.message || 'Registration failed' };
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return { token, setMode, mode, login, register, logout };
}

function Protected({ token, children }) {
  if (!token) return <Navigate to="/auth" replace />;
  return children;
}

function Dashboard({ token, onLogout }) {
  const [tab, setTab] = useState('jobs');

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-fuchsia-50">
      <div className="flex h-screen max-h-screen">
        <Sidebar current={tab} onChange={setTab} onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {tab === 'jobs' && <Jobs token={token} />}
          {tab === 'analysis' && <Charts />}
          {tab === 'profile' && <Profile token={token} />}
        </main>
      </div>
    </div>
  );
}

function AuthScreen({ mode, setMode, onLogin, onRegister }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res =
      mode === 'login'
        ? await onLogin({ email: form.email, password: form.password })
        : await onRegister(form);
    if (!res.ok) setError(res.message || 'Something went wrong');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-fuchsia-50 flex items-center justify-center p-6">
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
                onChange={(e) => setForm({ ...form, name: e.target.value })}
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
              onChange={(e) => setForm({ ...form, email: e.target.value })}
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
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
          >
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4 text-center">
          {mode === 'login' ? 'New here?' : 'Already have an account?'}{' '}
          <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-blue-600 hover:underline">
            {mode === 'login' ? 'Create one' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const { token, mode, setMode, login, register, logout } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            token ? (
              <Navigate to="/" replace />
            ) : (
              <AuthScreen mode={mode} setMode={setMode} onLogin={login} onRegister={register} />
            )
          }
        />
        <Route
          path="/"
          element={
            <Protected token={token}>
              <Dashboard token={token} onLogout={logout} />
            </Protected>
          }
        />
        <Route path="*" element={<Navigate to={token ? '/' : '/auth'} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
