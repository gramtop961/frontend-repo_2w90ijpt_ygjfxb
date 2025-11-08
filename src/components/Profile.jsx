import React, { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Profile({ token }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (e) {
        console.error(e);
      }
    };
    if (token) load();
  }, [token]);

  if (!user) return <div className="bg-white rounded-xl shadow p-6">Loading...</div>;

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Profile</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-gray-500">Name</div>
          <div className="font-medium">{user.name}</div>
        </div>
        <div>
          <div className="text-gray-500">Email</div>
          <div className="font-medium">{user.email}</div>
        </div>
        <div>
          <div className="text-gray-500">Role</div>
          <div className="font-medium">{user.role || 'Member'}</div>
        </div>
        <div>
          <div className="text-gray-500">Joined</div>
          <div className="font-medium">{new Date(user.createdAt || Date.now()).toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
}
