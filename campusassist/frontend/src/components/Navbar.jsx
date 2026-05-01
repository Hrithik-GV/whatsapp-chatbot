import React from 'react';
import { GraduationCap, MessageSquare, Phone } from '../Icons';

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-primary-600 p-2 rounded-lg text-white">
              <GraduationCap size={24} />
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">CampusAssist AI</span>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Home</a>
            <a href="#" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Admissions</a>
            <a href="#" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Courses</a>
            <a href="#" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Contact</a>
            <a href="#" className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Support
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
