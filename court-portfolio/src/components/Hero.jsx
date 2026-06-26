export default function Hero() {
  return (
    <section
      id="home"
      className="bg-[#0a1628] text-white min-h-[90vh] flex items-center justify-center text-center px-6"
    >
      <div className="max-w-3xl">
        <div className="text-yellow-400 text-5xl mb-6">⚖️</div>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Mana Murtii Aanaa Sibu Siree
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
          Tajaajila haqaa sadarkaa aanaa irratti kenname. Murtii, galmeewwan
          seeraa, fi tajaajila mootummaa irratti hundaa'e.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#services"
            className="bg-yellow-500 hover:bg-yellow-400 text-[#0a1628] font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
          >
            Our Services
          </a>
          <a
            href="#contact"
            className="border border-yellow-500 hover:bg-yellow-500 hover:text-[#0a1628] text-yellow-400 font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  )
}
