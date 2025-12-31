import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Sparkles, MapPin, Calendar, Users, DollarSign,
  Plane, Hotel, Car, Ticket, ChevronLeft, ChevronRight,
  Check, Star, Clock, ArrowLeft, Loader2
} from 'lucide-react'
import { apiUrl } from '../utils/api'

export default function PlannerPage() {
  const [searchParams] = useSearchParams()
  const [step, setStep] = useState(1)
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState(null)
  const [selectedItems, setSelectedItems] = useState({
    destination: null,
    flight: null,
    hotel: null,
    car: null,
    attractions: []
  })
  const [tripDetails, setTripDetails] = useState({
    startDate: '',
    endDate: '',
    travelers: 2
  })

  useEffect(() => {
    if (query) {
      handleSearch()
    }
  }, [])

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsSearching(true)
    try {
      const response = await fetch(apiUrl('/api/search'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      })
      const data = await response.json()
      setSearchResults(data)
      
      // Auto-select first destination if found
      if (data.results.destinations.length > 0) {
        setSelectedItems(prev => ({
          ...prev,
          destination: data.results.destinations[0]
        }))
        setStep(2)
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const steps = [
    { num: 1, title: 'ספרו לנו', icon: Sparkles },
    { num: 2, title: 'בחירת טיסה', icon: Plane },
    { num: 3, title: 'בחירת מלון', icon: Hotel },
    { num: 4, title: 'השכרת רכב', icon: Car },
    { num: 5, title: 'אטרקציות', icon: Ticket },
    { num: 6, title: 'סיכום', icon: Check },
  ]

  const calculateTotal = () => {
    let total = 0
    const days = tripDetails.startDate && tripDetails.endDate 
      ? Math.ceil((new Date(tripDetails.endDate) - new Date(tripDetails.startDate)) / (1000 * 60 * 60 * 24))
      : 7

    if (selectedItems.flight) {
      total += (selectedItems.flight.price_economy || 0) * 2 * tripDetails.travelers
    }
    if (selectedItems.hotel) {
      total += (selectedItems.hotel.price_per_night || 0) * days
    }
    if (selectedItems.car) {
      total += (selectedItems.car.price_per_day || 0) * days
    }
    selectedItems.attractions.forEach(attr => {
      total += (attr.price || 0) * tripDetails.travelers * 3.8 // Convert EUR to ILS approximately
    })

    return total
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Header */}
      <div className="container mx-auto px-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            תכנון <span className="gradient-text">החופשה שלכם</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            עקבו אחר השלבים ובנו את החופשה המושלמת שלכם
          </p>
        </motion.div>

        {/* Steps indicator */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center">
                <button
                  onClick={() => s.num <= step && setStep(s.num)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    step === s.num
                      ? 'bg-primary-500 text-white'
                      : step > s.num
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-white/5 text-gray-500'
                  }`}
                >
                  {step > s.num ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <s.icon className="w-4 h-4" />
                  )}
                  <span className="hidden md:inline text-sm">{s.title}</span>
                </button>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-1 ${step > s.num ? 'bg-green-500' : 'bg-white/10'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Search */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-3xl mx-auto"
            >
              <div className="glass rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  ספרו לנו על החופשה שאתם מחפשים
                </h2>
                
                <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="space-y-6">
                  <div className="relative">
                    <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                    <textarea
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="לדוגמה: חופשת סקי לזוג באוסטריה, תקציב של 10,000 ש״ח, בינואר..."
                      rows={4}
                      className="w-full pr-12 pl-4 py-4 bg-white/5 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">תאריך יציאה</label>
                      <input
                        type="date"
                        value={tripDetails.startDate}
                        onChange={(e) => setTripDetails(prev => ({ ...prev, startDate: e.target.value }))}
                        className="input-glass"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">תאריך חזרה</label>
                      <input
                        type="date"
                        value={tripDetails.endDate}
                        onChange={(e) => setTripDetails(prev => ({ ...prev, endDate: e.target.value }))}
                        className="input-glass"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">מספר נוסעים</label>
                      <select
                        value={tripDetails.travelers}
                        onChange={(e) => setTripDetails(prev => ({ ...prev, travelers: parseInt(e.target.value) }))}
                        className="input-glass"
                      >
                        {[1, 2, 3, 4, 5, 6].map(n => (
                          <option key={n} value={n}>{n} נוסעים</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSearching}
                    className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-3"
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        מחפש...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        חיפוש
                      </>
                    )}
                  </button>
                </form>

                {/* Quick suggestions */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-sm text-gray-400 mb-3">הצעות פופולריות:</p>
                  <div className="flex flex-wrap gap-2">
                    {['טיול רומנטי בוינה', 'סקי באלפים למשפחה', 'סיור תרבותי בזלצבורג'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setQuery(suggestion)}
                        className="px-3 py-1.5 glass-light rounded-lg text-sm text-gray-300 hover:text-white transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Flights */}
          {step === 2 && searchResults && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <h2 className="text-2xl font-bold text-white mb-6">בחרו טיסה</h2>
                  
                  {searchResults.results.flights.map((flight) => (
                    <div
                      key={flight.id}
                      onClick={() => setSelectedItems(prev => ({ ...prev, flight }))}
                      className={`glass rounded-2xl p-6 cursor-pointer transition-all ${
                        selectedItems.flight?.id === flight.id
                          ? 'ring-2 ring-primary-500 bg-primary-500/10'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                            <Plane className="w-6 h-6 text-primary-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{flight.airline}</h3>
                            <p className="text-sm text-gray-400">{flight.departure_time} - {flight.arrival_time}</p>
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="text-2xl font-bold text-white">₪{flight.price_economy?.toLocaleString()}</div>
                          <p className="text-xs text-gray-400">לאדם, כיוון אחד</p>
                        </div>
                      </div>
                      {selectedItems.flight?.id === flight.id && (
                        <div className="mt-4 pt-4 border-t border-primary-500/30 flex items-center text-primary-400">
                          <Check className="w-4 h-4 ml-2" />
                          נבחר
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <TripSummary 
                    selectedItems={selectedItems} 
                    tripDetails={tripDetails}
                    calculateTotal={calculateTotal}
                  />
                </div>
              </div>

              <StepNavigation step={step} setStep={setStep} canProceed={!!selectedItems.flight} />
            </motion.div>
          )}

          {/* Step 3: Hotels */}
          {step === 3 && searchResults && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold text-white mb-6">בחרו מלון</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {searchResults.results.hotels.map((hotel) => (
                      <div
                        key={hotel.id}
                        onClick={() => setSelectedItems(prev => ({ ...prev, hotel }))}
                        className={`glass rounded-2xl overflow-hidden cursor-pointer transition-all ${
                          selectedItems.hotel?.id === hotel.id
                            ? 'ring-2 ring-primary-500'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        <div className="aspect-video relative">
                          <img src={hotel.image_url} alt={hotel.name} className="w-full h-full object-cover" />
                          <div className="absolute top-2 left-2 px-2 py-1 bg-accent-500 rounded text-xs text-white">
                            {'⭐'.repeat(hotel.stars)}
                          </div>
                          {selectedItems.hotel?.id === hotel.id && (
                            <div className="absolute inset-0 bg-primary-500/20 flex items-center justify-center">
                              <div className="bg-primary-500 rounded-full p-3">
                                <Check className="w-6 h-6 text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-white">{hotel.name}</h3>
                          <p className="text-sm text-gray-400 mb-2">{hotel.city}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              <span className="text-white">{hotel.rating}</span>
                            </div>
                            <div className="text-primary-400 font-bold">₪{hotel.price_per_night}/לילה</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <TripSummary 
                    selectedItems={selectedItems} 
                    tripDetails={tripDetails}
                    calculateTotal={calculateTotal}
                  />
                </div>
              </div>

              <StepNavigation step={step} setStep={setStep} canProceed={!!selectedItems.hotel} />
            </motion.div>
          )}

          {/* Step 4: Car */}
          {step === 4 && searchResults && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold text-white mb-2">השכרת רכב</h2>
                  <p className="text-gray-400 mb-6">אופציונלי - ניתן לדלג</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {searchResults.results.carRentals?.map((car) => (
                      <div
                        key={car.id}
                        onClick={() => setSelectedItems(prev => ({ 
                          ...prev, 
                          car: prev.car?.id === car.id ? null : car 
                        }))}
                        className={`glass rounded-2xl p-6 cursor-pointer transition-all ${
                          selectedItems.car?.id === car.id
                            ? 'ring-2 ring-primary-500 bg-primary-500/10'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-white">{car.company}</h3>
                            <p className="text-sm text-gray-400">{car.car_model}</p>
                          </div>
                          <span className="px-2 py-1 bg-primary-500/20 text-primary-400 rounded text-xs">{car.car_type}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-4 text-sm text-gray-400">
                            <span>{car.seats} מושבים</span>
                            <span>{car.transmission === 'Automatic' ? 'אוטומט' : 'ידני'}</span>
                          </div>
                          <div className="text-primary-400 font-bold">₪{car.price_per_day}/יום</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <TripSummary 
                    selectedItems={selectedItems} 
                    tripDetails={tripDetails}
                    calculateTotal={calculateTotal}
                  />
                </div>
              </div>

              <StepNavigation step={step} setStep={setStep} canProceed={true} skipLabel="דלג" />
            </motion.div>
          )}

          {/* Step 5: Attractions */}
          {step === 5 && searchResults && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold text-white mb-2">בחרו אטרקציות</h2>
                  <p className="text-gray-400 mb-6">בחרו אטרקציות שמעניינות אתכם</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {searchResults.results.attractions?.map((attr) => (
                      <div
                        key={attr.id}
                        onClick={() => {
                          setSelectedItems(prev => ({
                            ...prev,
                            attractions: prev.attractions.find(a => a.id === attr.id)
                              ? prev.attractions.filter(a => a.id !== attr.id)
                              : [...prev.attractions, attr]
                          }))
                        }}
                        className={`glass rounded-2xl overflow-hidden cursor-pointer transition-all ${
                          selectedItems.attractions.find(a => a.id === attr.id)
                            ? 'ring-2 ring-primary-500'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        <div className="aspect-video relative">
                          <img src={attr.image_url} alt={attr.name_he} className="w-full h-full object-cover" />
                          {selectedItems.attractions.find(a => a.id === attr.id) && (
                            <div className="absolute top-2 left-2 bg-primary-500 rounded-full p-1">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-white">{attr.name_he}</h3>
                          <p className="text-sm text-gray-400 mb-2">{attr.city}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Clock className="w-4 h-4" />
                              {attr.duration_hours} שעות
                            </div>
                            <div className="text-accent-400 font-bold">€{attr.price}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <TripSummary 
                    selectedItems={selectedItems} 
                    tripDetails={tripDetails}
                    calculateTotal={calculateTotal}
                  />
                </div>
              </div>

              <StepNavigation step={step} setStep={setStep} canProceed={true} />
            </motion.div>
          )}

          {/* Step 6: Summary */}
          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-4xl mx-auto"
            >
              <div className="glass rounded-3xl p-8">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                  🎉 החופשה שלכם מוכנה!
                </h2>

                <div className="space-y-6">
                  {/* Destination */}
                  {selectedItems.destination && (
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                      <MapPin className="w-6 h-6 text-primary-400" />
                      <div>
                        <div className="text-sm text-gray-400">יעד</div>
                        <div className="text-lg font-semibold text-white">{selectedItems.destination.name_he}</div>
                      </div>
                    </div>
                  )}

                  {/* Flight */}
                  {selectedItems.flight && (
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-4">
                        <Plane className="w-6 h-6 text-primary-400" />
                        <div>
                          <div className="text-sm text-gray-400">טיסה</div>
                          <div className="text-lg font-semibold text-white">{selectedItems.flight.airline}</div>
                        </div>
                      </div>
                      <div className="text-primary-400 font-bold">₪{(selectedItems.flight.price_economy * 2 * tripDetails.travelers).toLocaleString()}</div>
                    </div>
                  )}

                  {/* Hotel */}
                  {selectedItems.hotel && (
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-4">
                        <Hotel className="w-6 h-6 text-primary-400" />
                        <div>
                          <div className="text-sm text-gray-400">מלון</div>
                          <div className="text-lg font-semibold text-white">{selectedItems.hotel.name}</div>
                        </div>
                      </div>
                      <div className="text-primary-400 font-bold">₪{(selectedItems.hotel.price_per_night * 7).toLocaleString()}</div>
                    </div>
                  )}

                  {/* Car */}
                  {selectedItems.car && (
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-4">
                        <Car className="w-6 h-6 text-primary-400" />
                        <div>
                          <div className="text-sm text-gray-400">רכב</div>
                          <div className="text-lg font-semibold text-white">{selectedItems.car.car_model}</div>
                        </div>
                      </div>
                      <div className="text-primary-400 font-bold">₪{(selectedItems.car.price_per_day * 7).toLocaleString()}</div>
                    </div>
                  )}

                  {/* Attractions */}
                  {selectedItems.attractions.length > 0 && (
                    <div className="p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-4 mb-3">
                        <Ticket className="w-6 h-6 text-primary-400" />
                        <div className="text-sm text-gray-400">אטרקציות ({selectedItems.attractions.length})</div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedItems.attractions.map(attr => (
                          <span key={attr.id} className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">
                            {attr.name_he}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xl text-gray-300">סה״כ משוער</span>
                    <span className="text-4xl font-bold gradient-text">₪{calculateTotal().toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-400 text-center mb-6">
                    * המחיר הוא הערכה בלבד. המחיר הסופי יתעדכן בעת ההזמנה.
                  </p>
                  <button className="btn-accent w-full py-4 text-lg flex items-center justify-center gap-3">
                    שמירת החופשה
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  התחל מחדש
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function TripSummary({ selectedItems, tripDetails, calculateTotal }) {
  return (
    <div className="glass rounded-2xl p-6 sticky top-32">
      <h3 className="text-lg font-bold text-white mb-4">סיכום הטיול</h3>
      
      <div className="space-y-3 mb-6">
        {selectedItems.destination && (
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="w-4 h-4 text-primary-400" />
            <span className="text-gray-300">{selectedItems.destination.name_he}</span>
          </div>
        )}
        {selectedItems.flight && (
          <div className="flex items-center gap-3 text-sm">
            <Plane className="w-4 h-4 text-primary-400" />
            <span className="text-gray-300">{selectedItems.flight.airline}</span>
          </div>
        )}
        {selectedItems.hotel && (
          <div className="flex items-center gap-3 text-sm">
            <Hotel className="w-4 h-4 text-primary-400" />
            <span className="text-gray-300">{selectedItems.hotel.name}</span>
          </div>
        )}
        {selectedItems.car && (
          <div className="flex items-center gap-3 text-sm">
            <Car className="w-4 h-4 text-primary-400" />
            <span className="text-gray-300">{selectedItems.car.car_model}</span>
          </div>
        )}
        {selectedItems.attractions.length > 0 && (
          <div className="flex items-center gap-3 text-sm">
            <Ticket className="w-4 h-4 text-primary-400" />
            <span className="text-gray-300">{selectedItems.attractions.length} אטרקציות</span>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
          <span>{tripDetails.travelers} נוסעים</span>
          <span>~7 ימים</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-300">סה״כ משוער</span>
          <span className="text-2xl font-bold text-white">₪{calculateTotal().toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

function StepNavigation({ step, setStep, canProceed, skipLabel }) {
  return (
    <div className="flex justify-between items-center mt-8 pt-8 border-t border-white/10">
      <button
        onClick={() => setStep(step - 1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
        הקודם
      </button>
      <button
        onClick={() => setStep(step + 1)}
        className={`btn-primary flex items-center gap-2 ${!canProceed && !skipLabel ? 'opacity-50' : ''}`}
      >
        {skipLabel && !canProceed ? skipLabel : 'הבא'}
        <ChevronLeft className="w-5 h-5" />
      </button>
    </div>
  )
}

