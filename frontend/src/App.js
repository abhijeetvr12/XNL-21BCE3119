import React from 'react';
import './App.css';
import Dashboard from './Dashboard';
import Metrics from './Metrics';

function App() {
  return (
    <div className="App">
      <header>
        <h1>CI/CD Dashboard</h1>
      </header>
      <main>
        <Dashboard />
        <Metrics />
      </main>
    </div>
  );
}

export default App;