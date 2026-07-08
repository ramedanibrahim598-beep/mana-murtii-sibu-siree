import { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const emptyForm = { name: '', email: '', subject: '', message: '' }

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
    <section id="contact" className="py-20 px-6 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-yellow-600 font-semibold uppercase tracking-widest text-sm">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a1628] dark:text-white mt-2">
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
                info: 'manamurtiiaanaasibuusiree2018@gmail.com',
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
                  <h4 className="font-semibold text-[#0a1628]">{item.title}</h4>
                  <p className="text-gray-600 text-sm whitespace-pre-line">{item.info}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-700 rounded-xl shadow p-8 space-y-4 border border-gray-100 dark:border-gray-600"
          >
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maqaa Guutuu
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Maqaa kee barreessi"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@fakkeenyaa.com"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mata-duree
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Dhimmaa ykn lakk. dhaddachaa"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ergaa
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Gaaffii ykn ergaa kee barreessi..."
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
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
