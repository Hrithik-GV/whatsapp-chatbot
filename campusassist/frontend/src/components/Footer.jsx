import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from '../Icons';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <h3 className="text-white text-xl font-bold mb-4">CampusAssist AI</h3>
            <p className="text-slate-400 mb-6 max-w-sm">
              Empowering students with instant support and guidance. 24/7 access to all college resources and information.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Admissions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Courses</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Student Portal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Library</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-primary-500 flex-shrink-0" />
                <span>123 College Avenue, Tech District</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary-500 flex-shrink-0" />
                <span>+91 99999 99999</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary-500 flex-shrink-0" />
                <span>info@college.edu</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; 2026 CampusAssist AI. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
