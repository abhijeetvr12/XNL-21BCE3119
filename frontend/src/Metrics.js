import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Metrics = () => {
  const [metrics, setMetrics] = useState({ request_count: 0, uptime_seconds: 0, active_users: 0 });

  useEffect(() => {
    const fetchMetrics = () => {
      fetch('/metrics')
        .then(response => response.json())
        .then(data => setMetrics(data))
        .catch(() => setMetrics({ request_count: 0, uptime_seconds: 0, active_users: 0 }));
    };
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: ['Requests', 'Uptime (s)', 'Active Users'],
    datasets: [
      {
        label: 'System Metrics',
        data: [metrics.request_count, metrics.uptime_seconds, metrics.active_users],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  };

  const options = {
    scales: {
      y: { beginAtZero: true },
    },
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'System Metrics' },
    },
  };

  return (
    <div className="card">
      <h2>System Metrics</h2>
      <p>Requests: {metrics.request_count} | Uptime: {Math.round(metrics.uptime_seconds)}s | Users: {metrics.active_users}</p>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Metrics;