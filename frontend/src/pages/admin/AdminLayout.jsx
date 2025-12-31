import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Map, Plane, Hotel, Car, Ticket, Package,
  Settings, Menu, X, ChevronLeft
} from 'lucide-react'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'לוח בקרה' },
    { path: '/admin/destinations', icon: Map, label: 'יעדים' },
    { path: '/admin/flights', icon: Plane, label: 'טיסות' },
    { path: '/admin/hotels', icon: Hotel, label: 'מלונות' },
    { path: '/admin/cars', icon: Car, label: 'השכרת רכב' },
    { path: '/admin/attractions', icon: Ticket, label: 'אטרקציות' },
    { path: '/admin/packages', icon: Package, label: 'חבילות' },
    { path: '/admin/settings', icon: Settings, label: 'הגדרות' },
  ]

  return (
    <div className="min-h-screen bg-midnight-950" dir="rtl">
      {/* Sidebar */}
      <aside className={`fixed top-0 right-0 h-full bg-midnight-900 border-l border-white/10 transition-all duration-300 z-40 ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          {sidebarOpen && (
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <Plane className="w-4 h-4 text-white -rotate-45" />
              </div>
              <span className="font-bold text-white">TripCraft</span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            {sidebarOpen ? <ChevronLeft className="w-5 h-5 rotate-180" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === item.path
                  ? 'bg-primary-500/20 text-primary-400'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Back to site */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5 rotate-180" />
            {sidebarOpen && <span>חזרה לאתר</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'mr-64' : 'mr-20'}`}>
        <div className="min-h-screen p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

