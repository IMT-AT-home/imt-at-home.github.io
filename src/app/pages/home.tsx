import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../hooks/use-theme'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { type CarouselApi } from '@/components/ui/carousel'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { GoTrophy } from 'react-icons/go'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../../components/ui/carousel'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

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
    bio: 'Responsible for the ROS2 integration, Audio processing, Conversational AI and the overall software architecture.',
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
  const [currentSlide, setCurrentSlide] = useState(0)
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const videoSlides = [
    {
      type: 'youtube',
      src: 'https://www.youtube.com/embed/kKJjD6PnqGE',
      alt: 'Conversation Test',
      title: 'Robot communication test',
      description: "Testing the robot's communication capabilities.",
      link: 'https://youtu.be/kKJjD6PnqGE'
    },
    {
      type: 'video',
      src: '/demo_ai_video.mp4',
      alt: 'AI Demo',
      title: 'Robot AI Demonstration',
      description:
        "Showcasing our robot's artificial intelligence capabilities.",
      link: '/demo_ai_video.mp4'
    },
    {
      type: 'video',
      src: '/communication_test.mp4',
      alt: 'Navigation Demo',
      title: 'Communication with ROS2',
      description: "Demonstration of the robot's communication with ROS2.",
      link: '/communication_test.mp4'
    },
    {
      type: 'video',
      src: '/walking_test.mp4',
      alt: 'Walking Test',
      title: 'Robot Walking Test',
      description: "Testing the robot's walking by meters capabilities.",
      link: '/walking_test.mp4'
    },
  ]

  const handleToggleText = () => {
    setShowFullText((prevState) => !prevState)
  }

  const handleToggleTextAbtComp = () => {
    setShowFullTextAbtComp((prevState) => !prevState)
  }

  useEffect(() => {
    setTimeout(() => {
      setFade(true)
    }, 100)
  }, [])

  useEffect(() => {
    if (videoRefs.current && videoRefs.current.length > 0) {
      // Pause all videos (only for non-YouTube videos)
      videoRefs.current.forEach((video, index) => {
        if (video && index !== currentSlide && videoSlides[index]?.type === 'video') {
          video.pause()
        }
      })

      // Play the current video (only for non-YouTube videos)
      const currentVideo = videoRefs.current[currentSlide]
      if (currentVideo && videoSlides[currentSlide]?.type === 'video') {
        currentVideo.play().catch((error) => {
          console.log('Autoplay prevented:', error)
          // You might want to show a play button or message here
        })
      }
    }
  }, [currentSlide])

  useEffect(() => {
    if (carouselApi) {
      // Initialize refs array with the correct length
      videoRefs.current = Array(videoSlides.length).fill(null)

      // Set up event listener for slide change
      carouselApi.on('select', () => {
        setCurrentSlide(carouselApi.selectedScrollSnap())
      })
    }
  }, [carouselApi, videoSlides.length])
  return (
    <main
      style={{
        backgroundColor:
          theme === 'light' ? 'rgba(255, 255, 255, 1)' : 'rgba(10, 10, 10, 1)',
        color: theme === 'light' ? 'black' : 'white',
        overflowX: 'hidden' // Fix for horizontal scrolling
      }}
    >
      <div className="relative flex min-h-screen w-full items-center justify-center">
        <div className="relative z-10 flex w-full flex-col items-center justify-center gap-8 sm:flex-row">
          <div className="flex justify-center">
            <img
              src="/Mirai_Idle.gif"
              alt="Robô"
              className="w-80 max-w-full overflow-hidden" // Added max-w-full
            />
          </div>

          <div className="flex flex-col items-center text-center">
            <h1
              className={`font-mont text-2xl font-bold transition-all duration-1000 sm:text-4xl ${fade ? 'translate-x-0 opacity-100' : 'translate-x-32 opacity-0'}`}
              style={{
                position: 'relative',
                zIndex: 5
              }}
            >
              Mirai 未来
              <br />
              Autonomous Domestic Robot
              <br />
              <br />
              自律型家庭用ロボット
            </h1>

            <div className="mt-6">
              <button
                className={`rounded-lg p-3 ${fade ? 'opacity-100' : 'opacity-0'} ${theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'} transition-all duration-1000 hover:bg-black hover:text-white`}
                onClick={() =>
                  document
                    .getElementById('about')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Know more
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex min-h-screen w-full flex-col items-center justify-center px-4 sm:px-0"
        id="about"
      >
        <h1 className="mb-6 text-center font-mont text-2xl font-bold transition-all duration-1000 sm:text-4xl">
          About the project
        </h1>
        <p className="w-full text-center transition-all duration-1000 md:w-1/2">
          {showFullText ? (
            <>
              This project aims to develop an autonomous service robot with a
              focus on participating in the{' '}
              <a
                href="https://www.robocupathome.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <b>RoboCup @Home</b>
              </a>{' '}
              . The robot will be designed to perform typical tasks in a
              domestic environment, such as object delivery, human interaction,
              and autonomous navigation. Leveraging the latest technologies in
              robotics and artificial intelligence, the project will be
              developed within the academic context of the Instituto Mauá de
              Tecnologia, seeking to advance knowledge in areas such as embedded
              systems, motion control, natural language processing, and machine
              learning. Participation in
              <a
                href="https://www.robocupathome.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <b> RoboCup @Home</b>
              </a>{' '}
              will present a significant challenge, where the robot must
              demonstrate real-time interaction skills, autonomy in dynamic
              environments, and integration with complex systems. The project
              also aims to contribute to the advancement of service robotics
              research, exploring innovative solutions to real-world problems in
              human-robot coexistence.
            </>
          ) : (
            <>
              This project aims to develop an autonomous service robot with a
              focus on participating in the{' '}
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
              technologies in robotics and artificial intelligence, the project
              will be developed within the academic context of the Instituto
              Mauá de Tecnologia, seeking to advance knowledge in areas such as
              embedded systems, motion control, natural language processing, and
              machine learning.
            </>
          )}
        </p>
        <button
          className={`mt-6 rounded-lg p-3 ${theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'} transition-all duration-1000 hover:bg-black hover:text-white`}
          onClick={handleToggleText}
        >
          {showFullText ? 'Read less' : 'Read more'}
        </button>
      </div>

      <div
        className={`duration-3000 flex min-h-screen w-full transform flex-col items-center justify-center px-4 transition-all sm:px-0 ${fade ? 'opacity-100' : 'opacity-0'}`}
        id="integrants"
      >
        <h1 className="mb-8 text-center font-mont text-2xl font-bold transition-all duration-1000 sm:text-4xl">
          Integrants
        </h1>
        <Carousel
          opts={{
            align: 'start',
            containScroll: 'trimSnaps' // Added to prevent overflow
          }}
          className="w-full max-w-lg px-4 sm:px-0 lg:max-w-4xl" // Modified classes
        >
          <CarouselContent>
            {integrants.map((integrant, index) => (
              <CarouselItem
                key={index}
                className="basis-full sm:basis-1/2 lg:basis-1/4"
              >
                <div className="p-1">
                  <Card
                    className="min-h-[26rem] transition-all duration-500"
                    onClick={() =>
                      window.open(
                        integrant.link,
                        '_blank',
                        'noopener,noreferrer'
                      )
                    }
                  >
                    <CardHeader className="items-center pb-0">
                      <Avatar className="h-[75px] w-[75px]">
                        <AvatarImage src={integrant.img} />
                        <AvatarFallback>
                          {`${integrant.name.split(' ')[0].substring(0, 1)}${integrant.name.split(' ')[1].substring(0, 1)}`}
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle className="">{integrant.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {integrant.position}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center p-6">
                      <span className="text-center text-base font-light">
                        {integrant.bio}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious /> {/* Adjusted positioning */}
          <CarouselNext /> {/* Adjusted positioning */}
        </Carousel>
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
        id="videos"
      >
        <h1 className="mb-8 text-center font-mont text-2xl font-bold transition-all duration-1000 sm:text-4xl">
          Project Videos
        </h1>
        <p className="mb-10 w-full text-center md:w-2/3 lg:w-1/2">
          Check out these videos showcasing our robot&apos;s capabilities in
          action. From AI interactions to autonomous navigation, see how Mirai
          performs in real-world scenarios.
        </p>

        <Carousel
          opts={{
            align: 'center',
            loop: true
          }}
          className="w-2/3 max-w-4xl"
          setApi={setCarouselApi}
        >
          <CarouselContent>
            {videoSlides.map((slide, index) => (
              <CarouselItem key={index} className="md:basis-4/5 lg:basis-3/4">
                <Card className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <CardTitle>{slide.title}</CardTitle>
                        <CardDescription>{slide.description}</CardDescription>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(slide.link, '_blank', 'noopener,noreferrer')
                        }}
                        className="ml-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        title="Open video in new tab"
                      >
                        <FiExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="relative aspect-video w-full">
                      {slide.type === 'youtube' ? (
                        <iframe
                          className="h-full w-full"
                          src={slide.src}
                          title={slide.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          ref={(el) => (videoRefs.current[index] = el)}
                          className="h-full w-full object-cover"
                          controls
                          autoPlay={index === currentSlide && slide.type === 'video'}
                          muted={index === currentSlide && slide.type === 'video'}
                          playsInline
                          poster={`assets/${slide.alt.toLowerCase().replace(' ', '_')}_thumbnail.jpg`}
                        >
                          <source src={slide.src} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-4 flex items-center justify-center gap-2">
            {videoSlides.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-all ${
                  currentSlide === index
                    ? theme === 'light'
                      ? 'w-4 bg-black'
                      : 'w-4 bg-white'
                    : theme === 'light'
                      ? 'bg-gray-300'
                      : 'bg-gray-700'
                }`}
                onClick={() => {
                  carouselApi?.scrollTo(index)
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <CarouselPrevious className="left-2 sm:left-4" />
          <CarouselNext className="right-2 sm:right-4" />
        </Carousel>
      </div>

      <div
        className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-16 sm:px-0"
        id="timeline"
      >
        <h1 className="mb-8 text-center font-mont text-2xl font-bold transition-all duration-1000 sm:text-4xl">
          Project Timeline & Achievements
        </h1>
        <p className="mb-10 w-full text-center md:w-2/3 lg:w-1/2">
          Follow our journey from concept to competition-ready robot.
        </p>
        
        <div className="w-full max-w-4xl">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform -translate-x-1/2"></div>
            
            {[
              {
                date: "2024 T3",
                title: "Project Inception",
                description: "Team formation and initial project planning for RoboCup @Home participation.",
                side: "left"
              },
              {
                date: "2024 T4",
                title: "Hardware Development",
                description: "Mechanical platform design and first robot prototype assembly.",
                side: "right"
              },
              {
                date: "2025 T1",
                title: "Software Architecture",
                description: "Motor testing, ROS2 integration, and initial software development.",
                side: "left"
              },
              {
                date: "2025 T2",
                title: "Testing & Validation",
                description: "Conversational AI integration, mechanical full system design, and testing of core functionalities.",
                side: "right"
              },
            ].map((milestone, index) => (
              <div key={index} className={`relative mb-12 flex items-center ${milestone.side === 'left' ? 'justify-end pr-8' : 'justify-start pl-8'}`}>
                <div className={`w-5/12 ${milestone.side === 'left' ? 'text-right' : 'text-left'}`}>
                  <Card className="transition-all duration-300 hover:shadow-lg">
                    <CardHeader>
                      <div className={`flex items-center gap-2 ${milestone.side === 'left' ? 'justify-end' : 'justify-start'}`}>
                        <CardTitle className="text-lg">{milestone.title}</CardTitle>
                      </div>
                      <CardDescription className="font-semibold text-blue-600 dark:text-blue-400">
                        {milestone.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
                {/* Timeline dot */}
                <div className="absolute left-1/2 h-4 w-4 rounded-full bg-white border-4 border-blue-500 transform -translate-x-1/2 shadow-lg"></div>
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
          Want to learn more about our project or collaborate? Get in touch with the IMT @ Home team.
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
                  Our project is developed at Instituto Mauá de Tecnologia, a leading engineering institution in Brazil.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>São Caetano do Sul, SP - Brazil</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🌐</span>
                    <a href="https://maua.br" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">
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
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 transition-all hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <FiGithub className="text-xl" />
                    <div>
                      <div className="font-semibold">GitHub Repository</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">View our source code</div>
                    </div>
                  </a>
                  
                  <a 
                    href="https://athome.robocup.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 transition-all hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <GoTrophy className="text-xl" />
                    <div>
                      <div className="font-semibold">RoboCup @Home</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">Official competition website</div>
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
