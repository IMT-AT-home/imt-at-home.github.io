import { AiOutlineTeam, AiOutlineMail } from 'react-icons/ai'
import { BiBook, BiUser } from 'react-icons/bi'
import { useTheme } from '../hooks/use-theme'
import { FiGithub } from 'react-icons/fi'

export function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div
      style={{
        backgroundColor:
          theme === 'light'
            ? 'rgba(255, 255, 255, 0.8)'
            : 'rgba(10, 10, 10, 0.8)',
        color: theme === 'light' ? 'black' : 'white'
      }}
      className="fixed left-4 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-6 rounded-2xl p-4 shadow-lg backdrop-blur-md"
    >
      <img src="/robot.svg" alt="Robot Icon" className="h-10 w-10" />
      <div className="flex flex-col items-center gap-4 text-lg">
        <a
          href="#about"
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault()
            document
              .getElementById('about')
              ?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <BiBook className="text-2xl" />
        </a>
        <a
          href="#integrants"
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault()
            document
              .getElementById('integrants')
              ?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <AiOutlineTeam className="text-2xl" />
        </a>
      </div>
      <div className="flex flex-col items-center gap-4 text-xl">
        <a
          href="https://github.com/IMT-AT-home/athome"
          target="_blank"
          rel="noreferrer"
        >
          <FiGithub />
        </a>
      </div>
    </div>
  )
}
