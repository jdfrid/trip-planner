import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Plane, Map, Package, Home } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', label: 'דף הבית', icon: Home },
    { path: '/packages', label: 'חבילות', icon: Package },
    { path: '/planner', label: 'תכנון מותאם', icon: Map },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}>
        <div className={`mx-4 md:mx-8 rounded-2xl transition-all duration-500 ${
          isScrolled ? 'glass shadow-2xl' : 'bg-transparent'
        }`}>
          <div className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-400 rounded-xl flex items-center justify-center">
                    <Plane className="w-5 h-5 text-white transform -rotate-45" />
                  </div>
                </div>
                <span className="text-xl font-bold">
                  <span className="gradient-text">Trip</span>
                  <span className="text-white">Craft</span>
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative flex items-center gap-2 py-2 text-sm font-medium transition-colors duration-300 ${
                      location.pathname === link.path
                        ? 'text-primary-400'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                    {location.pathname === link.path && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                      />
                    )}
                  </Link>
                ))}
              </div>

              {/* CTA Button */}
              <div className="hidden md:block">
                <Link to="/planner" className="btn-primary flex items-center gap-2 text-sm">
                  <Map className="w-4 h-4" />
                  התחל לתכנן
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-20 mx-4 glass rounded-2xl z-40 md:hidden"
          >
            <div className="p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                    location.pathname === link.path
                      ? 'bg-primary-500/20 text-primary-400'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10">
                <Link
                  to="/planner"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Map className="w-4 h-4" />
                  התחל לתכנן
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

