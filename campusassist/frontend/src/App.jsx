import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import StatsAndTestimonials from './components/StatsAndTestimonials';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import WhatsAppButton from './components/WhatsAppButton';
import { GraduationCap, MessageSquare } from './Icons';

// Admin Components
import Login from './components/admin/Login';
import AdminLayout from './components/admin/AdminLayout';
import DashboardHome from './components/admin/DashboardHome';
import FaqManagement from './components/admin/FaqManagement';
import ProtectedRoute from './components/admin/ProtectedRoute';

function MainApp() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white selection:bg-primary-100 selection:text-primary-900 font-sans">
      <Navbar />
      
      <main>
        <Hero onOpenChat={() => setIsChatOpen(true)} />
        <Features />
        <StatsAndTestimonials />
      </main>

      <Footer />

      {/* Floating Chat Button (when chat is closed) */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-24 right-6 z-40 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group flex items-center justify-center"
          aria-label="Open Chat Support"
        >
          <MessageSquare size={28} />
          <span className="absolute right-full mr-4 bg-slate-900 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat with CampusAssist AI
          </span>
        </button>
      )}

      {/* Chatbot Widget */}
      <Chatbot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainApp />} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" element={<Login />} />
      
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="faqs" element={<FaqManagement />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
