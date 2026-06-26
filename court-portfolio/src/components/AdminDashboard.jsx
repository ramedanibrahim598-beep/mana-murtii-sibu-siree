import { useState, useEffect } from 'react'
import { db, auth } from '../firebase'
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { signOut } from 'firebase/auth'

const ICONS = ['📢', '📅', '🏆', '🔔', '🏛️', '🖥️', '📄', '⚖️', '👤', '📋', '💼', '📝']
const CATEGORIES = ['Beeksisa', 'Oduu', 'Hojii']

const emptyForm = {
  title: '',
  body: '',
  category: 'Beeksisa',
  icon: '📢',
  date: new Date().toLocaleDateString('om-ET'),
  formLink: '',
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('news')

  // --- News state ---
  const [news, setNews] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [newsLoading, setNewsLoading] = useState(false)
  const [newsFetch, setNewsFetch] = useState(true)
  const [newsDeleteConfirm, setNewsDeleteConfirm] = useState(null)

  // --- Messages state ---
  const [messages, setMessages] = useState([])
  const [msgFetch, setMsgFetch] = useState(true)
  const [msgDeleteConfirm, setMsgDeleteConfirm] = useState(null)
  const [openMsg, setOpenMsg] = useState(null)
  const [unreadCount, setUnreadCount] = useState(0)

  const [successMsg, setSuccessMsg] = useState('')

  const showSuccess = (msg) => {
    setSuccessMsg(msg)
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  // ─── Fetch News ───────────────────────────────────────────────
  const fetchNews = async () => {
    setNewsFetch(true)
    try {
      const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      setNews(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    } catch (err) {
      console.error(err)
    } finally {
      setNewsFetch(false)
    }
  }

  // ─── Fetch Messages ───────────────────────────────────────────
  const fetchMessages = async () => {
    setMsgFetch(true)
    try {
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      setMessages(data)
      setUnreadCount(data.filter((m) => !m.read).length)
    } catch (err) {
      console.error(err)
    } finally {
      setMsgFetch(false)
    }
  }

  useEffect(() => {
    fetchNews()
    fetchMessages()
  }, [])

  // ─── News CRUD ────────────────────────────────────────────────
  const handleNewsSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.body.trim()) return
    setNewsLoading(true)
    try {
      if (editId) {
        await updateDoc(doc(db, 'news', editId), {
          title: form.title,
          body: form.body,
          category: form.category,
          icon: form.icon,
          date: form.date,
          formLink: form.formLink || '',
        })
        showSuccess('Oduu jijjiiramte! ✅')
        setEditId(null)
      } else {
        await addDoc(collection(db, 'news'), {
          ...form,
          createdAt: serverTimestamp(),
        })
        showSuccess('Oduu haaraan dabalame! ✅')
      }
      setForm(emptyForm)
      fetchNews()
    } catch (err) {
      console.error(err)
    } finally {
      setNewsLoading(false)
    }
  }

  const handleNewsEdit = (item) => {
    setEditId(item.id)
    setForm({
      title: item.title,
      body: item.body,
      category: item.category,
      icon: item.icon || '📢',
      date: item.date,
      formLink: item.formLink || '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNewsDelete = async (id) => {
    await deleteDoc(doc(db, 'news', id))
    showSuccess('Oduu haaqame! ✅')
    setNewsDeleteConfirm(null)
    fetchNews()
  }

  // ─── Messages ─────────────────────────────────────────────────
  const handleOpenMsg = async (msg) => {
    setOpenMsg(msg)
    if (!msg.read) {
      await updateDoc(doc(db, 'messages', msg.id), { read: true })
      fetchMessages()
    }
  }

  const handleMsgDelete = async (id) => {
    await deleteDoc(doc(db, 'messages', id))
    showSuccess('Ergaan haaqame! ✅')
    setMsgDeleteConfirm(null)
    setOpenMsg(null)
    fetchMessages()
  }

  const handleLogout = async () => {
    await signOut(auth)
    window.location.href = '/'
  }

  // ─── UI ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top bar */}
      <nav className="bg-[#0a1628] text-white px-6 py-4 flex items-center justify-between shadow">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚖️</span>
          <div>
            <p className="font-bold text-sm">Admin Dashboard</p>
            <p className="text-gray-400 text-xs">Mana Murtii Aanaa Sibu Siree</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-sm text-gray-300 hover:text-yellow-400 transition-colors">
            🌐 Website
          </a>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-400 text-white text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Bahi
          </button>
        </div>
      </nav>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="max-w-5xl mx-auto flex gap-1">
          <button
            onClick={() => setActiveTab('news')}
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'news'
                ? 'border-yellow-500 text-yellow-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            📰 Oduu &amp; Beeksisa
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'messages'
                ? 'border-yellow-500 text-yellow-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            ✉️ Ergaalee
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

        {/* Success message */}
        {successMsg && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-medium">
            {successMsg}
          </div>
        )}

        {/* ══════════════ NEWS TAB ══════════════ */}
        {activeTab === 'news' && (
          <>
            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-[#0a1628] mb-6">
                {editId ? '✏️ Oduu Jijjiiri' : '➕ Oduu Haaraa Dabaluu'}
              </h2>
              <form onSubmit={handleNewsSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mata-duree *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Mata-duree oduu barreessi..."
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qabiyyee *</label>
                  <textarea
                    value={form.body}
                    onChange={(e) => setForm({ ...form, body: e.target.value })}
                    placeholder="Oduu guutuu barreessi..."
                    required
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                  />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gosa</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Guyyaa</label>
                    <input
                      type="text"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      placeholder="Onkololeessa 10, 2017"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                    <div className="flex gap-2 flex-wrap border border-gray-300 rounded-lg px-3 py-2">
                      {ICONS.map((ic) => (
                        <button
                          key={ic}
                          type="button"
                          onClick={() => setForm({ ...form, icon: ic })}
                          className={`text-xl rounded p-0.5 transition ${
                            form.icon === ic ? 'bg-yellow-100 ring-2 ring-yellow-400' : 'hover:bg-gray-100'
                          }`}
                        >
                          {ic}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Google Form Link - Hojii category qofa */}
                {form.category === 'Hojii' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      🔗 Google Form Link (Register Link)
                    </label>
                    <input
                      type="url"
                      value={form.formLink}
                      onChange={(e) => setForm({ ...form, formLink: e.target.value })}
                      placeholder="https://forms.gle/..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Namni beeksisa argate "Register" cuqaasee directly form kanaatti deema.
                    </p>
                  </div>
                )}
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={newsLoading}
                    className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-60 text-[#0a1628] font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
                  >
                    {newsLoading ? 'Kuusaa jira...' : editId ? 'Jijjiiri' : 'Dabaluu'}
                  </button>
                  {editId && (
                    <button
                      type="button"
                      onClick={() => { setEditId(null); setForm(emptyForm) }}
                      className="border border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-500 px-6 py-2.5 rounded-lg transition-colors text-sm"
                    >
                      Dhiisi
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* News list */}
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-[#0a1628] mb-6">📋 Oduu Jiran ({news.length})</h2>
              {newsFetch && <p className="text-gray-400 text-sm text-center py-8">Fe'aa jira...</p>}
              {!newsFetch && news.length === 0 && (
                <p className="text-gray-400 text-sm text-center py-8">Ammallee oduu hin jiru.</p>
              )}
              <div className="space-y-4">
                {news.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-100 rounded-xl p-4 flex items-start justify-between gap-4 hover:border-yellow-200 transition-colors"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <span className="text-2xl">{item.icon || '📢'}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            item.category === 'Beeksisa' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {item.category}
                          </span>
                          <span className="text-xs text-gray-400">{item.date}</span>
                        </div>
                        <h3 className="font-semibold text-[#0a1628] text-sm">{item.title}</h3>
                        <p className="text-gray-500 text-xs mt-1 line-clamp-2">{item.body}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => handleNewsEdit(item)}
                        className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded-lg transition-colors font-medium"
                      >
                        Jijjiiri
                      </button>
                      {newsDeleteConfirm === item.id ? (
                        <div className="flex gap-1">
                          <button onClick={() => handleNewsDelete(item.id)} className="text-xs bg-red-500 hover:bg-red-400 text-white px-3 py-1.5 rounded-lg font-medium">Eeyyee</button>
                          <button onClick={() => setNewsDeleteConfirm(null)} className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg font-medium">Lakkii</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setNewsDeleteConfirm(item.id)}
                          className="text-xs bg-red-50 hover:bg-red-100 text-red-500 px-3 py-1.5 rounded-lg transition-colors font-medium"
                        >
                          Haaqii
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ══════════════ MESSAGES TAB ══════════════ */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-[#0a1628]">
                ✉️ Ergaalee ({messages.length})
                {unreadCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-semibold">
                    {unreadCount} haaraa
                  </span>
                )}
              </h2>
            </div>

            {msgFetch && <p className="text-gray-400 text-sm text-center py-12">Fe'aa jira...</p>}
            {!msgFetch && messages.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-12">Ammallee ergaa hin jiru.</p>
            )}

            <div className="divide-y divide-gray-100">
              {messages.map((msg) => (
                <div key={msg.id}>
                  {/* Row */}
                  <div
                    onClick={() => setOpenMsg(openMsg?.id === msg.id ? null : msg)}
                    className={`flex items-start gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      !msg.read ? 'bg-yellow-50' : ''
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${!msg.read ? 'bg-yellow-500' : 'bg-gray-200'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className={`text-sm font-semibold text-[#0a1628] ${!msg.read ? 'font-bold' : ''}`}>
                          {msg.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          {msg.createdAt?.toDate
                            ? msg.createdAt.toDate().toLocaleString('om-ET')
                            : '—'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{msg.email}</p>
                      <p className="text-sm text-gray-600 mt-1 truncate">{msg.subject}</p>
                    </div>
                    <span className="text-gray-400 text-sm shrink-0">
                      {openMsg?.id === msg.id ? '▲' : '▼'}
                    </span>
                  </div>

                  {/* Expanded view */}
                  {openMsg?.id === msg.id && (
                    <div className="px-6 pb-6 bg-gray-50 border-t border-gray-100">
                      <div className="bg-white rounded-xl p-5 mt-4 border border-gray-200 space-y-3">
                        <div className="grid sm:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-400 text-xs uppercase font-medium">Maqaa</span>
                            <p className="text-[#0a1628] font-semibold">{msg.name}</p>
                          </div>
                          <div>
                            <span className="text-gray-400 text-xs uppercase font-medium">Email</span>
                            <p className="text-[#0a1628]">{msg.email}</p>
                          </div>
                          <div className="sm:col-span-2">
                            <span className="text-gray-400 text-xs uppercase font-medium">Mata-duree</span>
                            <p className="text-[#0a1628] font-semibold">{msg.subject}</p>
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-400 text-xs uppercase font-medium">Ergaa</span>
                          <p className="text-gray-700 text-sm mt-1 leading-relaxed whitespace-pre-wrap">
                            {msg.message}
                          </p>
                        </div>
                        <div className="pt-2 flex gap-3">
                          <a
                            href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                            className="text-sm bg-yellow-500 hover:bg-yellow-400 text-[#0a1628] font-semibold px-4 py-2 rounded-lg transition-colors"
                          >
                            📧 Deebii Ergi
                          </a>
                          {msgDeleteConfirm === msg.id ? (
                            <div className="flex gap-2">
                              <button onClick={() => handleMsgDelete(msg.id)} className="text-sm bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg font-medium">Eeyyee Haaqii</button>
                              <button onClick={() => setMsgDeleteConfirm(null)} className="text-sm bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-medium">Lakkii</button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setMsgDeleteConfirm(msg.id)}
                              className="text-sm bg-red-50 hover:bg-red-100 text-red-500 px-4 py-2 rounded-lg transition-colors font-medium"
                            >
                              🗑️ Haaqii
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
