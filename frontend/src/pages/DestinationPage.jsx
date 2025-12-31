import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  MapPin, Clock, Star, ChevronLeft, Plane, Hotel, Car, 
  Ticket, Calendar, Users, DollarSign, Sun, Thermometer,
  Globe, Check, ArrowLeft
} from 'lucide-react'
import { apiUrl } from '../utils/api'

export default function DestinationPage() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetchDestinationData()
  }, [id])

  const fetchDestinationData = async () => {
    try {
      const response = await fetch(apiUrl(`/api/destinations/${id}/complete`))
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Error fetching destination:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">יעד לא נמצא</h2>
          <Link to="/" className="btn-primary">חזרה לדף הבית</Link>
        </div>
      </div>
    )
  }

  const { destination, flights, hotels, carRentals, attractions, packages } = data

  const tabs = [
    { id: 'overview', label: 'סקירה', icon: Globe },
    { id: 'flights', label: 'טיסות', icon: Plane, count: flights.length },
    { id: 'hotels', label: 'מלונות', icon: Hotel, count: hotels.length },
    { id: 'cars', label: 'רכב', icon: Car, count: carRentals.length },
    { id: 'attractions', label: 'אטרקציות', icon: Ticket, count: attractions.length },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px]">
        <img
          src={destination.image_url}
          alt={destination.name_he}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 text-primary-400 mb-4">
              <MapPin className="w-5 h-5" />
              <span>{destination.country_he}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{destination.name_he}</h1>
            <p className="text-xl text-gray-300 max-w-2xl">{destination.description_he}</p>
          </motion.div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-midnight-900 border-y border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            {[
              { icon: Thermometer, label: 'קיץ', value: `${destination.avg_temp_summer}°C` },
              { icon: Sun, label: 'חורף', value: `${destination.avg_temp_winter}°C` },
              { icon: DollarSign, label: 'מטבע', value: destination.currency },
              { icon: Globe, label: 'שפה', value: destination.language },
              { icon: Check, label: 'ויזה', value: destination.visa_required ? 'נדרש' : 'לא נדרש' },
            ].map((info) => (
              <div key={info.label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                  <info.icon className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">{info.label}</div>
                  <div className="text-white font-medium">{info.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="sticky top-16 z-30 bg-midnight-950/95 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white'
                    : 'glass-light text-gray-300 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    activeTab === tab.id ? 'bg-white/20' : 'bg-white/10'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-8">
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">על היעד</h2>
                  <p className="text-gray-300 leading-relaxed">{destination.description_he}</p>
                  <p className="text-gray-400 mt-4">
                    <strong className="text-white">העונה המומלצת:</strong> {destination.best_season}
                  </p>
                </div>

                {packages.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">חבילות מומלצות</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {packages.slice(0, 2).map((pkg) => (
                        <Link
                          key={pkg.id}
                          to={`/packages/${pkg.id}`}
                          className="glass rounded-xl overflow-hidden card-hover group"
                        >
                          <div className="aspect-video relative">
                            <img src={pkg.image_url} alt={pkg.name_he} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 to-transparent" />
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold text-white group-hover:text-primary-400 transition-colors">
                              {pkg.name_he}
                            </h4>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm text-gray-400">{pkg.duration_days} ימים</span>
                              <span className="text-primary-400 font-bold">₪{pkg.price_from?.toLocaleString()}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">התחל לתכנן</h3>
                  <Link to={`/planner?destination=${id}`} className="btn-primary w-full flex items-center justify-center gap-2">
                    תכנון חופשה
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                </div>

                {flights.length > 0 && (
                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">טיסות זמינות</h3>
                    <div className="space-y-3">
                      {flights.slice(0, 3).map((flight) => (
                        <div key={flight.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                          <div className="flex items-center gap-3">
                            <Plane className="w-4 h-4 text-primary-400" />
                            <span className="text-white">{flight.airline}</span>
                          </div>
                          <span className="text-accent-400 font-bold">₪{flight.price_economy}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setActiveTab('flights')}
                      className="w-full mt-4 text-primary-400 text-sm hover:text-primary-300 transition-colors"
                    >
                      הצג את כל הטיסות
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Flights Tab */}
          {activeTab === 'flights' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {flights.map((flight) => (
                <div key={flight.id} className="glass rounded-2xl p-6 card-hover">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                        <Plane className="w-6 h-6 text-primary-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{flight.airline}</h3>
                        <p className="text-gray-400">{flight.origin_code} → {flight.destination_code}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <div className="text-white font-medium">{flight.departure_time}</div>
                        <div className="text-xs text-gray-400">יציאה</div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <div className="w-2 h-2 bg-primary-500 rounded-full" />
                        <div className="w-20 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500" />
                        <div className="w-2 h-2 bg-accent-500 rounded-full" />
                      </div>
                      <div className="text-center">
                        <div className="text-white font-medium">{flight.arrival_time}</div>
                        <div className="text-xs text-gray-400">הגעה</div>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-white">₪{flight.price_economy?.toLocaleString()}</div>
                      <div className="text-xs text-gray-400">מחיר לכיוון</div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-4 pt-4 border-t border-white/10">
                    {flight.baggage_included && (
                      <span className="text-xs text-green-400">✓ מטען כלול</span>
                    )}
                    {flight.meal_included && (
                      <span className="text-xs text-green-400">✓ ארוחה כלולה</span>
                    )}
                    <span className="text-xs text-gray-400">
                      {flight.stops === 0 ? 'טיסה ישירה' : `${flight.stops} עצירות`}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Hotels Tab */}
          {activeTab === 'hotels' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="glass rounded-2xl overflow-hidden card-hover group">
                  <div className="aspect-video relative">
                    <img src={hotel.image_url} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 px-2 py-1 bg-accent-500 rounded-lg text-xs text-white font-medium">
                      {'⭐'.repeat(hotel.stars)}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white mb-1">{hotel.name}</h3>
                    <p className="text-sm text-gray-400 mb-3">{hotel.city}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white">{hotel.rating}</span>
                      <span className="text-gray-400 text-sm">({hotel.reviews_count} ביקורות)</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <div>
                        <span className="text-xs text-gray-400">ללילה</span>
                        <div className="text-xl font-bold text-white">₪{hotel.price_per_night}</div>
                      </div>
                      <button className="btn-primary text-sm py-2">בחירה</button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Cars Tab */}
          {activeTab === 'cars' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {carRentals.map((car) => (
                <div key={car.id} className="glass rounded-2xl p-6 card-hover">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{car.company}</h3>
                    <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">{car.car_type}</span>
                  </div>
                  <div className="text-center py-6">
                    <Car className="w-16 h-16 mx-auto text-gray-400 mb-3" />
                    <h4 className="text-white font-medium">{car.car_model}</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center p-2 bg-white/5 rounded-lg">
                      <div className="text-white font-medium">{car.seats}</div>
                      <div className="text-xs text-gray-400">מושבים</div>
                    </div>
                    <div className="text-center p-2 bg-white/5 rounded-lg">
                      <div className="text-white font-medium">{car.transmission === 'Automatic' ? 'אוטומט' : 'ידני'}</div>
                      <div className="text-xs text-gray-400">גיר</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <span className="text-xs text-gray-400">ליום</span>
                      <div className="text-xl font-bold text-white">₪{car.price_per_day}</div>
                    </div>
                    <button className="btn-primary text-sm py-2">הזמנה</button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Attractions Tab */}
          {activeTab === 'attractions' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attractions.map((attr) => (
                <div key={attr.id} className="glass rounded-2xl overflow-hidden card-hover group">
                  <div className="aspect-video relative">
                    <img src={attr.image_url} alt={attr.name_he} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-midnight-950/80 backdrop-blur-sm rounded-full text-xs text-white">
                      {attr.type}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white mb-1">{attr.name_he}</h3>
                    <p className="text-sm text-gray-400 mb-3">{attr.city}</p>
                    <p className="text-sm text-gray-300 line-clamp-2 mb-4">{attr.description_he}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {attr.duration_hours} שעות
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        {attr.rating}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <div className="text-xl font-bold text-white">€{attr.price}</div>
                      <button className="btn-accent text-sm py-2">פרטים</button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

