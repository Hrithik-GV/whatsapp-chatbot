import React from 'react';
import { MessageCircle, GraduationCap, BookOpen, Smartphone } from '../Icons';

const features = [
  {
    icon: <MessageCircle className="w-6 h-6 text-primary-600" />,
    title: 'Instant FAQ Answers',
    description: 'Get immediate responses to common questions about our college, 24/7.'
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-primary-600" />,
    title: 'Admission Help',
    description: 'Step-by-step guidance through the admission process and requirements.'
  },
  {
    icon: <BookOpen className="w-6 h-6 text-primary-600" />,
    title: 'Course Guidance',
    description: 'Detailed information about syllabus, departments, and academic schedules.'
  },
  {
    icon: <Smartphone className="w-6 h-6 text-primary-600" />,
    title: 'WhatsApp Support',
    description: 'Chat with our virtual assistant directly from your WhatsApp.'
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Everything you need to know</h2>
          <p className="mt-4 text-lg text-slate-600">Quick and easy access to all college information.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-shadow border border-slate-100 group">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
