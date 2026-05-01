import React from 'react';
import { Users, Star, Award, MessageCircle } from '../Icons';

export default function StatsAndTestimonials() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <Users className="w-8 h-8 text-primary-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-slate-900 mb-1">10,000+</div>
            <div className="text-sm font-medium text-slate-500">Students Supported</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <MessageCircle className="w-8 h-8 text-primary-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-slate-900 mb-1">50k+</div>
            <div className="text-sm font-medium text-slate-500">Queries Answered</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <Star className="w-8 h-8 text-primary-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-slate-900 mb-1">4.9/5</div>
            <div className="text-sm font-medium text-slate-500">Average Rating</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <Award className="w-8 h-8 text-primary-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-slate-900 mb-1">24/7</div>
            <div className="text-sm font-medium text-slate-500">Availability</div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">What Our Students Say</h2>
          <p className="text-slate-600">Real experiences from our campus community.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Rahul S.",
              role: "Computer Science, 2nd Year",
              content: "The CampusAssist AI saved me so much time during admission. I didn't have to wait in queues for basic info.",
              rating: 5
            },
            {
              name: "Priya M.",
              role: "Business Admin, 1st Year",
              content: "Very useful support system! The WhatsApp integration is brilliant. I get answers instantly on my phone.",
              rating: 5
            },
            {
              name: "Amit K.",
              role: "Mechanical Engg, 3rd Year",
              content: "Helped me a lot with placement queries and finding the exact syllabus for my exams. Great initiative!",
              rating: 4
            }
          ].map((testimonial, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative">
              <div className="flex gap-1 mb-4 text-yellow-400">
                {[...Array(testimonial.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
              </div>
              <p className="text-slate-700 mb-6 italic">"{testimonial.content}"</p>
              <div>
                <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                <p className="text-sm text-slate-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
