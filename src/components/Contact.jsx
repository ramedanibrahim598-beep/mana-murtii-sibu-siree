import { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const emptyForm = { name: '', email: '', subject: '', message: '' }

const s = {
  textPrimary: { color: 'var(--text-primary)' },
  textSub: { color: 'var(--text-secondary)' },
  label: { color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '500' },
  input: {
    backgroundColor: 'var(--bg-card)',
    color: 'var(--text-primary)',
    borderColor: 'var(--border-color)',
  },
}

export default function Contact() {
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await addDoc(collection(db, 'messages'), {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        read: false,
        createdAt: serverTimestamp(),
      })
      setSuccess(true)
      setForm(emptyForm)
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      console.error(err)
      setError('Ergaan hin ergamne. Irra deebi\'ii yaalii.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-6 section-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-yellow-600 font-semibold uppercase tracking-widest text-sm">
            Nu Quunnamuuf
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2" style={s.textPrimary}>
            Nu Quunnamaa
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-6">
            {[
              {
                icon: '📍',
                title: 'Teessoo',
                info: 'Godina Wallagaa Bahaa, Aanaa Sibu Siree\nMagaalaa Siree',
              },
              {
                icon: '📞',
                title: 'Bilbila',
                info: '0984024074',
              },
              {
                icon: '✉️',
                title: 'Email',
                info: 'manamuriiaanaasibuusiree2018@gmail.com',
              },
              {
                icon: '🕒',
                title: 'Sa\'aatii Hojii',
                info: 'Wiixata – Jimaata: Sa\'a 2:30 – 11:30\nSanbata – Dilbata: Cufaa',
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 items-start">
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <h4 className="font-semibold text-sm" style={s.textPrimary}>{item.title}</h4>
                  <p className="text-sm whitespace-pre-line mt-0.5" style={s.textSub}>{item.info}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="contact-form card rounded-xl shadow p-8 space-y-4 border">
            {/* Success */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3 flex items-center gap-2">
                <span>✅</span>
                <span>Ergaan si milkaa'inaan ergame! Galatoomaa.</span>
              </div>
            )}
            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <div>
              <label className="block mb-1" style={s.label}>Maqaa Guutuu</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Maqaa kee barreessi"
                required
                className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                style={s.input}
              />
            </div>

            <div>
              <label className="block mb-1" style={s.label}>Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@fakkeenyaa.com"
                required
                className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                style={s.input}
              />
            </div>

            <div>
              <label className="block mb-1" style={s.label}>Mata-duree</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Dhimmaa ykn lakk. dhaddachaa"
                required
                className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                style={s.input}
              />
            </div>

            <div>
              <label className="block mb-1" style={s.label}>Ergaa</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Gaaffii ykn ergaa kee barreessi..."
                required
                className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                style={s.input}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:opacity-60 text-[#0a1628] font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              {loading ? 'Ergaa jira...' : 'Ergaa Ergi'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
