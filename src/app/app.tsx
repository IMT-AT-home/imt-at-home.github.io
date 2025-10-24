import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import PillNav from './components/PillNav'
import { Language, translations } from './pages/home'

export function App() {
  // Initialize language from localStorage if present, otherwise default to Portuguese
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('imt_language')
      if (stored === 'en' || stored === 'pt') return stored as Language
    } catch (e) {
      // ignore localStorage errors
    }
    return 'pt'
  })

  useEffect(() => {
    try {
      localStorage.setItem('imt_language', language)
    } catch (e) {
      // ignore localStorage errors in restrictive environments
    }
  }, [language])

  const t = translations[language]

  return (
    <>
      <Router>
        <PillNav
          logo={'/mirai-logo.svg'}
          logoAlt="Mirai Logo"
          items={[
            { label: t.navbar.home, href: '/' },
            { label: t.navbar.about, href: '#about' },
            { label: t.navbar.team, href: '#integrants' },
            { label: t.navbar.competition, href: '#competition' },
            { label: t.navbar.demoSchedule, href: '#demo-schedule' },
            { label: t.navbar.timeline, href: '#timeline' },
            { label: t.navbar.contact, href: '#contact' }
          ]}
          activeHref="/"
          className="custom-nav"
          ease="power2.easeOut"
          baseColor="#1a1a1a"
          pillColor="#ffffff"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#1a1a1a"
          language={language}
          setLanguage={setLanguage}
        />
        <Routes>
          <Route
            path="/"
            element={<Home language={language} setLanguage={setLanguage} />}
          />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </>
  )
}
