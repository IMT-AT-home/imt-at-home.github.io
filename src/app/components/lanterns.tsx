import { motion } from 'framer-motion'
import LanternSVG from '../components/paper-lantern-svgrepo-com.svg'
import { useTheme } from '../hooks/use-theme'

const Lanterns = () => {
  const { theme } = useTheme()

  const getRandomPosition = (min: number, max: number) => {
    return Math.random() * (max - min) + min
  }

  const lanterns = Array.from({ length: 10 }, (_, id) => ({
    id,
    x: getRandomPosition(0, window.innerWidth - 80),
    y: getRandomPosition(0, window.innerHeight - 120),
    delay: Math.random() * 5
  }))

  const getLanternaColor = () => {
    return theme === 'light'
      ? 'brightness(1) invert(0)'
      : 'brightness(0) invert(1)'
  }

  return (
    <div
      className="lanterna-container"
      style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden'
      }}
    >
      {lanterns.map((lanterna) => (
        <motion.div
          key={lanterna.id}
          className="lanterna"
          style={{
            position: 'absolute',
            left: `${lanterna.x}px`,
            top: `${lanterna.y}px`,
            width: '80px',
            height: '120px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          animate={{
            y: ['100%', '-100%'],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 12,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 10,
            delay: lanterna.delay
          }}
        >
          <motion.img
            src={LanternSVG}
            alt="Lantern"
            className="lanterna-svg"
            style={{ filter: getLanternaColor() }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default Lanterns
