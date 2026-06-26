import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

const ITEMS_PER_PAGE = 3

export default function News() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState('Hunda')

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'))
        const snapshot = await getDocs(q)
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setAnnouncements(data)
      } catch (err) {
        console.error('Oduu fudhatuu dadhabame:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  const categories = ['Hunda', 'Beeksisa', 'Oduu', 'Hojii']

  const filtered =
    filter === 'Hunda'
      ? announcements
      : announcements.filter((a) => a.category === filter)

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const handleFilter = (cat) => {
    setFilter(cat)
    setPage(1)
  }

  const categoryColor = (cat) => {
    if (cat === 'Beeksisa') return 'bg-yellow-100 text-yellow-700'
    if (cat === 'Oduu') return 'bg-blue-100 text-blue-700'
    if (cat === 'Hojii') return 'bg-green-100 text-green-700'
    return 'bg-gray-100 text-gray-700'
  }

  return (
    <section id="news" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-yellow-600 font-semibold uppercase tracking-widest text-sm">
            Oduu &amp; Beeksisa
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a1628] mt-2 mb-4">
            Waan Haaraa
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Oduu, beeksisa, fi jijjiirama haaraa mana murtii aanaa Sibu Siree irraa.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                filter === cat
                  ? 'bg-yellow-500 border-yellow-500 text-[#0a1628]'
                  : 'border-gray-300 text-gray-600 hover:border-yellow-400 hover:text-yellow-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3 animate-pulse">📰</div>
            <p>Oduu fe'aa jira...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">📭</div>
            <p>Yeroo ammaa oduu hin jiru.</p>
          </div>
        )}

        {/* Cards grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginated.map((item) => (
              <article
                key={item.id}
                className="bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg hover:border-yellow-300 transition-all duration-200 flex flex-col"
              >
                <div className="h-1 rounded-t-xl bg-yellow-400" />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColor(item.category)}`}>
                      {item.category}
                    </span>
                    <span className="text-2xl">{item.icon || '📢'}</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{item.date}</p>
                  <h3 className="text-base font-bold text-[#0a1628] mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">{item.body}</p>
                  {/* Hojii beeksisa — Register button */}
                  {item.category === 'Hojii' && item.formLink && (
                    <a
                      href={item.formLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      📝 Amma Register Godhuu
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-600 hover:border-yellow-400 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              ← Dura
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                  page === p
                    ? 'bg-yellow-500 border-yellow-500 text-[#0a1628]'
                    : 'border-gray-300 text-gray-600 hover:border-yellow-400'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-600 hover:border-yellow-400 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Itti →
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
