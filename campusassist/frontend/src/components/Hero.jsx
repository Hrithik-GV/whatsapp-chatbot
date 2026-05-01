import React from 'react';
import { MessageSquare, Phone } from '../Icons';

export default function Hero({ onOpenChat }) {
  return (
    <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-50 via-white to-white"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 font-medium text-sm mb-8 animate-bounce">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600"></span>
          </span>
          AI Support Now Live
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
          24/7 College Student <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Support Assistant</span>
        </h1>
        <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Ask questions instantly through our Website Chat or WhatsApp. Get immediate answers about admissions, courses, fees, and campus life.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={onOpenChat}
            className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-1"
          >
            <MessageSquare size={20} />
            Chat Now
          </button>
          <a 
            href="https://wa.me/919999999999?text=Hi%20I%20need%20help%20regarding%20college" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-sm hover:shadow-md hover:-translate-y-1 group"
          >
            <div className="bg-whatsapp/10 p-1.5 rounded-full group-hover:bg-whatsapp/20 transition-colors">
              <Phone size={18} className="text-whatsapp fill-whatsapp" />
            </div>
            WhatsApp Support
          </a>
        </div>
      </div>
    </div>
  );
}
