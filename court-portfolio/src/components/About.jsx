export default function About() {
  return (
    <section id="about" className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <span className="text-yellow-600 font-semibold uppercase tracking-widest text-sm">
            About Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a1628] mt-2 mb-6">
            Tajaajila Haqa Kennaafi
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Mana Murtii Aanaa Sibu Siree tajaajila seeraa haqa, gahumsa qabu,
            fi ummataaf banaa ta'e kennuuf kutannoo guutuu qaba. Hojjettoonni
            muuxannoo qaban dhimma hunda ogummaa fi kabajaan kan hojjetan dha.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Galmeewwan murtii eegna, dhaddacha seeraa gaggeessina, fi tajaajila
            ummataa adda addaa dhiyeessina — nageenyaa fi mirga namaa kabajuun.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6">
          {[
            { value: '40+', label: 'Years of Service' },
            { value: '10K+', label: 'Cases Handled' },
            { value: '5', label: 'Courtrooms' },
            { value: '24/7', label: 'Online Records' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow p-6 text-center border border-gray-100"
            >
              <div className="text-3xl font-bold text-yellow-500 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
