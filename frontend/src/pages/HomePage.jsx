import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Search, MapPin, Calendar, Users, Sparkles, ArrowLeft, 
  Plane, Hotel, Car, Ticket, Star, ChevronLeft, Play
} from 'lucide-react'
import { apiUrl } from '../utils/api'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [destinations, setDestinations] = useState([])
  const [packages, setPackages] = useState([])
  const [attractions, setAttractions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [destRes, pkgRes, attrRes] = await Promise.all([
        fetch(apiUrl('/api/destinations')),
        fetch(apiUrl('/api/packages')),
        fetch(apiUrl('/api/attractions'))
      ])
      
      const [destData, pkgData, attrData] = await Promise.all([
        destRes.json(),
        pkgRes.json(),
        attrRes.json()
      ])

      setDestinations(destData)
      setPackages(pkgData.slice(0, 4))
      setAttractions(attrData.slice(0, 6))
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/planner?q=${encodeURIComponent(searchQuery)}`)
  }

  const features = [
    { icon: Plane, title: 'טיסות', desc: 'המחירים הטובים ביותר' },
    { icon: Hotel, title: 'מלונות', desc: 'מגוון אפשרויות לינה' },
    { icon: Car, title: 'השכרת רכב', desc: 'חופש תנועה מוחלט' },
    { icon: Ticket, title: 'אטרקציות', desc: 'חוויות בלתי נשכחות' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary-500/10 to-transparent rounded-full"
          />
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-accent-500/10 to-transparent rounded-full"
          />
        </div>

        {/* Floating destination cards in background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {['Vienna', 'Salzburg', 'Alps'].map((city, i) => (
            <motion.div
              key={city}
              initial={{ opacity: 0, y: 100 }}
              animate={{ 
                opacity: 0.15,
                y: 0,
                x: [0, 10, 0],
              }}
              transition={{ 
                delay: i * 0.3,
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className={`absolute glass rounded-2xl p-4 ${
                i === 0 ? 'top-1/4 left-10' : 
                i === 1 ? 'top-1/3 right-20' : 
                'bottom-1/4 left-1/4'
              }`}
              style={{ width: 150 }}
            >
              <div className="w-full h-20 bg-gradient-to-br from-primary-500/30 to-accent-500/30 rounded-lg mb-2" />
              <div className="text-xs text-gray-400">{city}</div>
            </motion.div>
          ))}
        </div>

        <div className="relative container mx-auto px-6 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 glass-light rounded-full text-sm text-primary-400 mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <span>תכנון חופשות חכם ומותאם אישית</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">גלו את </span>
              <span className="gradient-text">החופשה המושלמת</span>
              <br />
              <span className="text-white">שלכם</span>
            </h1>

            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              ספרו לנו מה אתם מחפשים - יעד, תקציב, סוג טיול או כל דבר אחר.
              <br />
              אנחנו נבנה עבורכם את החופשה המושלמת.
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
              <div className="glass rounded-2xl p-2 md:p-3">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder='נסו: "חופשת סקי לזוג באוסטריה" או "טיול משפחתי עד 15,000 ₪"'
                      className="w-full pr-12 pl-4 py-4 bg-white/5 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                    />
                  </div>
                  <button type="submit" className="btn-accent flex items-center justify-center gap-2 px-8 py-4">
                    <span>חפש</span>
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </form>

            {/* Quick suggestions */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {['טיול רומנטי', 'חופשה משפחתית', 'סקי באלפים', 'סיור תרבותי'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setSearchQuery(suggestion)
                    navigate(`/planner?q=${encodeURIComponent(suggestion)}`)
                  }}
                  className="px-4 py-2 glass-light rounded-full text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-900 to-midnight-950" />
        
        <div className="relative container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6 text-center card-hover"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destination - Austria */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-500/5 to-transparent" />
        </div>

        <div className="relative container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary-400 text-sm font-medium">יעד מומלץ</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
              גלו את <span className="gradient-text">אוסטריה</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              מארמונות קיסריים ועד פסגות האלפים - אוסטריה מציעה חוויה שלמה של תרבות, טבע והרפתקאות
            </p>
          </motion.div>

          {destinations.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Main destination card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative rounded-3xl overflow-hidden group card-hover"
              >
                <div className="aspect-[4/3]">
                  <img
                    src={destinations[0].image_url}
                    alt={destinations[0].name_he}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/50 to-transparent" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-2 text-primary-400 text-sm mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>מרכז אירופה</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">{destinations[0].name_he}</h3>
                  <p className="text-gray-300 mb-6 line-clamp-2">{destinations[0].description_he}</p>
                  
                  <Link 
                    to={`/destination/${destinations[0].id}`}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    גלו עוד
                    <ChevronLeft className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

              {/* Stats and highlights */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass rounded-2xl p-6"
                >
                  <h4 className="text-lg font-semibold text-white mb-4">למה אוסטריה?</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'שעות טיסה', value: '4', icon: Plane },
                      { label: 'שפה', value: 'גרמנית', icon: Users },
                      { label: 'מטבע', value: 'EUR', icon: Ticket },
                      { label: 'ויזה', value: 'לא נדרש', icon: Star },
                    ].map((stat) => (
                      <div key={stat.label} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                          <stat.icon className="w-5 h-5 text-primary-400" />
                        </div>
                        <div>
                          <div className="text-white font-semibold">{stat.value}</div>
                          <div className="text-xs text-gray-400">{stat.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="glass rounded-2xl p-6"
                >
                  <h4 className="text-lg font-semibold text-white mb-4">ערים מומלצות</h4>
                  <div className="space-y-3">
                    {['וינה - הבירה הקיסרית', 'זלצבורג - עיר המוזיקה', 'אינסברוק - שער האלפים', 'הלשטאט - כפר האגדות'].map((city, i) => (
                      <div key={city} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                          {i + 1}
                        </div>
                        <span className="text-gray-300">{city}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900 to-midnight-950" />

        <div className="relative container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between mb-12"
          >
            <div>
              <span className="text-primary-400 text-sm font-medium">חבילות מוכנות</span>
              <h2 className="text-4xl font-bold text-white mt-2">חבילות נסיעה פופולריות</h2>
            </div>
            <Link to="/packages" className="mt-4 md:mt-0 text-primary-400 hover:text-primary-300 flex items-center gap-2 transition-colors">
              צפו בכל החבילות
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/packages/${pkg.id}`} className="block glass rounded-2xl overflow-hidden card-hover group">
                  <div className="aspect-[3/2] relative overflow-hidden">
                    <img
                      src={pkg.image_url}
                      alt={pkg.name_he}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/90 to-transparent" />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-accent-500/90 rounded-full text-xs text-white font-medium">
                      {pkg.duration_days} ימים
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {pkg.name_he}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-4">{pkg.description_he}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-500">החל מ-</span>
                        <div className="text-xl font-bold text-white">
                          ₪{pkg.price_from?.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {pkg.includes_flight && <Plane className="w-4 h-4 text-primary-400" />}
                        {pkg.includes_hotel && <Hotel className="w-4 h-4 text-primary-400" />}
                        {pkg.includes_car && <Car className="w-4 h-4 text-primary-400" />}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Attractions Preview */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-midnight-950" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

        <div className="relative container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-accent-400 text-sm font-medium">מה לעשות</span>
            <h2 className="text-4xl font-bold text-white mt-2">אטרקציות מובילות</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {attractions.map((attr, index) => (
              <motion.div
                key={attr.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group cursor-pointer"
              >
                <div className="aspect-square rounded-2xl overflow-hidden relative">
                  <img
                    src={attr.image_url}
                    alt={attr.name_he}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-sm font-medium text-white truncate">{attr.name_he}</h4>
                    <p className="text-xs text-gray-400">{attr.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-20" />
        <div className="absolute inset-0 bg-midnight-950/80" />

        <div className="relative container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              מוכנים להתחיל לתכנן?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              בואו ניצור יחד את החופשה המושלמת שלכם.
              <br />
              ספרו לנו על החלום שלכם ואנחנו נהפוך אותו למציאות.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/planner" className="btn-primary text-lg px-10 py-4 flex items-center justify-center gap-3">
                <Sparkles className="w-5 h-5" />
                התחילו לתכנן
              </Link>
              <Link to="/packages" className="btn-accent text-lg px-10 py-4 flex items-center justify-center gap-3">
                צפו בחבילות
                <ChevronLeft className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

