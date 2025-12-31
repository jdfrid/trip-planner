import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MapPin, Calendar, Users, ChevronLeft, Plane, Hotel, Car,
  Ticket, Check, Clock, ArrowLeft, Star, Phone, Mail
} from 'lucide-react'
import { apiUrl } from '../utils/api'

export default function PackageDetailPage() {
  const { id } = useParams()
  const [pkg, setPkg] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPackage()
  }, [id])

  const fetchPackage = async () => {
    try {
      const response = await fetch(apiUrl(`/api/packages/${id}`))
      const data = await response.json()
      setPkg(data)
    } catch (error) {
      console.error('Error fetching package:', error)
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

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">חבילה לא נמצאה</h2>
          <Link to="/packages" className="btn-primary">חזרה לחבילות</Link>
        </div>
      </div>
    )
  }

  const highlights = pkg.highlights || []
  const itinerary = pkg.itinerary || []

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <img
          src={pkg.image_url}
          alt={pkg.name_he}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-accent-500 rounded-full text-sm text-white">
                {pkg.duration_days} ימים
              </span>
              <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white">
                {pkg.trip_type === 'culture' ? 'תרבות' :
                 pkg.trip_type === 'adventure' ? 'הרפתקאות' :
                 pkg.trip_type === 'romantic' ? 'רומנטי' :
                 pkg.trip_type === 'family' ? 'משפחה' : pkg.trip_type}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{pkg.name_he}</h1>
            <p className="text-xl text-gray-300 max-w-2xl">{pkg.description_he}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* What's Included */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl p-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6">מה כלול בחבילה</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className={`p-4 rounded-xl ${pkg.includes_flight ? 'bg-green-500/10 border border-green-500/30' : 'bg-white/5'}`}>
                    <Plane className={`w-6 h-6 mb-2 ${pkg.includes_flight ? 'text-green-400' : 'text-gray-500'}`} />
                    <div className={`font-medium ${pkg.includes_flight ? 'text-white' : 'text-gray-500'}`}>טיסה</div>
                    <div className="text-sm text-gray-400">{pkg.includes_flight ? 'כלול' : 'לא כלול'}</div>
                  </div>
                  <div className={`p-4 rounded-xl ${pkg.includes_hotel ? 'bg-green-500/10 border border-green-500/30' : 'bg-white/5'}`}>
                    <Hotel className={`w-6 h-6 mb-2 ${pkg.includes_hotel ? 'text-green-400' : 'text-gray-500'}`} />
                    <div className={`font-medium ${pkg.includes_hotel ? 'text-white' : 'text-gray-500'}`}>מלון</div>
                    <div className="text-sm text-gray-400">{pkg.includes_hotel ? 'כלול' : 'לא כלול'}</div>
                  </div>
                  <div className={`p-4 rounded-xl ${pkg.includes_car ? 'bg-green-500/10 border border-green-500/30' : 'bg-white/5'}`}>
                    <Car className={`w-6 h-6 mb-2 ${pkg.includes_car ? 'text-green-400' : 'text-gray-500'}`} />
                    <div className={`font-medium ${pkg.includes_car ? 'text-white' : 'text-gray-500'}`}>רכב</div>
                    <div className="text-sm text-gray-400">{pkg.includes_car ? 'כלול' : 'לא כלול'}</div>
                  </div>
                  <div className={`p-4 rounded-xl ${pkg.includes_attractions ? 'bg-green-500/10 border border-green-500/30' : 'bg-white/5'}`}>
                    <Ticket className={`w-6 h-6 mb-2 ${pkg.includes_attractions ? 'text-green-400' : 'text-gray-500'}`} />
                    <div className={`font-medium ${pkg.includes_attractions ? 'text-white' : 'text-gray-500'}`}>אטרקציות</div>
                    <div className="text-sm text-gray-400">{pkg.includes_attractions ? 'כלול' : 'לא כלול'}</div>
                  </div>
                </div>
              </motion.div>

              {/* Highlights */}
              {highlights.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="glass rounded-2xl p-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">נקודות חוזק</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-primary-400" />
                        </div>
                        <span className="text-gray-300">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Itinerary */}
              {itinerary.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass rounded-2xl p-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">לוח זמנים</h2>
                  <div className="space-y-6">
                    {itinerary.map((day, index) => (
                      <div key={index} className="relative pr-8 pb-6 border-r-2 border-primary-500/30 last:pb-0">
                        {/* Day marker */}
                        <div className="absolute right-0 top-0 transform translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full" />
                        
                        <div className="mb-2">
                          <span className="text-primary-400 font-bold">יום {day.day}</span>
                          <h3 className="text-lg font-semibold text-white">{day.title}</h3>
                        </div>
                        
                        <ul className="space-y-2">
                          {day.activities?.map((activity, actIndex) => (
                            <li key={actIndex} className="flex items-start gap-2 text-gray-400">
                              <Clock className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl p-6 sticky top-24"
              >
                <div className="text-center mb-6">
                  <span className="text-sm text-gray-400">החל מ-</span>
                  <div className="text-4xl font-bold text-white">
                    ₪{pkg.price_from?.toLocaleString()}
                  </div>
                  <span className="text-sm text-gray-400">לאדם</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                    <Calendar className="w-5 h-5 text-primary-400" />
                    <div>
                      <div className="text-sm text-gray-400">משך הטיול</div>
                      <div className="text-white font-medium">{pkg.duration_days} ימים</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                    <Users className="w-5 h-5 text-primary-400" />
                    <div>
                      <div className="text-sm text-gray-400">מתאים ל</div>
                      <div className="text-white font-medium">{pkg.suitable_for || 'כולם'}</div>
                    </div>
                  </div>
                </div>

                <button className="btn-accent w-full py-4 flex items-center justify-center gap-2 text-lg mb-4">
                  הזמנת החבילה
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <Link
                  to={`/planner?package=${id}`}
                  className="btn-primary w-full py-3 flex items-center justify-center gap-2"
                >
                  התאמה אישית
                </Link>
              </motion.div>

              {/* Contact Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="font-bold text-white mb-4">צריכים עזרה?</h3>
                <div className="space-y-3">
                  <a href="tel:031234567" className="flex items-center gap-3 text-gray-300 hover:text-primary-400 transition-colors">
                    <Phone className="w-5 h-5" />
                    <span dir="ltr">03-1234567</span>
                  </a>
                  <a href="mailto:info@tripcraft.co.il" className="flex items-center gap-3 text-gray-300 hover:text-primary-400 transition-colors">
                    <Mail className="w-5 h-5" />
                    <span>info@tripcraft.co.il</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Packages */}
      <section className="py-12 bg-midnight-900/50">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-8">חבילות נוספות שעשויות לעניין אתכם</h2>
          <div className="text-center">
            <Link to="/packages" className="btn-primary inline-flex items-center gap-2">
              צפו בכל החבילות
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

