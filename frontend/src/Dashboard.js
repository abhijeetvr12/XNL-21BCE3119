import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [healthStatus, setHealthStatus] = useState('Checking...');

  useEffect(() => {
    fetch('/health')
      .then(response => response.json())
      .then(data => setHealthStatus(data.status))
      .catch(() => setHealthStatus('Error'));
  }, []);

  const chartData = {
    labels: ['9:00', '9:15', '9:30', '9:45', '10:00'], // Simulated time
    datasets: [
      {
        label: 'Requests per Minute',
        data: [5, 10, 8, 15, 12], // Simulated data
        fill: false,
        borderColor: '#36A2EB',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: { beginAtZero: true },
    },
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Request Trends' },
    },
  };

  return (
    <div className="card">
      <h2>System Health</h2>
      <p>Status: <span style={{ color: healthStatus === 'ok' ? 'green' : 'red' }}>{healthStatus}</span></p>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;