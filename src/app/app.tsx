import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import PillNav from './components/PillNav'

export function App() {
  return (
    <>
      <Router>
        <PillNav
          logo={'/mirai-logo.svg'}
          logoAlt="Mirai Logo"
          items={[
            { label: 'Início', href: '/' },
            { label: 'About', href: '#about' },
            { label: 'Team', href: '#integrants' },
            { label: 'Competition', href: '#competition' },
            { label: 'Timeline', href: '#timeline' },
            { label: 'Connect with us', href: '#contact' }
          ]}
          activeHref="/"
          className="custom-nav"
          ease="power2.easeOut"
          baseColor="#1a1a1a"
          pillColor="#ffffff"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#1a1a1a"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </>
  )
}
