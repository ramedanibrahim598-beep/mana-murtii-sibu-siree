import { useState, useEffect } from 'react'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import News from './components/News'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import './index.css'

function App() {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  // Admin page yoo URL /admin ta'e agarsiisi
  const isAdmin = window.location.pathname === '/admin'

  useEffect(() => {
    if (!isAdmin) {
      setAuthLoading(false)
      return
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setAuthLoading(false)
    })
    return () => unsub()
  }, [isAdmin])

  // Admin route
  if (isAdmin) {
    if (authLoading) {
      return (
        <div className="min-h-screen bg-[#0a1628] flex items-center justify-center">
          <div className="text-white text-lg animate-pulse">⚖️ Fe'aa jira...</div>
        </div>
      )
    }
    if (!user) return <AdminLogin onLogin={() => setUser(auth.currentUser)} />
    return <AdminDashboard />
  }

  // Main website
  return (
    <div className="font-sans bg-white text-gray-800">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <News />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
