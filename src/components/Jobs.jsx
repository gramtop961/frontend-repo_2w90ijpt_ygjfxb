import React, { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Jobs({ token }) {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', lastDate: '', company: '' });
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API}/api/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (token) fetchJobs();
  }, [token]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm({ title: '', description: '', lastDate: '', company: '' });
        await fetchJobs();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Post a Job</h3>
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700">Job Title</label>
            <input name="title" value={form.title} onChange={handleChange} className="mt-1 w-full border rounded-md px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Company Name</label>
            <input name="company" value={form.company} onChange={handleChange} className="mt-1 w-full border rounded-md px-3 py-2" required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-700">Job Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="mt-1 w-full border rounded-md px-3 py-2" rows={3} required />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Last Date for Application</label>
            <input type="date" name="lastDate" value={form.lastDate} onChange={handleChange} className="mt-1 w-full border rounded-md px-3 py-2" required />
          </div>
          <div className="md:col-span-2">
            <button disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
              {loading ? 'Posting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Job Posted</h3>
        <ul className="divide-y">
          {jobs.map((job) => (
            <li key={job._id} className="py-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{job.title} • <span className="text-sm text-gray-500">{job.company}</span></h4>
                  <p className="text-gray-700 text-sm mt-1">{job.description}</p>
                </div>
                <span className="text-xs text-gray-500">Apply by {new Date(job.lastDate).toLocaleDateString()}</span>
              </div>
            </li>
          ))}
          {jobs.length === 0 && (
            <li className="text-sm text-gray-500">No jobs yet. Post one above.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
