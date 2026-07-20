import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import logoImg from '../assets/photo_2026-07-01_16-32-53.jpg'

const links = ['Home', 'About', 'Services', 'News', 'Contact']

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { dark, setDark } = useTheme()

  return (
    <nav className="bg-[#0a1628] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={logoImg}
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400 shrink-0"
          />
          <span className="font-bold text-base md:text-xl tracking-wide leading-tight">
            Mana Murtii Aanaa Sibu Siree
          </span>
        </div>

        {/* Desktop links + toggle */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8 text-sm font-medium">
            {links.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* Dark/Light toggle — desktop */}
          <button
            onClick={() => setDark(!dark)}
            aria-label="Toggle dark mode"
            className="w-12 h-6 rounded-full relative transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            style={{ backgroundColor: dark ? '#EAB308' : '#374151' }}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 rounded-full shadow transition-transform duration-300 flex items-center justify-center text-xs
                ${dark ? 'translate-x-6 bg-[#0a1628]' : 'translate-x-0.5 bg-white'}`}
            >
              {dark ? '🌙' : '☀️'}
            </span>
          </button>
        </div>

        {/* Mobile: toggle + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          {/* Dark/Light toggle — mobile */}
          <button
            onClick={() => setDark(!dark)}
            aria-label="Toggle dark mode"
            className="w-11 h-6 rounded-full relative transition-colors duration-300 focus:outline-none"
            style={{ backgroundColor: dark ? '#EAB308' : '#374151' }}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 rounded-full shadow transition-transform duration-300 flex items-center justify-center text-xs
                ${dark ? 'translate-x-5 bg-[#0a1628]' : 'translate-x-0.5 bg-white'}`}
            >
              {dark ? '🌙' : '☀️'}
            </span>
          </button>

          {/* Hamburger */}
          <button
            className="text-white focus:outline-none"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <ul className="md:hidden bg-[#0d1f3c] px-6 pb-4 flex flex-col gap-4 text-sm font-medium">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="hover:text-yellow-400 transition-colors duration-200 block py-1"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
