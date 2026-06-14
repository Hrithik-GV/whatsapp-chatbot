import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const adminData = JSON.parse(localStorage.getItem('adminData') || '{}');
  const adminName = adminData.name || 'Admin';

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col shadow-xl md:min-h-screen">
        <div className="p-6 text-center border-b border-slate-800">
          <h2 className="text-2xl font-bold text-blue-400">Admin Portal</h2>
          <p className="text-sm text-slate-400 mt-1">Welcome, {adminName}</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            to="/admin/dashboard" 
            className={`block px-4 py-3 rounded-lg transition-colors ${location.pathname === '/admin/dashboard' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            Dashboard Home
          </Link>
          <Link 
            to="/admin/faqs" 
            className={`block px-4 py-3 rounded-lg transition-colors ${location.pathname === '/admin/faqs' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            FAQ Management
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
