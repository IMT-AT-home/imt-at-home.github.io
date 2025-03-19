import { useTheme } from '../hooks/use-theme'
import { useEffect, useState } from 'react'
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiC,
  SiReact
} from 'react-icons/si'

import { FaJava } from 'react-icons/fa'

type InfoCardProps = {
  info: {
    title: string
    description: string | null
    link: string
    languages: string[]
  }
  delay: number
}

const languageIcons: Record<string, JSX.Element> = {
  javascript: <SiJavascript className="text-2xl text-yellow-500" />,
  typescript: <SiTypescript className="text-2xl text-blue-600" />,
  python: <SiPython className="text-2xl text-green-500" />,
  c: <SiC className="text-2xl text-blue-700" />,
  react: <SiReact className="text-2xl text-blue-500" />,
  java: <FaJava className="text-2xl text-red-500" />
}

export function InfoCard({ info, delay }: InfoCardProps) {
  const { theme } = useTheme()
  const [fade, setFade] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true)
    }, 100)
    return () => clearTimeout(timer) // Limpa o timeout ao desmontar
  }, [])

  const goToLink = (link: string) => () => {
    window.location.href = link
  }

  return (
    <div
      style={{
        backgroundColor:
          theme === 'light' ? 'rgba(255, 255, 255, 1)' : 'rgba(30, 30, 30, 1)',
        color: theme === 'light' ? 'black' : 'white',
        transitionDelay: `${delay * 100 + 200}ms`
      }}
      onClick={goToLink(info.link)}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-md p-4 drop-shadow-md transition-all duration-1000 md:p-6 ${fade ? 'opacity-100' : 'opacity-0'} hover:scale-105 hover:shadow-lg`}
    >
      <h2 className="font-bold">{info.title}</h2>
      {info.description && <p className="mt-2">{info.description}</p>}
      <div className="mt-2 flex items-center">
        {info.languages.map((language) => (
          <div key={language} className="mr-2">
            {languageIcons[language]}
          </div>
        ))}
      </div>
    </div>
  )
}
