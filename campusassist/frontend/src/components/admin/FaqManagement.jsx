import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FaqManagement = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFaq, setCurrentFaq] = useState({ _id: '', question: '', answer: '', category: '' });
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const faqsPerPage = 10;

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const token = localStorage.getItem('adminToken');

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/admin/faqs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFaqs(response.data);
    } catch (err) {
      console.error("Error fetching FAQs:", err);
      if (err.response?.status === 401) {
        window.location.href = '/admin/login';
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (currentFaq._id) {
        // Update
        await axios.put(`${API_URL}/admin/faqs/${currentFaq._id}`, currentFaq, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // Create
        await axios.post(`${API_URL}/admin/faqs`, currentFaq, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setIsModalOpen(false);
      fetchFaqs();
    } catch (err) {
      alert("Failed to save FAQ.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      try {
        await axios.delete(`${API_URL}/admin/faqs/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchFaqs();
      } catch (err) {
        alert("Failed to delete FAQ.");
      }
    }
  };

  const openModal = (faq = null) => {
    if (faq) {
      setCurrentFaq(faq);
    } else {
      setCurrentFaq({ _id: '', question: '', answer: '', category: '' });
    }
    setIsModalOpen(true);
  };

  // Filter and Pagination logic
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastFaq = currentPage * faqsPerPage;
  const indexOfFirstFaq = indexOfLastFaq - faqsPerPage;
  const currentFaqs = filteredFaqs.slice(indexOfFirstFaq, indexOfLastFaq);
  const totalPages = Math.ceil(filteredFaqs.length / faqsPerPage);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">FAQ Management</h1>
        <button 
          onClick={() => openModal()} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Add New FAQ
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <input
            type="text"
            placeholder="Search by question or category..."
            className="w-full md:w-1/3 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm font-medium">
                <th className="px-6 py-4">Question</th>
                <th className="px-6 py-4">Answer</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-slate-500">Loading FAQs...</td>
                </tr>
              ) : currentFaqs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-slate-500">No FAQs found.</td>
                </tr>
              ) : (
                currentFaqs.map((faq) => (
                  <tr key={faq._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-slate-800 font-medium">{faq.question}</td>
                    <td className="px-6 py-4 text-slate-600 truncate max-w-xs">{faq.answer}</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase tracking-wider font-semibold">
                        {faq.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button 
                        onClick={() => openModal(faq)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(faq._id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="p-4 border-t border-slate-200 flex justify-between items-center">
            <span className="text-sm text-slate-500">
              Showing {indexOfFirstFaq + 1} to {Math.min(indexOfLastFaq, filteredFaqs.length)} of {filteredFaqs.length} FAQs
            </span>
            <div className="space-x-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">
                {currentFaq._id ? 'Edit FAQ' : 'Add New FAQ'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Question</label>
                <input 
                  type="text" 
                  required
                  value={currentFaq.question}
                  onChange={(e) => setCurrentFaq({...currentFaq, question: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Answer</label>
                <textarea 
                  required
                  rows="4"
                  value={currentFaq.answer}
                  onChange={(e) => setCurrentFaq({...currentFaq, answer: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <input 
                  type="text" 
                  required
                  value={currentFaq.category}
                  onChange={(e) => setCurrentFaq({...currentFaq, category: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
                >
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqManagement;
