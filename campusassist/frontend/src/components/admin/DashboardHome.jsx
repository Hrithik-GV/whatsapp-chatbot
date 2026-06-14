import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardHome = () => {
  const [stats, setStats] = useState({ total: 0, admissions: 0, hostel: 0, placement: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        
        const response = await axios.get(`${API_URL}/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setStats(response.data);
      } catch (err) {
        setError('Failed to fetch dashboard statistics.');
        if (err.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('adminToken');
          window.location.href = '/admin/login';
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  if (error) return <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total FAQs" value={stats.total} color="bg-blue-500" />
        <StatCard title="Admissions FAQs" value={stats.admissions} color="bg-green-500" />
        <StatCard title="Hostel FAQs" value={stats.hostel} color="bg-purple-500" />
        <StatCard title="Placement FAQs" value={stats.placement} color="bg-orange-500" />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
    <div className={`h-2 w-full ${color}`}></div>
    <div className="p-6">
      <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</h3>
      <p className="text-4xl font-bold text-slate-800 mt-2">{value}</p>
    </div>
  </div>
);

export default DashboardHome;
