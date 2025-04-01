import { AiOutlineTeam } from 'react-icons/ai'
import { BiBook } from 'react-icons/bi'
import { useTheme } from '../hooks/use-theme'
import { FiGithub } from 'react-icons/fi'
import { GoTrophy } from 'react-icons/go'
import { FiVideo } from 'react-icons/fi'

export function Navbar() {
  const { theme } = useTheme()

  return (
    <div
      style={{
        backgroundColor:
          theme === 'light'
            ? 'rgba(255, 255, 255, 0.8)'
            : 'rgba(10, 10, 10, 0.8)',
        color: theme === 'light' ? 'black' : 'white'
      }}
      className="fixed bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-row items-center justify-center gap-3 rounded-2xl p-3 shadow-lg backdrop-blur-md sm:bottom-1/2 sm:left-4 sm:min-h-[150px] sm:translate-x-0 sm:translate-y-1/2 sm:flex-col sm:gap-6 sm:p-4"
    >
      <img
        src="/robot.svg"
        alt="Robot Icon"
        className="h-8 w-8 sm:h-10 sm:w-10"
      />
      <div className="flex flex-row items-center gap-3 text-lg sm:flex-col sm:gap-4">
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
          <BiBook className="text-xl sm:text-2xl" />
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
          <AiOutlineTeam className="text-xl sm:text-2xl" />
        </a>
      </div>
      <div className="flex flex-row items-center gap-3 text-lg sm:flex-col sm:gap-4 sm:text-xl">
        <a
          href="#competition"
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault()
            document
              .getElementById('competition')
              ?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <GoTrophy />
        </a>
      </div>
      <div className="flex flex-row items-center gap-3 text-lg sm:flex-col sm:gap-4 sm:text-xl">
        <a
          href="#videos"
          target="_blank"
          rel="noreferrer"
          onClick={(e) => {
            e.preventDefault()
            document
              .getElementById('videos')
              ?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <FiVideo />
        </a>
      </div>
      <div className="flex flex-row items-center gap-3 text-lg sm:flex-col sm:gap-4 sm:text-xl">
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
