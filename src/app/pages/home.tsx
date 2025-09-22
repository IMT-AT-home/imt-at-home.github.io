import { useEffect, useState } from 'react'
import { useTheme } from '../hooks/use-theme'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FiGithub } from 'react-icons/fi'
import { GoTrophy } from 'react-icons/go'
import gsap from 'gsap'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Integrant = {
  name: string
  position: string
  img: string
  bio: string
  link: string
}

const integrants: Integrant[] = [
  {
    name: 'Pedro Matumoto',
    position: 'Responsible for Software',
    img: 'https://avatars.githubusercontent.com/u/85521574?v=4',
    bio: 'Responsible for the ROS2 integration, Audio processing, Conversational AI, Navigation, Autonomous movement, Computer vision and the overall software architecture.',
    link: 'https://www.linkedin.com/in/pedromatumoto/'
  },
  {
    name: 'Pedro Bauke',
    position: 'Responsible for Software',
    img: 'profile_photos/bauke.jpeg',
    bio: 'Responsible for the ROS2 integration, Navigation, Autonomous movement and the overall software architecture.',
    link: 'https://www.linkedin.com/in/pedro-bauke-b1284a30b/'
  },
  {
    name: 'Aline Nunes',
    position: 'Responsible for Eletronics',
    img: 'profile_photos/aline.jpeg',
    bio: 'Responsible for the electronics, arm control and overall control-related tasks of the robot.',
    link: 'https://www.linkedin.com/in/alinenuneswatanabe/'
  },
  {
    name: 'Eliana So',
    position: 'Responsible for Mechanics',
    img: 'profile_photos/eliana.jpeg',
    bio: 'Responsible for the mechanical design of the robot and 3D modeling, as well as Navigation and Autonomous movement.',
    link: 'https://www.linkedin.com/in/eliana-so/'
  },
  {
    name: 'Erick Wu',
    position: 'Responsible for Mechanics',
    img: 'profile_photos/erick.jpeg',
    bio: 'Responsible for the arm modeling and control and arm-related tasks.',
    link: 'https://www.linkedin.com/in/erick-wu-a19368209/'
  },
  {
    name: 'Anderson Harayashiki',
    position: 'Professor Adviser',
    img: 'profile_photos/anderson.jpeg',
    bio: 'Responsible for the guidance and overall project management, as well as the integration of the different areas of the project and techinical support.',
    link: 'https://www.linkedin.com/in/andersonhm/'
  },
  {
    name: 'Maicon Koji',
    position: 'Responsible for Mechanics',
    img: 'profile_photos/maicon.jpeg',
    bio: 'Responsible for the mechanical design of the robot and 3D modeling.',
    link: 'https://www.linkedin.com/in/maicon-koji-778183207/'
  }
]

export function Home() {
  const { theme } = useTheme()
  const [fade, setFade] = useState(false)
  const [showFullText, setShowFullText] = useState(false)
  const [showFullTextAbtComp, setShowFullTextAbtComp] = useState(false)
  const [currentGifIndex, setCurrentGifIndex] = useState(0)
  const [gifOpacity, setGifOpacity] = useState(1)

  // Array de GIFs disponíveis
  const miraiGifs = [
    '/gifs/Mirai_Idle.gif',
    '/gifs/Mirai_Listening.gif',
    '/gifs/Mirai_Thinking.gif',
    '/gifs/Mirai_Working.gif',
    '/gifs/Mirai_Talking.gif',
    '/gifs/Mirai_organizing.gif',
    '/gifs/Mirai_Shopping.gif'
  ]

  const handleToggleText = () => {
    setShowFullText((prevState) => !prevState)
  }

  const handleToggleTextAbtComp = () => {
    setShowFullTextAbtComp((prevState) => !prevState)
  }

  useEffect(() => {
    // Animações iniciais com GSAP
    const tl = gsap.timeline()

    tl.fromTo(
      '.hero-gif',
      { scale: 0.8, opacity: 0, rotateY: -10 },
      { scale: 1, opacity: 1, rotateY: 0, duration: 1.2, ease: 'back.out(1.7)' }
    )
      .fromTo(
        '.hero-title',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo(
        '.hero-button',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )

    // Animação flutuante sutil para o GIF
    gsap.to('.hero-gif', {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    })

    setTimeout(() => {
      setFade(true)
    }, 100)
  }, [])

  // Rotação automática de GIFs com transição suave
  useEffect(() => {
    const interval = setInterval(() => {
      // Inicia o fade out
      setGifOpacity(0)

      // Após a animação de fade out (300ms), muda o GIF e inicia fade in
      setTimeout(() => {
        setCurrentGifIndex((prevIndex) =>
          prevIndex === miraiGifs.length - 1 ? 0 : prevIndex + 1
        )
        // Pequeno delay para garantir que a imagem mudou antes do fade in
        setTimeout(() => {
          setGifOpacity(1)
        }, 50)
      }, 300)
    }, 4000)

    return () => clearInterval(interval)
  }, [])
  return (
    <main
      style={{
        backgroundColor:
          theme === 'light' ? 'rgba(255, 255, 255, 1)' : 'rgba(10, 10, 10, 1)',
        color: theme === 'light' ? 'black' : 'white',
        overflowX: 'hidden'
      }}
    >
      {/* Hero Section com gradiente sutil */}
      <div className="relative flex min-h-screen w-full items-center justify-center">
        {/* Gradiente de fundo sutil */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              theme === 'light'
                ? 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.05) 50%, transparent 70%)'
                : 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.1) 50%, transparent 70%)'
          }}
        />

        {/* Elementos decorativos flutuantes */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute left-1/4 top-1/4 h-2 w-2 rounded-full bg-blue-400 opacity-60"
            style={{
              animation: 'float 6s ease-in-out infinite'
            }}
          />
          <div
            className="absolute right-1/3 top-1/3 h-1 w-1 rounded-full bg-purple-400 opacity-60"
            style={{
              animation: 'float 4s ease-in-out infinite reverse'
            }}
          />
          <div
            className="absolute bottom-1/3 left-1/3 h-1.5 w-1.5 rounded-full bg-indigo-400 opacity-60"
            style={{
              animation: 'float 5s ease-in-out infinite'
            }}
          />
        </div>

        <div className="relative z-10 flex w-full flex-col items-center justify-center gap-12 px-4 sm:flex-row sm:gap-16 lg:gap-20">
          {/* Seção do GIF */}
          <div className="flex justify-center">
            <div className="group relative">
              <img
                src={miraiGifs[currentGifIndex]}
                alt="Mirai Robot"
                className="hero-gif gif-smooth-transition relative w-72 max-w-full rounded-2xl transition-all duration-500 hover:scale-105 sm:w-80 lg:w-96"
                style={{
                  opacity: gifOpacity,
                  transform: `scale(${gifOpacity === 0 ? 0.95 : 1})`
                }}
              />
            </div>
          </div>

          {/* Seção do texto */}
          <div className="flex flex-col items-center text-center">
            <h1 className="hero-title font-mont text-2xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Mirai 未来
              <br />
              <span className="text-xl sm:text-3xl lg:text-4xl">
                Autonomous Domestic Robot
              </span>
              <br />
              <br />
              <span className="text-lg sm:text-2xl lg:text-3xl">
                自律型家庭用ロボット
              </span>
            </h1>

            <div className="mt-8">
              <button
                className={`rounded-lg p-3 ${fade ? 'opacity-100' : 'opacity-0'} ${theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'} transition-all duration-1000 hover:bg-black hover:text-white`}
                onClick={() =>
                  document
                    .getElementById('about')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                <span className="relative z-10">Know more</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8"
        id="about"
      >
        <h1 className="mb-8 text-center font-mont text-2xl font-bold transition-all duration-1000 sm:mb-12 sm:text-4xl">
          About the project
        </h1>

        <div className="flex w-full max-w-7xl flex-col items-center gap-8 lg:flex-row lg:gap-16">
          {/* Image Section */}
          <div className="flex w-full justify-center lg:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl"></div>
              <img
                src="/photos/mirai-profile-view.jpg"
                alt="Mirai Robot - Complete Assembly"
                className="relative h-80 w-80 rounded-2xl object-cover shadow-2xl transition-transform duration-300 hover:scale-105 sm:h-96 sm:w-96 lg:h-[500px] lg:w-[400px]"
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-black/70 p-3 text-center backdrop-blur-sm">
                <p className="text-sm font-semibold text-white">
                  Mirai Robot - Final Assembly
                </p>
              </div>
            </div>
          </div>

          {/* Text Section */}
          <div className="flex w-full flex-col lg:w-1/2">
            <p className="text-center text-base leading-relaxed transition-all duration-1000 lg:text-left lg:text-lg">
              {showFullText ? (
                <>
                  This project aims to develop an autonomous service robot with
                  a focus on participating in the{' '}
                  <a
                    href="https://www.robocupathome.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <b>RoboCup @Home</b>
                  </a>{' '}
                  . The robot will be designed to perform typical tasks in a
                  domestic environment, such as object delivery, human
                  interaction, and autonomous navigation. Leveraging the latest
                  technologies in robotics and artificial intelligence, the
                  project will be developed within the academic context of the
                  Instituto Mauá de Tecnologia, seeking to advance knowledge in
                  areas such as embedded systems, motion control, natural
                  language processing, and machine learning. Participation in
                  <a
                    href="https://www.robocupathome.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <b> RoboCup @Home</b>
                  </a>{' '}
                  will present a significant challenge, where the robot must
                  demonstrate real-time interaction skills, autonomy in dynamic
                  environments, and integration with complex systems. The
                  project also aims to contribute to the advancement of service
                  robotics research, exploring innovative solutions to
                  real-world problems in human-robot coexistence.
                </>
              ) : (
                <>
                  This project aims to develop an autonomous service robot with
                  a focus on participating in the{' '}
                  <a
                    href="https://www.robocupathome.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <b>RoboCup @Home</b>
                  </a>{' '}
                  . The robot will be designed to perform typical tasks in a
                  domestic environment, such as object delivery, human
                  interaction,and autonomous navigation. Leveraging the latest
                  technologies in robotics and artificial intelligence, the
                  project will be developed within the academic context of the
                  Instituto Mauá de Tecnologia, seeking to advance knowledge in
                  areas such as embedded systems, motion control, natural
                  language processing, and machine learning.
                </>
              )}
            </p>
            <button
              className={`mt-6 self-center rounded-lg p-3 lg:self-start ${theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'} transition-all duration-1000 hover:bg-black hover:text-white`}
              onClick={handleToggleText}
            >
              {showFullText ? 'Read less' : 'Read more'}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`flex min-h-screen w-full transform flex-col items-center justify-center px-4 py-16 transition-all duration-1000 sm:px-6 lg:px-8 ${fade ? 'opacity-100' : 'opacity-0'}`}
        id="integrants"
      >
        <div className="mb-8 text-center sm:mb-12">
          <h1 className="mb-4 font-mont text-2xl font-bold transition-all duration-1000 sm:text-3xl md:text-4xl lg:text-5xl">
            Meet Our Team
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
            The talented individuals behind the Mirai project, each bringing
            unique expertise and passion to create an innovative domestic robot.
          </p>
        </div>

        <div className="grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {integrants.map((integrant, index) => (
            <div key={index} className="group h-full">
              <Card
                className="relative h-full overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900"
                onClick={() =>
                  window.open(integrant.link, '_blank', 'noopener,noreferrer')
                }
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-blue-900/20 dark:to-purple-900/20"></div>

                <CardContent className="relative flex h-full flex-col items-center p-6 text-center">
                  <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">
                    <Avatar className="h-20 w-20 border-4 border-white shadow-lg sm:h-24 sm:w-24">
                      <AvatarImage
                        src={integrant.img}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-lg font-bold text-white">
                        {`${integrant.name.split(' ')[0].substring(0, 1)}${integrant.name.split(' ')[1].substring(0, 1)}`}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex flex-1 flex-col justify-center space-y-2">
                    <h3 className="text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 sm:text-xl">
                      {integrant.name}
                    </h3>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300 sm:text-base">
                      {integrant.position}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400 sm:text-sm">
                      {integrant.bio}
                    </p>
                  </div>

                  {/* Decorative element */}
                  <div className="absolute right-2 top-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div
        className="flex min-h-screen w-full flex-col items-center justify-center"
        id="competition"
      >
        <h1 className="mb-6 p-4 text-center font-mont text-2xl font-bold transition-all duration-1000 sm:mt-4 sm:text-4xl">
          About the competition
        </h1>
        <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-8 sm:flex-row lg:gap-32">
          <div className="relative grid place-items-center">
            <div className="h-64 w-64 overflow-hidden rounded-full bg-gray-200 shadow-lg sm:h-80 sm:w-80">
              <img
                src="https://www.femexrobotica.org/tmr2017/wp-content/uploads/robocup@home-08.jpg"
                alt="Foto 1"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="h-32 w-32 -translate-y-12 translate-x-20 overflow-hidden rounded-full bg-gray-200 shadow-lg sm:h-40 sm:w-40 sm:-translate-y-16 sm:translate-x-24">
              <img
                src="https://athome.robocup.org/wp-content/uploads/2018/10/spl.jpg"
                alt="Foto 2"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <p className="w-10/12 text-center transition-all duration-1000">
              {showFullTextAbtComp ? (
                <>
                  RoboCup@Home is one of the world&apos;s leading robotics
                  competitions focused on developing service robots capable of
                  interacting with and assisting humans in domestic and social
                  environments. As part of the larger RoboCup event, which
                  promotes research in artificial intelligence and robotics, the
                  @Home category challenges teams to design autonomous robots
                  that perform complex everyday tasks, such as recognizing
                  people, understanding voice commands, navigating dynamic
                  environments, and handling objects with precision. The main
                  goal of RoboCup@Home is to drive innovation in developing
                  robots that can improve people&apos;s quality of life —
                  whether by assisting the elderly and people with disabilities
                  or optimizing household activities and public service
                  environments. The competition is divided into different
                  challenges, each assessing the robot&apos;s ability to
                  perceive its surroundings, plan actions, make decisions, and
                  interact naturally with humans. Participating in RoboCup@Home
                  requires teams to have deep knowledge in areas such as
                  computer vision, machine learning, natural language
                  processing, motion control, and systems integration. The
                  competition not only pushes technological advancements but
                  also fosters international collaboration and knowledge
                  exchange among students, researchers, and professionals in the
                  field.
                </>
              ) : (
                <>
                  RoboCup@Home is one of the world&apos;s leading robotics
                  competitions focused on developing service robots capable of
                  interacting with and assisting humans in domestic and social
                  environments. As part of the larger RoboCup event, which
                  promotes research in artificial intelligence and robotics...
                </>
              )}
            </p>
            <button
              className="mt-4 rounded-lg bg-black p-3 text-white transition-all duration-1000 hover:bg-gray-800"
              onClick={handleToggleTextAbtComp}
            >
              {showFullTextAbtComp ? 'Read Less' : 'Read More'}
            </button>
          </div>
        </div>
      </div>

      <div
        className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-16 sm:px-0"
        id="timeline"
      >
        <h1 className="mb-6 px-4 text-center font-mont text-xl font-bold transition-all duration-1000 sm:mb-8 sm:text-2xl md:text-3xl lg:text-4xl">
          Project Timeline & Development Journey
        </h1>
        <p className="mb-8 w-full px-4 text-center text-sm leading-relaxed sm:text-base md:mb-10 md:w-2/3 lg:w-1/2">
          Our development journey from latest achievements to project inception,
          with videos showcasing each milestone along the way.
        </p>

        <div className="w-full max-w-6xl px-2 sm:px-4 md:px-6">
          <div className="space-y-6 sm:space-y-8">
            {[
              {
                date: 'October 2025 - Present',
                title: 'Competition Preparation & Final Integration',
                description:
                  'Final system integration, comprehensive testing, and preparation for RoboCup @Home competition. Creation of promotional materials and performance optimization.',
                side: 'left',
                video: {
                  src: 'https://www.youtube.com/embed/EqAsmHjFv3U',
                  type: 'youtube',
                  title: 'Mirai Robot - Promotional Video'
                },
                achievements: [
                  'Promotional video creation',
                  'System integration',
                  'Performance optimization',
                  'Competition readiness'
                ]
              },
              {
                date: 'Third Week September 2025',
                title: 'Arm connection with virtual twin',
                description:
                  'Successful integration of the robotic arm with the virtual twin, enabling synchronized simulation and control of arm movements.',
                side: 'right',
                video: {
                  src: 'https://www.youtube.com/embed/5jP9ZgoEL1Q',
                  type: 'youtube',
                  title: 'Robotic Arm Virtual Twin Integration'
                },
                achievements: [
                  'Arm-virtual twin integration',
                  'Synchronized control',
                  'Enhanced simulation capabilities'
                ]
              },
              {
                date: 'Second Week September 2025',
                title: 'Arm Simulation and Virtual Twin Implementation',
                description:
                  'Development of a virtual twin for the robotic arm, enabling simulation and testing of arm movements in a virtual environment before physical implementation.',
                side: 'left',
                video: {
                  src: 'https://www.youtube.com/embed/vkWkgSUY6bs',
                  type: 'youtube',
                  title: 'Robotic Arm Virtual Twin Simulation'
                },
                achievements: [
                  'Virtual twin creation',
                  'Arm movement simulation',
                  'Pre-implementation testing'
                ]
              },
              {
                date: 'First Week September 2025',
                title: 'Keyboard Arm Control Implementation',
                description:
                  'Implementation and testing of manual keyboard control system for precise robot movement and debugging purposes.',
                side: 'right',
                video: {
                  src: 'https://www.youtube.com/embed/hjAr5C6vf2c',
                  type: 'youtube',
                  title: 'Robot Keyboard Control Movement Test'
                },
                achievements: [
                  'Keyboard control interface',
                  'Manual movement precision',
                  'Debug control system'
                ]
              },
              {
                date: 'Last Week August 2025',
                title: 'Autonomous Movement Achievement',
                description:
                  'Successful implementation of fully autonomous movement capabilities, marking a major milestone in robot independence.',
                side: 'left',
                video: {
                  src: 'https://www.youtube.com/embed/5uOVR22IWbw',
                  type: 'youtube',
                  title: 'Fully Autonomous Robot Movement'
                },
                achievements: [
                  'Autonomous navigation',
                  'Independent movement',
                  'Path execution'
                ]
              },
              {
                date: 'April 2025',
                title: 'AI Integration & Human Interaction',
                description:
                  'Integration of conversational AI, natural language processing, and human-robot interaction capabilities. Voice recognition and response systems.',
                side: 'right',
                video: {
                  src: 'https://www.youtube.com/embed/kKJjD6PnqGE',
                  type: 'youtube',
                  title: 'AI Conversation & Interaction Demo'
                },
                achievements: [
                  'Voice recognition',
                  'Natural language processing',
                  'Human-robot interaction'
                ]
              },
              {
                date: 'May - July 2025',
                title: 'Movement Testing',
                description:
                  'Validation of encoder-based movement, Initial manual mobility tests.',
                side: 'left',
                video: {
                  src: '/walking_test.mp4',
                  type: 'video',
                  title: 'Manual Mobility & Movement Test'
                },
                achievements: ['Distance-based movement control']
              },
              {
                date: 'February - April 2025',
                title: 'Software Architecture & ROS2 Integration',
                description:
                  'Development of core software architecture, ROS2 nodes implementation, and motor control systems. Communication protocols established.',
                side: 'right',
                video: {
                  src: '/communication_test.mp4',
                  type: 'video',
                  title: 'ROS2 Communication System Test'
                },
                achievements: [
                  'ROS2 node architecture',
                  'Motor control system',
                  'Communication protocols'
                ]
              },
              {
                date: 'October - December 2024',
                title: 'Mechanical Design & Prototyping',
                description:
                  'Robot mechanical structure design, 3D modeling, and first physical prototype assembly. Base platform and arm mechanism development.',
                side: 'left',
                video: {
                  src: '/robo-dancando.gif',
                  type: 'gif',
                  title: 'Early Robot Movement Test'
                },
                achievements: [
                  '3D robot model',
                  'Base platform assembly',
                  'Arm mechanism design'
                ]
              },
              {
                date: 'September 2024',
                title: 'Project Inception & Team Formation',
                description:
                  'Initial project conception, team assembly, and planning for RoboCup @Home participation. Research phase and technology stack definition.',
                side: 'right',
                video: null,
                achievements: [
                  'Team formation',
                  'Project proposal',
                  'Initial research'
                ]
              }
            ].map((milestone, index) => (
              <div
                key={index}
                className="mb-8 flex flex-col gap-4 md:mb-12 md:flex-row md:items-start md:gap-6"
              >
                {/* Date Section */}
                <div className="w-full flex-shrink-0 md:w-48">
                  <div className="text-center md:text-right">
                    <div className="inline-block rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-2 text-xs font-semibold text-white shadow-lg sm:px-4 sm:text-sm">
                      {milestone.date}
                    </div>
                  </div>
                </div>

                {/* Card Section */}
                <div className="flex-1">
                  <Card className="transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="pb-3 md:pb-4">
                      <CardTitle className="text-lg sm:text-xl md:text-xl">
                        {milestone.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-sm leading-relaxed sm:text-base md:text-sm">
                        {milestone.description}
                      </p>

                      {/* Video Section */}
                      {milestone.video && (
                        <div className="mb-4">
                          <h4 className="mb-2 text-sm font-semibold sm:text-base md:text-sm">
                            {milestone.video.title}
                          </h4>
                          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                            {milestone.video.type === 'youtube' ? (
                              <iframe
                                className="h-full w-full"
                                src={milestone.video.src}
                                title={milestone.video.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                              />
                            ) : milestone.video.type === 'gif' ? (
                              <img
                                src={milestone.video.src}
                                alt={milestone.video.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <video
                                className="h-full w-full object-cover"
                                controls
                                muted
                                playsInline
                              >
                                <source
                                  src={milestone.video.src}
                                  type="video/mp4"
                                />
                                Your browser does not support the video tag.
                              </video>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Achievements Section */}
                      <div>
                        <h4 className="mb-2 text-sm font-semibold sm:text-base md:text-sm">
                          Key Achievements:
                        </h4>
                        <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-300 sm:space-y-2 sm:text-sm md:text-xs">
                          {milestone.achievements.map(
                            (achievement, achievementIndex) => (
                              <li
                                key={achievementIndex}
                                className="flex items-start gap-2 sm:items-center"
                              >
                                <span className="mt-0.5 text-green-500 sm:mt-0">
                                  ✓
                                </span>
                                <span className="flex-1">{achievement}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-16 sm:px-0"
        id="contact"
      >
        <h1 className="mb-8 text-center font-mont text-2xl font-bold transition-all duration-1000 sm:text-4xl">
          Connect With Us
        </h1>
        <p className="mb-10 w-full text-center md:w-2/3 lg:w-1/2">
          Want to learn more about our project or collaborate? Get in touch with
          the IMT @ Home team.
        </p>

        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="text-2xl">🏫</div>
                  Instituto Mauá de Tecnologia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                  Our project is developed at Instituto Mauá de Tecnologia, a
                  leading engineering institution in Brazil.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>São Caetano do Sul, SP - Brazil</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🌐</span>
                    <a
                      href="https://maua.br"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      maua.br
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="text-2xl">🔗</div>
                  Project Links
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <a
                    href="https://github.com/IMT-AT-home/athome"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg bg-gray-100 p-3 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <FiGithub className="text-xl" />
                    <div>
                      <div className="font-semibold">GitHub Repository</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">
                        View our source code
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://athome.robocup.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg bg-gray-100 p-3 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <GoTrophy className="text-xl" />
                    <div>
                      <div className="font-semibold">RoboCup @Home</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">
                        Official competition website
                      </div>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
