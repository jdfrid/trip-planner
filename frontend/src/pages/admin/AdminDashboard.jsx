import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Map, Plane, Hotel, Car, Ticket, Package, TrendingUp, 
  Users, DollarSign, Calendar, ArrowUp, ArrowDown
} from 'lucide-react'
import { apiUrl } from '../../utils/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    destinations: 0,
    flights: 0,
    hotels: 0,
    carRentals: 0,
    attractions: 0,
    packages: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [destinations, flights, hotels, carRentals, attractions, packages] = await Promise.all([
        fetch(apiUrl('/api/destinations')).then(r => r.json()),
        fetch(apiUrl('/api/flights')).then(r => r.json()),
        fetch(apiUrl('/api/hotels')).then(r => r.json()),
        fetch(apiUrl('/api/car-rentals')).then(r => r.json()),
        fetch(apiUrl('/api/attractions')).then(r => r.json()),
        fetch(apiUrl('/api/packages')).then(r => r.json())
      ])

      setStats({
        destinations: destinations.length,
        flights: flights.length,
        hotels: hotels.length,
        carRentals: carRentals.length,
        attractions: attractions.length,
        packages: packages.length
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const statCards = [
    { title: 'יעדים', value: stats.destinations, icon: Map, color: 'from-blue-500 to-cyan-500' },
    { title: 'טיסות', value: stats.flights, icon: Plane, color: 'from-purple-500 to-pink-500' },
    { title: 'מלונות', value: stats.hotels, icon: Hotel, color: 'from-orange-500 to-red-500' },
    { title: 'רכבים', value: stats.carRentals, icon: Car, color: 'from-green-500 to-emerald-500' },
    { title: 'אטרקציות', value: stats.attractions, icon: Ticket, color: 'from-yellow-500 to-orange-500' },
    { title: 'חבילות', value: stats.packages, icon: Package, color: 'from-indigo-500 to-purple-500' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">לוח בקרה</h1>
        <p className="text-gray-400">ברוכים הבאים למערכת הניהול של TripCraft</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {isLoading ? '-' : stat.value}
            </div>
            <div className="text-sm text-gray-400">{stat.title}</div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">פעולות מהירות</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'הוספת יעד', icon: Map, href: '/admin/destinations' },
              { label: 'הוספת טיסה', icon: Plane, href: '/admin/flights' },
              { label: 'הוספת מלון', icon: Hotel, href: '/admin/hotels' },
              { label: 'הוספת חבילה', icon: Package, href: '/admin/packages' },
            ].map((action) => (
              <button
                key={action.label}
                className="flex items-center gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-right"
              >
                <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                  <action.icon className="w-5 h-5 text-primary-400" />
                </div>
                <span className="text-white">{action.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">סטטוס מערכת</h2>
          <div className="space-y-4">
            {[
              { label: 'בסיס נתונים', status: 'פעיל', ok: true },
              { label: 'API', status: 'פעיל', ok: true },
              { label: 'Cache', status: 'פעיל', ok: true },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <span className="text-gray-300">{item.label}</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${item.ok ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className={item.ok ? 'text-green-400' : 'text-red-400'}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-2xl p-6 mt-8"
      >
        <h2 className="text-xl font-bold text-white mb-6">מידע על המערכת</h2>
        <div className="p-6 bg-primary-500/10 rounded-xl border border-primary-500/30">
          <h3 className="text-lg font-semibold text-primary-400 mb-3">🎉 ברוכים הבאים למערכת TripCraft!</h3>
          <p className="text-gray-300 mb-4">
            מערכת זו מאפשרת ניהול מלא של יעדים, טיסות, מלונות, השכרת רכב, אטרקציות וחבילות נסיעה.
          </p>
          <div className="text-sm text-gray-400">
            <p>• <strong>יעד פיילוט:</strong> אוסטריה</p>
            <p>• <strong>מידע דמו:</strong> כולל טיסות, מלונות, רכב ואטרקציות</p>
            <p>• <strong>חבילות מוכנות:</strong> 4 חבילות מגוונות</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

