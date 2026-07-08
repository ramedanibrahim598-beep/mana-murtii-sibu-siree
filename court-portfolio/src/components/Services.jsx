const services = [
  {
    icon: '📄',
    title: 'Galmee Dhaddachaa',
    desc: 'Galmee dhaddachaa, faayilii dhimma, fi waraqaa seeraa dhimma sivilii fi yakkaa ilaallatan argachuu fi gaafachuu.',
  },
  {
    icon: '⚖️',
    title: 'Dhimma Galchuu',
    desc: 'Dhimma haaraa, iyyannoo, fi waraqaa seeraa dhiyeessuu fi hordofuu — tartiibaan salphaatti.',
  },
  {
    icon: '📅',
    title: 'Dhaddacha Karoorsuu',
    desc: 'Guyyaa dhaddachaa karoorsuu, guyyaalee dhiyoo ilaaluu, fi kaalaandarii dhimmaa sirriitti bulchuu.',
  },
  {
    icon: '💳',
    title: 'Adabbii fi Kafaltii',
    desc: 'Adabbii mana murtiin murteeffame, kaffaltii galmee, fi kanneen biroo bakka jirretti ykn online kaffaluu.',
  },
  {
    icon: '🔍',
    title: 'Haala Dhimmaa Ilaaluu',
    desc: 'Haala dhimma deemaa jiru, murteen eeggamaa, fi murteen mana murtii ilaaluu.',
  },
  {
    icon: '📋',
    title: 'Tajaajila Murtii Dabarsuu',
    desc: 'Murtii mana murtii fudhachuu, beeksisa seeraa dabarsuu, fi odeeffannoo galmee argachuu.',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 px-6 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center">
        <span className="text-yellow-600 font-semibold uppercase tracking-widest text-sm">
          Maal Dhiyeessina
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0a1628] dark:text-white mt-2 mb-12">
          Tajaajila Mana Murtii
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-left border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-yellow-300 transition-all duration-200"
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-lg font-bold text-[#0a1628] dark:text-white mb-2">{s.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
