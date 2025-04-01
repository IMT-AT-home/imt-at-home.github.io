import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../hooks/use-theme'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { type CarouselApi } from '@/components/ui/carousel'

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
    img: 'https://media.licdn.com/dms/image/v2/D4D03AQHu6-Soom4jfg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1727641516552?e=1747872000&v=beta&t=aPpPeKAjyaHh61F6I4IcEuUV2U3P0wtBlxy5aooOexo',
    bio: 'Responsible for the ROS2 integration, Navigation, Autonomous movement and the overall software architecture.',
    link: 'https://www.linkedin.com/in/pedro-bauke-b1284a30b/'
  },
  {
    name: 'Aline Nunes',
    position: 'Responsible for Eletronics',
    img: 'https://media.licdn.com/dms/image/v2/D4D03AQGHdSYoj_SvfQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1680050490636?e=1747872000&v=beta&t=DL2BlmMOqAEOGVcatEh3EnKV2sSUhXahq1b70lpMkTs',
    bio: 'Responsible for the electronics, arm control and overall control-related tasks of the robot.',
    link: 'https://www.linkedin.com/in/alinenuneswatanabe/'
  },
  {
    name: 'Eliana So',
    position: 'Responsible for Mechanics',
    img: 'https://media.licdn.com/dms/image/v2/D4D03AQFj7ZwDwp3Wew/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1723709947966?e=1747872000&v=beta&t=fDNvrYJC38BVLlAxRtMwdqCgIUoOU4Gz8jLc9BCCNBY',
    bio: 'Responsible for the mechanical design of the robot and 3D modeling, as well as Navigation and Autonomous movement.',
    link: 'https://www.linkedin.com/in/eliana-so/'
  },
  {
    name: 'Erick Wu',
    position: 'Responsible for Mechanics',
    img: 'https://media.licdn.com/dms/image/v2/C4D03AQHoR6Aty_ZODA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1622075771245?e=1747872000&v=beta&t=nI0WkX2rhEPWYzuYnD7FtDY30V6EHw1hEYWnmFIYqSs',
    bio: 'Responsible for the arm modeling and control and arm-related tasks.',
    link: 'https://www.linkedin.com/in/erick-wu-a19368209/'
  },
  {
    name: 'Anderson Harayashiki',
    position: 'Professor Adviser',
    img: 'https://media.licdn.com/dms/image/v2/D5603AQFsnYS9kUyzxA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1729804852931?e=1747872000&v=beta&t=G0jaKlXug7Ui_hIoHMAwR9x3tp5nrSs9-kB43hzIu_M',
    bio: 'Responsible for the guidance and overall project management, as well as the integration of the different areas of the project and techinical support.',
    link: 'https://www.linkedin.com/in/andersonhm/'
  },
  {
    name: 'Maicon Koji',
    position: 'Responsible for Mechanics',
    img: 'https://media.licdn.com/dms/image/v2/D4D03AQHYAEHfJBZ00w/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1727046267870?e=1747872000&v=beta&t=-kS-eSR0pPWe4i4i-fOuDH_AN5D7p6pLdaqjvvN-iCo',
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
      type: 'video',
      src: '/demo_ai_video.mp4',
      alt: 'AI Demo',
      title: 'Robot AI Demonstration',
      description:
        "Showcasing our robot's artificial intelligence capabilities."
    },
    {
      type: 'video',
      src: '/communication_test.mp4',
      alt: 'Navigation Demo',
      title: 'Communication with ROS2',
      description: "Demonstration of the robot's communication with ROS2."
    },
    {
      type: 'video',
      src: '/walking_test.mp4',
      alt: 'Walking Test',
      title: 'Robot Walking Test',
      description: "Testing the robot's walking by meters capabilities."
    }
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
      // Pause all videos
      videoRefs.current.forEach((video, index) => {
        if (video && index !== currentSlide) {
          video.pause()
        }
      })

      // Play the current video
      const currentVideo = videoRefs.current[currentSlide]
      if (currentVideo) {
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
        <div className="flex w-full flex-col items-center justify-center gap-8 sm:flex-row">
          <div className="flex justify-center">
            <img
              src="/robo-dancando.gif"
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
              RADIn
              <br />
              Robô Autônomo Doméstico
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

      {/* <div
        className="flex min-h-screen w-full flex-col items-center justify-center"
        id="repos"
      >
        <h1 className="mb-6 text-center font-mont text-2xl font-bold transition-all duration-1000 sm:text-4xl">
          Repos
        </h1>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2">
          {infosRepos.map((info, index) => (
            <InfoCard key={info.title} info={info} delay={index} />
          ))}
        </div>
      </div> */}

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
                  RoboCup@Home is one of the world's leading robotics
                  competitions focused on developing service robots capable of
                  interacting with and assisting humans in domestic and social
                  environments. As part of the larger RoboCup event, which
                  promotes research in artificial intelligence and robotics, the
                  @Home category challenges teams to design autonomous robots
                  that perform complex everyday tasks, such as recognizing
                  people, understanding voice commands, navigating dynamic
                  environments, and handling objects with precision. The main
                  goal of RoboCup@Home is to drive innovation in developing
                  robots that can improve people's quality of life — whether by
                  assisting the elderly and people with disabilities or
                  optimizing household activities and public service
                  environments. The competition is divided into different
                  challenges, each assessing the robot's ability to perceive its
                  surroundings, plan actions, make decisions, and interact
                  naturally with humans. Participating in RoboCup@Home requires
                  teams to have deep knowledge in areas such as computer vision,
                  machine learning, natural language processing, motion control,
                  and systems integration. The competition not only pushes
                  technological advancements but also fosters international
                  collaboration and knowledge exchange among students,
                  researchers, and professionals in the field.
                </>
              ) : (
                <>
                  RoboCup@Home is one of the world's leading robotics
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
              {showFullText ? 'Leia Menos' : 'Leia Mais'}
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
          Check out these videos showcasing our robot's capabilities in action.
          From AI interactions to autonomous navigation, see how RADIn performs
          in real-world scenarios.
        </p>

        <Carousel
          opts={{
            align: 'center',
            loop: true
          }}
          className="w-full max-w-4xl"
          setApi={setCarouselApi}
        >
          <CarouselContent>
            {videoSlides.map((slide, index) => (
              <CarouselItem key={index} className="md:basis-4/5 lg:basis-3/4">
                <Card className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle>{slide.title}</CardTitle>
                    <CardDescription>{slide.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="relative aspect-video w-full">
                      <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        className="h-full w-full object-cover"
                        controls
                        autoPlay={index === currentSlide}
                        muted={index === currentSlide}
                        playsInline
                        poster={`assets/${slide.alt.toLowerCase().replace(' ', '_')}_thumbnail.jpg`}
                      >
                        <source src={slide.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
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
    </main>
  )
}
