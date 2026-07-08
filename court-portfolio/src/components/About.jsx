import presidentImg from '../assets/photo_2026-07-08_14-18-29.jpg'
import wandimmuImg from '../assets/photo_2026-07-08_14-36-16.jpg'

export default function About() {
  return (
    <>
      {/* ── About Section ── */}
      <section id="about" className="py-20 px-6 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-yellow-600 font-semibold uppercase tracking-widest text-sm">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1628] dark:text-white mt-2 mb-6">
              Tajaajila Haqa Kennaafi
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Mana Murtii Aanaa Sibu Siree tajaajila seeraa haqa, gahumsa qabu,
              fi ummataaf banaa ta'e kennuuf kutannoo guutuu qaba. Hojjettoonni
              muuxannoo qaban dhimma hunda ogummaa fi kabajaan kan hojjetan dha.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Galmeewwan murtii eegna, dhaddacha seeraa gaggeessina, fi tajaajila
              ummataa adda addaa dhiyeessina — nageenyaa fi mirga namaa kabajuun.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { value: '35+', label: 'Waggaa Tajaajila (1989 irraa)' },
              { value: '36K+', label: 'Dhimma Xumuurame' },
              { value: '5', label: 'Kutaa Dhaddachaa' },
              { value: '24/7', label: 'Galmee Online' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-gray-700 rounded-xl shadow p-6 text-center border border-gray-100 dark:border-gray-600">
                <div className="text-3xl font-bold text-yellow-500 mb-1">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dhaamsa Pirezidaantii ── */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-yellow-600 font-semibold uppercase tracking-widest text-sm">
              Dhaamsa Pirezidaantii
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1628] dark:text-white mt-2">
              Pirezidaantii Mana Murtii Irraa
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 items-start">
            {/* Suuraa fi Maqaa */}
            <div className="flex flex-col items-center text-center">
              <div className="w-52 h-52 rounded-2xl overflow-hidden shadow-lg border-4 border-yellow-400 mb-5">
                <img
                  src={presidentImg}
                  alt="Obbo Guddinaa Fayyisaa"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="text-xl font-bold text-[#0a1628] dark:text-white">Obbo Guddinaa Fayyisaa</h3>
              <p className="text-yellow-600 font-medium text-sm mt-1">
                Pirezidaantii Mana Murtii Aanaa Sibu Siree
              </p>
              <div className="flex gap-1 mt-3">
                <span className="w-8 h-1 rounded-full bg-yellow-500" />
                <span className="w-3 h-1 rounded-full bg-yellow-300" />
                <span className="w-2 h-1 rounded-full bg-yellow-200" />
              </div>
            </div>

            {/* Dhaamsa */}
            <div className="md:col-span-2 relative">
              <div className="text-yellow-300 text-8xl font-serif leading-none absolute -top-4 -left-2 select-none">"</div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm relative z-10">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Ummata kabajamoo, Mana Murtii Aanaa Sibu Siree tajaajila seeraa haqa,
                  bilisummaa fi kabaja qabu kennuuf hundaa'e. Waggootaa hedduuf ummatni
                  aanaa keenyaa tajaajila seeraa argachuuf rakkoo fi yeroo dheeraa ture —
                  har'a garuu haalli jijjiirameera.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Bara kana keessa hojilee gurguddoo hedduu hojjechuun danda'ameera.
                  Galmeewwan dhaddachaa dijitaalaan qindaa'an, tajaajilli online jalqabame,
                  fi hojjettoonni ogummaa qaban muudamuun tajaajila seeraa haqa fi saffisaa
                  ta'e kennuuf kutannoo guutuu hojjechaa jirra.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Teknoolojii fayyadamuun ummata keenya quunnamuuf marsariitii kana
                  banneerra — kana irraa galmeewwan argachuu, beeksisa haaraa dubbisuu,
                  fi gaaffii dhiyeessuu dandeessu. Kuni tarkaanfii guddaa gara fuula duraatti.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                  Kaayyoon keenya tokko dha —{' '}
                  <span className="text-yellow-600 font-bold">
                    haqa ariifachiisuu, mirga namaa kabajuu, fi ummataaf banaa ta'uu.
                  </span>{' '}
                  Hojiin keenya hin dhaabbatu — borus caalaatti foyyeessuuf hojjechaa turra.
                </p>
                <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-600 flex items-center gap-4">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-[#0a1628] font-bold text-lg">⚖</div>
                  <div>
                    <p className="font-bold text-[#0a1628] dark:text-white text-sm">Obbo Guddinaa Fayyisaa</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">Pirezidaantii — Mana Murtii Aanaa Sibu Siree</p>
                  </div>
                </div>
              </div>
              <div className="text-yellow-300 text-8xl font-serif leading-none absolute -bottom-8 right-0 select-none rotate-180">"</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team Section ── */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-yellow-600 font-semibold uppercase tracking-widest text-sm">
              Hojjettootaa
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1628] dark:text-white mt-2">
              Gareen Keenya
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-md border border-gray-100 dark:border-gray-600 hover:shadow-xl hover:border-yellow-300 transition-all duration-300 p-6 text-center w-72">
              <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-4 border-4 border-yellow-400 shadow">
                <img src={wandimmuImg} alt="Wandimmuu Olumaa" className="w-full h-full object-cover object-top" />
              </div>
              <h3 className="text-lg font-bold text-[#0a1628] dark:text-white">Wandimmuu Olumaa</h3>
              <p className="text-yellow-600 font-medium text-sm mt-1">TQO — Teknoolojii Qunnamtii Odeeffannoo</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Kutaa IT</p>
              <div className="flex gap-1 justify-center mt-3">
                <span className="w-8 h-1 rounded-full bg-yellow-500" />
                <span className="w-3 h-1 rounded-full bg-yellow-300" />
                <span className="w-2 h-1 rounded-full bg-yellow-200" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
