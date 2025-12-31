import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Plane, Hotel, Car, Ticket, Star, Clock, Users, 
  ChevronLeft, Filter, Search
} from 'lucide-react'
import { apiUrl } from '../utils/api'

export default function PackagesPage() {
  const [packages, setPackages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const response = await fetch(apiUrl('/api/packages'))
      const data = await response.json()
      setPackages(data)
    } catch (error) {
      console.error('Error fetching packages:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const tripTypes = [
    { id: 'all', label: 'הכל' },
    { id: 'culture', label: 'תרבות' },
    { id: 'adventure', label: 'הרפתקאות' },
    { id: 'romantic', label: 'רומנטי' },
    { id: 'family', label: 'משפחה' },
  ]

  const filteredPackages = packages.filter(pkg => {
    const matchesFilter = filter === 'all' || pkg.trip_type === filter
    const matchesSearch = !searchQuery || 
      pkg.name_he?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description_he?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 hero-bg" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              חבילות <span className="gradient-text">נסיעה מוכנות</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              חבילות מתוכננות מראש עם הכל כלול - טיסה, מלון, ופעילויות. בחרו את החופשה המושלמת שלכם.
            </p>

            {/* Search */}
            <div className="max-w-lg mx-auto relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="חפשו חבילה..."
                className="w-full pr-12 pl-4 py-4 glass rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 overflow-x-auto pb-4">
          <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
          {tripTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setFilter(type.id)}
              className={`px-5 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
                filter === type.id
                  ? 'bg-primary-500 text-white'
                  : 'glass-light text-gray-300 hover:text-white'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </section>

      {/* Packages Grid */}
      <section className="container mx-auto px-6">
        {filteredPackages.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">לא נמצאו חבילות מתאימות</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/packages/${pkg.id}`}
                  className="block glass rounded-2xl overflow-hidden card-hover group"
                >
                  {/* Image */}
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={pkg.image_url || pkg.destination_image}
                      alt={pkg.name_he}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/30 to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 bg-accent-500/90 rounded-full text-xs text-white font-medium">
                        {pkg.duration_days} ימים
                      </span>
                      <span className="px-3 py-1 bg-midnight-950/80 backdrop-blur-sm rounded-full text-xs text-white">
                        {pkg.trip_type === 'culture' ? 'תרבות' :
                         pkg.trip_type === 'adventure' ? 'הרפתקאות' :
                         pkg.trip_type === 'romantic' ? 'רומנטי' :
                         pkg.trip_type === 'family' ? 'משפחה' : pkg.trip_type}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {pkg.name_he}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                      {pkg.description_he}
                    </p>

                    {/* Includes */}
                    <div className="flex gap-3 mb-4">
                      {pkg.includes_flight && (
                        <div className="flex items-center gap-1.5 text-primary-400">
                          <Plane className="w-4 h-4" />
                          <span className="text-xs">טיסה</span>
                        </div>
                      )}
                      {pkg.includes_hotel && (
                        <div className="flex items-center gap-1.5 text-primary-400">
                          <Hotel className="w-4 h-4" />
                          <span className="text-xs">מלון</span>
                        </div>
                      )}
                      {pkg.includes_car && (
                        <div className="flex items-center gap-1.5 text-primary-400">
                          <Car className="w-4 h-4" />
                          <span className="text-xs">רכב</span>
                        </div>
                      )}
                      {pkg.includes_attractions && (
                        <div className="flex items-center gap-1.5 text-primary-400">
                          <Ticket className="w-4 h-4" />
                          <span className="text-xs">אטרקציות</span>
                        </div>
                      )}
                    </div>

                    {/* Suitable for */}
                    {pkg.suitable_for && (
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                        <Users className="w-4 h-4" />
                        <span>מתאים ל: {pkg.suitable_for}</span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div>
                        <span className="text-xs text-gray-500">החל מ-</span>
                        <div className="text-2xl font-bold text-white">
                          ₪{pkg.price_from?.toLocaleString()}
                        </div>
                        <span className="text-xs text-gray-500">לאדם</span>
                      </div>
                      <div className="btn-primary py-2 px-4 flex items-center gap-2 text-sm">
                        פרטים
                        <ChevronLeft className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            לא מצאתם את מה שחיפשתם?
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            בואו לתכנן חופשה מותאמת אישית בדיוק לפי הדרישות שלכם
          </p>
          <Link to="/planner" className="btn-accent inline-flex items-center gap-2 text-lg px-8 py-4">
            תכנון מותאם אישית
            <ChevronLeft className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

