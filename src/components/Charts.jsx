import React from 'react';

const growthData = [
  { month: 'Jan', users: 200 },
  { month: 'Feb', users: 260 },
  { month: 'Mar', users: 320 },
  { month: 'Apr', users: 420 },
  { month: 'May', users: 560 },
  { month: 'Jun', users: 740 },
];

const applicationsData = [
  { job: 'Frontend', apps: 34 },
  { job: 'Backend', apps: 21 },
  { job: 'DevOps', apps: 18 },
  { job: 'Designer', apps: 27 },
];

function LineSpark({ data, max }) {
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (d.users / max) * 100;
    return `${x},${y}`;
  });
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-48">
      <polyline
        fill="none"
        stroke="#2563eb"
        strokeWidth="2"
        points={points.join(' ')}
      />
    </svg>
  );
}

function Bars({ data, max }) {
  return (
    <div className="flex items-end gap-4 h-48 w-full">
      {data.map((d) => (
        <div key={d.job} className="flex-1">
          <div
            className="bg-green-600 rounded-t-md transition-all"
            style={{ height: `${(d.apps / max) * 100}%` }}
            title={`${d.job}: ${d.apps}`}
          />
          <div className="text-xs text-gray-600 text-center mt-2">{d.job}</div>
        </div>
      ))}
    </div>
  );
}

export default function Charts() {
  const maxUsers = Math.max(...growthData.map((d) => d.users));
  const maxApps = Math.max(...applicationsData.map((d) => d.apps));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Customer Growth</h3>
        <p className="text-sm text-gray-600 mb-4">Last 6 months</p>
        <LineSpark data={growthData} max={maxUsers} />
        <div className="mt-2 flex justify-between text-xs text-gray-500">
          {growthData.map((d) => (
            <span key={d.month}>{d.month}</span>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Applications per Job</h3>
        <p className="text-sm text-gray-600 mb-4">Dummy data</p>
        <Bars data={applicationsData} max={maxApps} />
      </div>
    </div>
  );
}
