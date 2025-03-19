import { useEffect, useState } from 'react'
import { useTheme } from '../hooks/use-theme'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import Autoplay from 'embla-carousel-autoplay'

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

  useEffect(() => {
    setTimeout(() => {
      setFade(true)
    }, 100)
  }, [])

  return (
    <main
      style={{
        backgroundColor:
          theme === 'light' ? 'rgba(255, 255, 255, 1)' : 'rgba(10, 10, 10, 1)',
        color: theme === 'light' ? 'black' : 'white'
      }}
    >
      <div className="relative flex min-h-screen w-full items-center justify-center">
        {/* Container com flexbox para as duas colunas */}
        <div className="flex w-full items-center justify-center gap-8">
          {/* Coluna do GIF */}
          <div className="flex justify-center">
            <img
              src="/robo-dancando.gif" /* Substitua pelo seu GIF de robô */
              alt="Robô"
              className="w-80"
            />
          </div>

          {/* Coluna do Texto e Botão */}
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

            {/* Botão abaixo do texto */}
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
        className="flex min-h-screen w-full flex-col items-center justify-center"
        id="about"
      >
        <h1 className="mb-6 text-center font-mont text-2xl font-bold transition-all duration-1000 sm:text-4xl">
          About the project
        </h1>
        <p className="w-1/2 text-center transition-all duration-1000">
          This project aims to develop an autonomous service robot with a focus
          on participating in the{' '}
          <a
            href="https://www.robocupathome.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <b>RoboCup @Home</b>
          </a>{' '}
          . The robot will be designed to perform typical tasks in a domestic
          environment, such as object delivery, human interaction, and
          autonomous navigation. Leveraging the latest technologies in robotics
          and artificial intelligence, the project will be developed within the
          academic context of the Instituto Mauá de Tecnologia, seeking to
          advance knowledge in areas such as embedded systems, motion control,
          natural language processing, and machine learning. Participation in
          <a
            href="https://www.robocupathome.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <b> RoboCup @Home</b>
          </a>{' '}
          will present a significant challenge, where the robot must demonstrate
          real-time interaction skills, autonomy in dynamic environments, and
          integration with complex systems. The project also aims to contribute
          to the advancement of service robotics research, exploring innovative
          solutions to real-world problems in human-robot coexistence.
        </p>
        <button
          className={`mt-6 rounded-lg p-3 ${theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'} transition-all duration-1000 hover:bg-black hover:text-white`}
          onClick={() =>
            // ir para link do repositório
            window.open('https://github.com/IMT-AT-home/athome', '_blank')
          }
        >
          Go to repository
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
            align: 'start'
          }}
          className="max-w-lg px-24 sm:px-0 lg:max-w-4xl"
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
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </main>
  )
}
