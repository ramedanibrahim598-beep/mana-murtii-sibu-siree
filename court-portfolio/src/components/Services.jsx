const services = [
  {
    icon: '📄',
    title: 'Court Records',
    desc: 'Access and request official court documents, case files, and legal records for civil and criminal proceedings.',
  },
  {
    icon: '⚖️',
    title: 'Case Filing',
    desc: 'Submit and track new cases, motions, and legal filings through our streamlined intake process.',
  },
  {
    icon: '📅',
    title: 'Hearing Scheduling',
    desc: 'Schedule court hearings, check upcoming dates, and manage case calendars efficiently.',
  },
  {
    icon: '💳',
    title: 'Fine & Fee Payment',
    desc: 'Pay court-ordered fines, filing fees, and other charges securely in person or online.',
  },
  {
    icon: '🔍',
    title: 'Case Status Lookup',
    desc: 'Check the current status of ongoing cases, pending verdicts, and court decisions.',
  },
  {
    icon: '📋',
    title: 'Jury Services',
    desc: 'Manage jury duty summons, report for service, and access juror information and resources.',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <span className="text-yellow-600 font-semibold uppercase tracking-widest text-sm">
          What We Offer
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0a1628] mt-2 mb-12">
          Court Services
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-gray-50 rounded-xl p-6 text-left border border-gray-100 hover:shadow-lg hover:border-yellow-300 transition-all duration-200"
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-lg font-bold text-[#0a1628] mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
