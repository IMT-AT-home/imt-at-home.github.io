import { AiOutlineTeam } from 'react-icons/ai'
import { BiBook } from 'react-icons/bi'
import { useTheme } from '../hooks/use-theme'
import { FiGithub } from 'react-icons/fi'
import { GoTrophy } from 'react-icons/go'
import { FiVideo } from 'react-icons/fi'
import { MdTimeline } from 'react-icons/md'
import { MdContactMail } from 'react-icons/md'
import { HiMenu, HiX } from 'react-icons/hi'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

export function Navbar() {
  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const location = useLocation()
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const handleSectionClick = (sectionId: string) => {
    setIsOpen(false) // Close menu after selection
    
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`
      return
    }
    
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Desktop Navbar - hidden on mobile */}
      <div
        style={{
          backgroundColor:
            theme === 'light'
              ? 'rgba(255, 255, 255, 0.9)'
              : 'rgba(10, 10, 10, 0.9)',
          color: theme === 'light' ? 'black' : 'white'
        }}
        className={`fixed bottom-1/2 right-4 z-50 hidden translate-y-1/2 flex-col items-center gap-2 rounded-2xl p-3 shadow-lg backdrop-blur-md transition-all duration-300 sm:flex ${
          isExpanded ? 'w-48' : 'w-auto'
        } sm:min-h-[280px]`}
      >
        <div className="flex items-center gap-2 mb-1">
          <img
            src="/robot.svg"
            alt="Robot Icon"
            className="h-8 w-8"
          />
          {isExpanded && (
            <span className="text-sm font-semibold whitespace-nowrap">Mirai Robot</span>
          )}
        </div>
        
        <button
          onClick={toggleExpanded}
          className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors mb-2"
        >
          {isExpanded ? '← Collapse' : '→ Expand'}
        </button>
        
        {/* First group - Main content */}
        <div className="flex flex-col items-center gap-2 w-full">
          <a
            href="#about"
            className={`cursor-pointer transition-colors hover:text-blue-500 ${
              isExpanded ? 'flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800' : ''
            }`}
            onClick={(e) => {
              e.preventDefault()
              handleSectionClick('about')
            }}
          >
            <BiBook className="text-xl" />
            {isExpanded && <span className="text-sm">About Project</span>}
          </a>
          <a
            href="#integrants"
            className={`cursor-pointer transition-colors hover:text-blue-500 ${
              isExpanded ? 'flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800' : ''
            }`}
            onClick={(e) => {
              e.preventDefault()
              handleSectionClick('integrants')
            }}
          >
            <AiOutlineTeam className="text-xl" />
            {isExpanded && <span className="text-sm">Team</span>}
          </a>
          <a
            href="#competition"
            className={`cursor-pointer transition-colors hover:text-blue-500 ${
              isExpanded ? 'flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800' : ''
            }`}
            onClick={(e) => {
              e.preventDefault()
              handleSectionClick('competition')
            }}
          >
            <GoTrophy className="text-xl" />
            {isExpanded && <span className="text-sm">Competition</span>}
          </a>
          <a
            href="#videos"
            className={`cursor-pointer transition-colors hover:text-blue-500 ${
              isExpanded ? 'flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800' : ''
            }`}
            onClick={(e) => {
              e.preventDefault()
              handleSectionClick('videos')
            }}
          >
            <FiVideo className="text-xl" />
            {isExpanded && <span className="text-sm">Videos</span>}
          </a>

          <a
            href="#timeline"
            className={`cursor-pointer transition-colors hover:text-blue-500 ${
              isExpanded ? 'flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800' : ''
            }`}
            onClick={(e) => {
              e.preventDefault()
              handleSectionClick('timeline')
            }}
          >
            <MdTimeline className="text-xl" />
            {isExpanded && <span className="text-sm">Timeline</span>}
          </a>
        </div>
                
        {/* Another separator */}
        <div className={`${isExpanded ? 'w-full' : 'w-6'} h-px bg-gray-300 dark:bg-gray-600 my-1 transition-all duration-300`}></div>
        
        {/* Third group - Contact & External */}
        <div className="flex flex-col items-center gap-2 w-full">
          <a
            href="#contact"
            className={`cursor-pointer transition-colors hover:text-blue-500 ${
              isExpanded ? 'flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800' : ''
            }`}
            onClick={(e) => {
              e.preventDefault()
              handleSectionClick('contact')
            }}
          >
            <MdContactMail className="text-xl" />
            {isExpanded && <span className="text-sm">Contact</span>}
          </a>
          <a
            href="https://github.com/IMT-AT-home/athome"
            target="_blank"
            rel="noreferrer"
            className={`cursor-pointer transition-colors hover:text-blue-500 ${
              isExpanded ? 'flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800' : ''
            }`}
          >
            <FiGithub className="text-xl" />
            {isExpanded && <span className="text-sm">GitHub</span>}
          </a>
        </div>      
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        style={{
          backgroundColor:
            theme === 'light'
              ? 'rgba(255, 255, 255, 0.9)'
              : 'rgba(10, 10, 10, 0.9)',
          color: theme === 'light' ? 'black' : 'white'
        }}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg backdrop-blur-md transition-all hover:scale-105 sm:hidden"
      >
        {isOpen ? <HiX className="text-xl" /> : <HiMenu className="text-xl" />}
      </button>

      {/* Mobile Expanded Menu */}
      {isOpen && (
        <div
          style={{
            backgroundColor:
              theme === 'light'
                ? 'rgba(255, 255, 255, 0.95)'
                : 'rgba(10, 10, 10, 0.95)',
            color: theme === 'light' ? 'black' : 'white'
          }}
          className="fixed bottom-20 right-4 z-40 w-56 rounded-2xl p-4 shadow-xl backdrop-blur-md sm:hidden"
        >
          <div className="space-y-3">
            <div className="text-center">
              <img
                src="/robot.svg"
                alt="Robot Icon"
                className="mx-auto h-8 w-8 mb-2"
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">Navigate to:</div>
            </div>
            
            {/* Menu Items */}
            <div className="space-y-2">
              
              <button
                onClick={() => handleSectionClick('about')}
                className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <BiBook className="text-lg" />
                <span className="text-sm">About Project</span>
              </button>
              
              <button
                onClick={() => handleSectionClick('integrants')}
                className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <AiOutlineTeam className="text-lg" />
                <span className="text-sm">Team</span>
              </button>
              
              <button
                onClick={() => handleSectionClick('competition')}
                className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <GoTrophy className="text-lg" />
                <span className="text-sm">Competition</span>
              </button>
              
              <button
                onClick={() => handleSectionClick('videos')}
                className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FiVideo className="text-lg" />
                <span className="text-sm">Videos</span>
              </button>
              <button
                onClick={() => handleSectionClick('timeline')}
                className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <MdTimeline className="text-lg" />
                <span className="text-sm">Timeline</span>
              </button>

              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
              
              <button
                onClick={() => handleSectionClick('contact')}
                className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <MdContactMail className="text-lg" />
                <span className="text-sm">Contact</span>
              </button>
              <a
                href="https://github.com/IMT-AT-home/athome"
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsOpen(false)}
              >
                <FiGithub className="text-lg" />
                <span className="text-sm">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Overlay for mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
