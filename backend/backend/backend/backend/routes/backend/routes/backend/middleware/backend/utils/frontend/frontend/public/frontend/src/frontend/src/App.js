import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminPanel from './pages/AdminPanel';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-dark bg-primary">
          <div className="container">
            <a className="navbar-brand" href="/">Ntwananu Savings</a>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
