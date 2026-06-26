export default function Footer() {
  return (
    <footer className="bg-[#0a1628] text-gray-400 py-8 px-6 text-center text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-white font-semibold">
          <span>⚖</span>
          <span>Mana Murtii Aanaa Sibu Siree</span>
        </div>
        <p>© {new Date().getFullYear()} Mana Murtii Aanaa Sibu Siree. Mirgi kaa'ameera.</p>
        <div className="flex gap-6 flex-wrap justify-center">
          <a href="#home" className="hover:text-yellow-400 transition-colors">Home</a>
          <a href="#about" className="hover:text-yellow-400 transition-colors">About</a>
          <a href="#services" className="hover:text-yellow-400 transition-colors">Services</a>
          <a href="#news" className="hover:text-yellow-400 transition-colors">News</a>
          <a href="#contact" className="hover:text-yellow-400 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  )
}
