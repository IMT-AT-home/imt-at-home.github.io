import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { useTheme } from '../hooks/use-theme'
import { useEffect, useState } from 'react'

type SocialsCardProps = {
  info: {
    title: string
    type: string
    link: string
  }
  delay: number
}

const socialsIcons: Record<string, JSX.Element> = {
  github: <FaGithub className="text-2xl text-gray-800" />,
  linkedin: <FaLinkedin className="text-2xl text-blue-800" />,
  instagram: <FaInstagram className="text-2xl text-red-800" />,
  email: <FaEnvelope className="text-2xl text-blue-800" />
}

export function SocialsCard({ info, delay }: SocialsCardProps) {
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
      className={`flex cursor-pointer flex-row items-center justify-center rounded-lg p-4 drop-shadow-md transition-all duration-100 md:p-6 ${fade ? 'opacity-100' : 'opacity-0'} hover:scale-105 hover:shadow-lg`}
    >
      <h2 className="font-bold">{info.title}</h2>
      <div className="ml-2 flex items-center">
        {info.type && socialsIcons[info.type]}
      </div>
    </div>
  )
}
