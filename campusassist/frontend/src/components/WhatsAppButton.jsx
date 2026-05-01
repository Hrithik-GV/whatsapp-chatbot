import React from 'react';
import { MessageCircle } from '../Icons';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/14155238886?text=Hi%20I%20need%20help%20regarding%20college"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-whatsapp hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group flex items-center justify-center animate-bounce"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={28} className="fill-current" />
      <span className="absolute right-full mr-4 bg-slate-900 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat on WhatsApp
      </span>
    </a>
  );
}
