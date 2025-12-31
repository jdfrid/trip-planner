import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import DestinationPage from './pages/DestinationPage'
import PlannerPage from './pages/PlannerPage'
import PackagesPage from './pages/PackagesPage'
import PackageDetailPage from './pages/PackageDetailPage'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
          </Route>
          
          {/* Public Routes */}
          <Route path="/*" element={
            <>
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/destination/:id" element={<DestinationPage />} />
                  <Route path="/planner" element={<PlannerPage />} />
                  <Route path="/packages" element={<PackagesPage />} />
                  <Route path="/packages/:id" element={<PackageDetailPage />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-midnight-950 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          {/* Animated rings */}
          <div className="absolute inset-0 border-4 border-primary-500/30 rounded-full animate-ping" />
          <div className="absolute inset-2 border-4 border-accent-500/30 rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
          <div className="absolute inset-4 border-4 border-primary-500/30 rounded-full animate-ping" style={{ animationDelay: '0.4s' }} />
          
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold gradient-text mb-2">TripCraft</h2>
        <p className="text-gray-400">מכינים את החוויה שלך...</p>
      </div>
    </div>
  )
}

export default App

