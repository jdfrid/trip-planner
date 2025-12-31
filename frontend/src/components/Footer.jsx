import { Link } from 'react-router-dom'
import { Plane, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-900 to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-white transform -rotate-45" />
                </div>
              </div>
              <span className="text-xl font-bold">
                <span className="gradient-text">Trip</span>
                <span className="text-white">Craft</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              תכנון חופשות חכם ומותאם אישית. צרו את החופשה המושלמת שלכם בקלות ובמהירות.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 glass-light rounded-lg flex items-center justify-center text-gray-400 hover:text-primary-400 hover:bg-primary-500/10 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 glass-light rounded-lg flex items-center justify-center text-gray-400 hover:text-primary-400 hover:bg-primary-500/10 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 glass-light rounded-lg flex items-center justify-center text-gray-400 hover:text-primary-400 hover:bg-primary-500/10 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">קישורים מהירים</h4>
            <ul className="space-y-3">
              {[
                { label: 'דף הבית', path: '/' },
                { label: 'חבילות נסיעה', path: '/packages' },
                { label: 'תכנון מותאם', path: '/planner' },
                { label: 'אודותינו', path: '/about' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-400 hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">יעדים פופולריים</h4>
            <ul className="space-y-3">
              {['אוסטריה', 'איטליה', 'צרפת', 'יוון', 'ספרד'].map((dest) => (
                <li key={dest}>
                  <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                    {dest}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">צור קשר</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400">
                <div className="w-10 h-10 glass-light rounded-lg flex items-center justify-center text-primary-400">
                  <Mail className="w-4 h-4" />
                </div>
                <span>info@tripcraft.co.il</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <div className="w-10 h-10 glass-light rounded-lg flex items-center justify-center text-primary-400">
                  <Phone className="w-4 h-4" />
                </div>
                <span dir="ltr">03-1234567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <div className="w-10 h-10 glass-light rounded-lg flex items-center justify-center text-primary-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>תל אביב, ישראל</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 TripCraft. כל הזכויות שמורות.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-primary-400 transition-colors">
              תנאי שימוש
            </a>
            <a href="#" className="text-gray-500 hover:text-primary-400 transition-colors">
              מדיניות פרטיות
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

