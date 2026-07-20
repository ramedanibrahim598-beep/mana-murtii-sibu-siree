import { useState, useEffect } from 'react'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { ThemeProvider } from './context/ThemeContext'
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

  return (
    <ThemeProvider>
      <div className="font-sans bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <News />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
