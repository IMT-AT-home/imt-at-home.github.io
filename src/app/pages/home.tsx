import { useEffect, useState } from 'react'
import { useTheme } from '../hooks/use-theme'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FiGithub } from 'react-icons/fi'
import { GoTrophy } from 'react-icons/go'
import gsap from 'gsap'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export type Language = 'en' | 'pt'

export type Translations = {
  navbar: {
    home: string
    about: string
    team: string
    competition: string
    demoSchedule: string
    timeline: string
    contact: string
  }
  hero: {
    title: string
    subtitle: string
    robotName: string
    knowMore: string
  }
  demoBanner: {
    title: string
    subtitle: string
    button: string
  }
  about: {
    title: string
    readMore: string
    readLess: string
    description: {
      short: string
      full: string
    }
  }
  team: {
    title: string
    description: string
    members: {
      [key: string]: {
        position: string
        bio: string
      }
    }
  }
  demoSchedule: {
    title: string
    description: string
    nextDemo: string
    timeUntilNext: string
    todaySchedule: string
    liveNow: string
    next: string
    demo: string
    legend: {
      liveNow: string
      nextDemo: string
      scheduled: string
    }
  }
  competition: {
    title: string
    readMore: string
    readLess: string
    description: {
      short: string
      full: string
    }
  }
  milestones: {
    title: string
    description: string
    keyAchievements: string
    items: {
      date: string
      title: string
      description: string
      achievements: string[]
    }[]
  }
  contact: {
    title: string
    description: string
    instituteName: string
    instituteDescription: string
    projectLinks: string
    githubRepo: string
    githubDescription: string
    robocupHome: string
    robocupDescription: string
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    navbar: {
      home: 'Home',
      about: 'About',
      team: 'Team',
      competition: 'Competition',
      demoSchedule: 'Demo Schedule',
      timeline: 'Timeline',
      contact: 'Contact'
    },
    hero: {
      title: 'Mirai 未来',
      subtitle: 'Autonomous Domestic Robot',
      robotName: '自律型家庭用ロボット',
      knowMore: 'Know more'
    },
    demoBanner: {
      title: 'See Mirai in Action!',
      subtitle:
        'Join us for live demonstrations and watch our robot perform real-world tasks',
      button: 'View Demo Schedule'
    },
    about: {
      title: 'About the project',
      readMore: 'Read more',
      readLess: 'Read less',
      description: {
        short:
          'This project aims to develop an autonomous service robot with a focus on participating in the RoboCup @Home. The robot will be designed to perform typical tasks in a domestic environment, such as object delivery, human interaction, and autonomous navigation. Leveraging the latest technologies in robotics and artificial intelligence, the project will be developed within the academic context of the Instituto Mauá de Tecnologia, seeking to advance knowledge in areas such as embedded systems, motion control, natural language processing, and machine learning.',
        full: 'This project aims to develop an autonomous service robot with a focus on participating in the RoboCup @Home. The robot will be designed to perform typical tasks in a domestic environment, such as object delivery, human interaction, and autonomous navigation. Leveraging the latest technologies in robotics and artificial intelligence, the project will be developed within the academic context of the Instituto Mauá de Tecnologia, seeking to advance knowledge in areas such as embedded systems, motion control, natural language processing, and machine learning. Participation in RoboCup @Home will present a significant challenge, where the robot must demonstrate real-time interaction skills, autonomy in dynamic environments, and integration with complex systems. The project also aims to contribute to the advancement of service robotics research, exploring innovative solutions to real-world problems in human-robot coexistence.'
      }
    },
    team: {
      title: 'Meet Our Team',
      description:
        'The talented individuals behind the Mirai project, each bringing unique expertise and passion to create an innovative domestic robot.',
      members: {
        'Pedro Matumoto': {
          position: 'Responsible for Software',
          bio: 'Responsible for the ROS2 integration, Audio processing, Conversational AI, Navigation, Autonomous movement, Computer vision and the overall software architecture.'
        },
        'Pedro Bauke': {
          position: 'Responsible for Software',
          bio: 'Responsible for the ROS2 integration, Navigation, Autonomous movement and the overall software architecture.'
        },
        'Aline Nunes': {
          position: 'Responsible for Electronics',
          bio: 'Responsible for the electronics, arm control and overall control-related tasks of the robot.'
        },
        'Eliana So': {
          position: 'Responsible for Mechanics',
          bio: 'Responsible for the mechanical design of the robot and 3D modeling, as well as Navigation and Autonomous movement.'
        },
        'Erick Wu': {
          position: 'Responsible for Mechanics',
          bio: 'Responsible for the arm modeling and control and arm-related tasks.'
        },
        'Anderson Harayashiki': {
          position: 'Professor Adviser',
          bio: 'Responsible for the guidance and overall project management, as well as the integration of the different areas of the project and technical support.'
        },
        'Maicon Koji': {
          position: 'Responsible for Mechanics',
          bio: 'Responsible for the mechanical design of the robot and 3D modeling.'
        }
      }
    },
    demoSchedule: {
      title: 'Demo Schedule',
      description:
        'Check out our upcoming live demonstrations. See when the next demo starts!',
      nextDemo: 'Next Demo',
      timeUntilNext: 'Time until next demo:',
      todaySchedule: "Today's Demo Schedule",
      liveNow: 'LIVE NOW',
      next: 'NEXT',
      demo: 'Demo',
      legend: {
        liveNow: 'Live Now',
        nextDemo: 'Next Demo',
        scheduled: 'Scheduled'
      }
    },
    competition: {
      title: 'About the competition',
      readMore: 'Read more',
      readLess: 'Read less',
      description: {
        short:
          "RoboCup@Home is one of the world's leading robotics competitions focused on developing service robots capable of interacting with and assisting humans in domestic and social environments. As part of the larger RoboCup event, which promotes research in artificial intelligence and robotics...",
        full: "RoboCup@Home is one of the world's leading robotics competitions focused on developing service robots capable of interacting with and assisting humans in domestic and social environments. As part of the larger RoboCup event, which promotes research in artificial intelligence and robotics, the @Home category challenges teams to design autonomous robots that perform complex everyday tasks, such as recognizing people, understanding voice commands, navigating dynamic environments, and handling objects with precision. The main goal of RoboCup@Home is to drive innovation in developing robots that can improve people's quality of life — whether by assisting the elderly and people with disabilities or optimizing household activities and public service environments. The competition is divided into different challenges, each assessing the robot's ability to perceive its surroundings, plan actions, make decisions, and interact naturally with humans. Participating in RoboCup@Home requires teams to have deep knowledge in areas such as computer vision, machine learning, natural language processing, motion control, and systems integration. The competition not only pushes technological advancements but also fosters international collaboration and knowledge exchange among students, researchers, and professionals in the field."
      }
    },
    milestones: {
      title: 'Development Milestones',
      description:
        'Our development journey from latest achievements to project inception, with videos showcasing each milestone along the way.',
      keyAchievements: 'Key Achievements:',
      items: [
        {
          date: 'October 2025 - Present',
          title: 'Competition Preparation & Final Integration',
          description:
            'Final system integration, comprehensive testing, and preparation for RoboCup @Home competition. Creation of promotional materials and performance optimization.',
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
          achievements: ['Distance-based movement control']
        },
        {
          date: 'February - April 2025',
          title: 'Software Architecture & ROS2 Integration',
          description:
            'Development of core software architecture, ROS2 nodes implementation, and motor control systems. Communication protocols established.',
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
          achievements: [
            'Team formation',
            'Project proposal',
            'Initial research'
          ]
        }
      ]
    },
    contact: {
      title: 'Connect With Us',
      description:
        'Want to learn more about our project or collaborate? Get in touch with the IMT @ Home team.',
      instituteName: 'Instituto Mauá de Tecnologia',
      instituteDescription:
        'Our project is developed at Instituto Mauá de Tecnologia, a leading engineering institution in Brazil.',
      projectLinks: 'Project Links',
      githubRepo: 'GitHub Repository',
      githubDescription: 'View our source code',
      robocupHome: 'RoboCup @Home',
      robocupDescription: 'Official competition website'
    }
  },
  pt: {
    navbar: {
      home: 'Início',
      about: 'Sobre',
      team: 'Equipe',
      competition: 'Competição',
      demoSchedule: 'Demonstrações',
      timeline: 'Cronologia',
      contact: 'Contato'
    },
    hero: {
      title: 'Mirai 未来',
      subtitle: 'Robô Doméstico Autônomo',
      robotName: '自律型家庭用ロボット',
      knowMore: 'Saiba mais'
    },
    demoBanner: {
      title: 'Veja o Mirai em Ação!',
      subtitle:
        'Participe de nossas demonstrações ao vivo e veja nosso robô realizar tarefas do mundo real',
      button: 'Ver Horários das Demos'
    },
    about: {
      title: 'Sobre o projeto',
      readMore: 'Ler mais',
      readLess: 'Ler menos',
      description: {
        short:
          'Este projeto visa desenvolver um robô de serviço autônomo com foco na participação no RoboCup @Home. O robô será projetado para realizar tarefas típicas em ambiente doméstico, como entrega de objetos, interação humana e navegação autônoma. Aproveitando as mais recentes tecnologias em robótica e inteligência artificial, o projeto será desenvolvido no contexto acadêmico do Instituto Mauá de Tecnologia, buscando avançar o conhecimento em áreas como sistemas embarcados, controle de movimento, processamento de linguagem natural e aprendizado de máquina.',
        full: 'Este projeto visa desenvolver um robô de serviço autônomo com foco na participação no RoboCup @Home. O robô será projetado para realizar tarefas típicas em ambiente doméstico, como entrega de objetos, interação humana e navegação autônoma. Aproveitando as mais recentes tecnologias em robótica e inteligência artificial, o projeto será desenvolvido no contexto acadêmico do Instituto Mauá de Tecnologia, buscando avançar o conhecimento em áreas como sistemas embarcados, controle de movimento, processamento de linguagem natural e aprendizado de máquina. A participação no RoboCup @Home apresentará um desafio significativo, onde o robô deve demonstrar habilidades de interação em tempo real, autonomia em ambientes dinâmicos e integração com sistemas complexos. O projeto também visa contribuir para o avanço da pesquisa em robótica de serviço, explorando soluções inovadoras para problemas do mundo real na coexistência humano-robô.'
      }
    },
    team: {
      title: 'Conheça Nossa Equipe',
      description:
        'O pessoal por trás do projeto Mirai, cada um trazendo expertise e paixão únicas para criar um robô doméstico inovador.',
      members: {
        'Pedro Matumoto': {
          position: 'Responsável pelo Software',
          bio: 'Responsável pela integração ROS2, processamento de áudio, IA conversacional, navegação, movimento autônomo, visão computacional e arquitetura geral do software.'
        },
        'Pedro Bauke': {
          position: 'Responsável pelo Software',
          bio: 'Responsável pela integração ROS2, navegação, movimento autônomo e arquitetura geral do software.'
        },
        'Aline Nunes': {
          position: 'Responsável pela Eletrônica',
          bio: 'Responsável pela eletrônica, controle do braço e tarefas gerais relacionadas ao controle do robô.'
        },
        'Eliana So': {
          position: 'Responsável pela Mecânica',
          bio: 'Responsável pelo design mecânico do robô e modelagem 3D, além de navegação e movimento autônomo.'
        },
        'Erick Wu': {
          position: 'Responsável pela Mecânica',
          bio: 'Responsável pela modelagem e controle do braço e tarefas relacionadas ao braço.'
        },
        'Anderson Harayashiki': {
          position: 'Professor Orientador',
          bio: 'Responsável pela orientação e gestão geral do projeto, bem como a integração das diferentes áreas do projeto e suporte técnico.'
        },
        'Maicon Koji': {
          position: 'Responsável pela Mecânica',
          bio: 'Responsável pelo design mecânico do robô e modelagem 3D.'
        }
      }
    },
    demoSchedule: {
      title: 'Horários das Demonstrações',
      description:
        'Confira nossas próximas demonstrações ao vivo. Veja quando a próxima demonstração começa!',
      nextDemo: 'Próxima Demonstração',
      timeUntilNext: 'Tempo até a próxima demonstração:',
      todaySchedule: 'Cronograma de Hoje',
      liveNow: 'AO VIVO AGORA',
      next: 'PRÓXIMA',
      demo: 'Demo',
      legend: {
        liveNow: 'Ao Vivo Agora',
        nextDemo: 'Próxima Demo',
        scheduled: 'Agendado'
      }
    },
    competition: {
      title: 'Sobre a competição',
      readMore: 'Ler mais',
      readLess: 'Ler menos',
      description: {
        short:
          'RoboCup@Home é uma das principais competições de robótica do mundo, focada no desenvolvimento de robôs de serviço capazes de interagir e auxiliar humanos em ambientes domésticos e sociais. Como parte do evento RoboCup maior, que promove pesquisa em inteligência artificial e robótica...',
        full: 'RoboCup@Home é uma das principais competições de robótica do mundo, focada no desenvolvimento de robôs de serviço capazes de interagir e auxiliar humanos em ambientes domésticos e sociais. Como parte do evento RoboCup maior, que promove pesquisa em inteligência artificial e robótica, a categoria @Home desafia equipes a projetar robôs autônomos que executam tarefas complexas do dia a dia, como reconhecer pessoas, entender comandos de voz, navegar em ambientes dinâmicos e manipular objetos com precisão. O objetivo principal da RoboCup@Home é impulsionar a inovação no desenvolvimento de robôs que podem melhorar a qualidade de vida das pessoas — seja auxiliando idosos e pessoas com deficiência ou otimizando atividades domésticas e ambientes de serviço público. A competição é dividida em diferentes desafios, cada um avaliando a capacidade do robô de perceber seu entorno, planejar ações, tomar decisões e interagir naturalmente com humanos. Participar da RoboCup@Home requer que as equipes tenham conhecimento profundo em áreas como visão computacional, aprendizado de máquina, processamento de linguagem natural, controle de movimento e integração de sistemas. A competição não apenas impulsiona avanços tecnológicos, mas também promove colaboração internacional e troca de conhecimento entre estudantes, pesquisadores e profissionais da área.'
      }
    },
    milestones: {
      title: 'Marcos de Desenvolvimento',
      description:
        'Nossa jornada de desenvolvimento desde as últimas conquistas até o início do projeto, com vídeos mostrando cada marco ao longo do caminho.',
      keyAchievements: 'Principais Conquistas:',
      items: [
        {
          date: 'Outubro 2025 - Presente',
          title: 'Preparação para Competição & Integração Final',
          description:
            'Integração final do sistema, testes abrangentes e preparação para a competição RoboCup @Home. Criação de materiais promocionais e otimização de desempenho.',
          achievements: [
            'Criação de vídeo promocional',
            'Integração de sistemas',
            'Otimização de desempenho',
            'Prontidão para competição'
          ]
        },
        {
          date: 'Terceira Semana de Setembro 2025',
          title: 'Conexão do braço com gêmeo virtual',
          description:
            'Integração bem-sucedida do braço robótico com o gêmeo virtual, permitindo simulação sincronizada e controle dos movimentos do braço.',
          achievements: [
            'Integração braço-gêmeo virtual',
            'Controle sincronizado',
            'Capacidades de simulação aprimoradas'
          ]
        },
        {
          date: 'Segunda Semana de Setembro 2025',
          title: 'Simulação do Braço e Implementação de Gêmeo Virtual',
          description:
            'Desenvolvimento de um gêmeo virtual para o braço robótico, permitindo simulação e teste de movimentos do braço em ambiente virtual antes da implementação física.',
          achievements: [
            'Criação de gêmeo virtual',
            'Simulação de movimentos do braço',
            'Testes pré-implementação'
          ]
        },
        {
          date: 'Primeira Semana de Setembro 2025',
          title: 'Implementação de Controle do Braço por Teclado',
          description:
            'Implementação e teste de sistema de controle manual por teclado para movimento preciso do robô e fins de depuração.',
          achievements: [
            'Interface de controle por teclado',
            'Precisão de movimento manual',
            'Sistema de controle para debug'
          ]
        },
        {
          date: 'Última Semana de Agosto 2025',
          title: 'Conquista de Movimento Autônomo',
          description:
            'Implementação bem-sucedida de capacidades de movimento totalmente autônomo, marcando um grande marco na independência do robô.',
          achievements: [
            'Navegação autônoma',
            'Movimento independente',
            'Execução de trajetória'
          ]
        },
        {
          date: 'Abril 2025',
          title: 'Integração de IA & Interação Humana',
          description:
            'Integração de IA conversacional, processamento de linguagem natural e capacidades de interação humano-robô. Sistemas de reconhecimento e resposta de voz.',
          achievements: [
            'Reconhecimento de voz',
            'Processamento de linguagem natural',
            'Interação humano-robô'
          ]
        },
        {
          date: 'Maio - Julho 2025',
          title: 'Testes de Movimento',
          description:
            'Validação de movimento baseado em encoder, testes iniciais de mobilidade manual.',
          achievements: ['Controle de movimento baseado em distância']
        },
        {
          date: 'Fevereiro - Abril 2025',
          title: 'Arquitetura de Software & Integração ROS2',
          description:
            'Desenvolvimento da arquitetura de software principal, implementação de nós ROS2 e sistemas de controle de motores. Protocolos de comunicação estabelecidos.',
          achievements: [
            'Arquitetura de nós ROS2',
            'Sistema de controle de motores',
            'Protocolos de comunicação'
          ]
        },
        {
          date: 'Outubro - Dezembro 2024',
          title: 'Design Mecânico & Prototipagem',
          description:
            'Design da estrutura mecânica do robô, modelagem 3D e montagem do primeiro protótipo físico. Desenvolvimento da plataforma base e mecanismo do braço.',
          achievements: [
            'Modelo 3D do robô',
            'Montagem da plataforma base',
            'Design do mecanismo do braço'
          ]
        },
        {
          date: 'Setembro 2024',
          title: 'Início do Projeto & Formação da Equipe',
          description:
            'Concepção inicial do projeto, montagem da equipe e planejamento para participação no RoboCup @Home. Fase de pesquisa e definição da stack tecnológica.',
          achievements: [
            'Formação da equipe',
            'Proposta do projeto',
            'Pesquisa inicial'
          ]
        }
      ]
    },
    contact: {
      title: 'Entre em Contato',
      description:
        'Quer saber mais sobre nosso projeto ou colaborar? Entre em contato com a equipe IMT @ Home.',
      instituteName: 'Instituto Mauá de Tecnologia',
      instituteDescription:
        'Nosso projeto é desenvolvido no Instituto Mauá de Tecnologia, uma instituição de engenharia líder no Brasil.',
      projectLinks: 'Links do Projeto',
      githubRepo: 'Repositório GitHub',
      githubDescription: 'Veja nosso código fonte',
      robocupHome: 'RoboCup @Home',
      robocupDescription: 'Site oficial da competição'
    }
  }
}

type DemoTime = {
  hour: number
  minute: number
  time: string
}

// Component for Demo Schedule Grid
function DemoScheduleGrid({ t }: { t: Translations['demoSchedule'] }) {
  const [, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Generate demo times (every 15 minutes starting at 14:00)
  const generateDemoTimes = (): DemoTime[] => {
    const times: DemoTime[] = []
    const startHour = 14
    const endHour = 18 // Until 18:00 (6 PM)

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        times.push({
          hour,
          minute,
          time: `${hour.toString().padStart(2, '0')}:${minute
            .toString()
            .padStart(2, '0')}`
        })
      }
    }
    return times
  }

  const demoTimes = generateDemoTimes()

  // Find next demo time
  const getNextDemo = (): DemoTime => {
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()

    const nextDemo = demoTimes.find((demo) => {
      return (
        demo.hour > currentHour ||
        (demo.hour === currentHour && demo.minute > currentMinute)
      )
    })

    return nextDemo || demoTimes[0] // If no more demos today, show first demo of next day
  }

  const nextDemo = getNextDemo()

  // Calculate time until next demo
  const getTimeUntilNextDemo = () => {
    const now = new Date()
    const nextDemoTime = new Date()
    nextDemoTime.setHours(nextDemo.hour, nextDemo.minute, 0, 0)

    // If next demo is tomorrow
    if (nextDemoTime <= now) {
      nextDemoTime.setDate(nextDemoTime.getDate() + 1)
    }

    const diff = nextDemoTime.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    return { hours, minutes, seconds }
  }

  const timeUntilNext = getTimeUntilNextDemo()

  // Check if a demo is currently happening
  const isCurrentDemo = (demo: DemoTime) => {
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()

    return (
      demo.hour === currentHour &&
      currentMinute >= demo.minute &&
      currentMinute < demo.minute + 15
    )
  }

  // Check if a demo is the next one
  const isNextDemo = (demo: DemoTime) => {
    return demo.hour === nextDemo.hour && demo.minute === nextDemo.minute
  }

  return (
    <div className="w-full max-w-4xl">
      {/* Next Demo Countdown */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardContent className="p-6 text-center">
          <h3 className="mb-2 text-xl font-bold">{t.nextDemo}</h3>
          <div className="mb-4 font-mono text-3xl font-bold text-blue-600 dark:text-blue-400">
            {nextDemo.time}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {t.timeUntilNext}
          </div>
          <div className="mt-2 font-mono text-lg font-semibold">
            {timeUntilNext.hours.toString().padStart(2, '0')}:
            {timeUntilNext.minutes.toString().padStart(2, '0')}:
            {timeUntilNext.seconds.toString().padStart(2, '0')}
          </div>
        </CardContent>
      </Card>

      {/* Demo Schedule Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">{t.todaySchedule}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {demoTimes.map((demo, index) => (
              <div
                key={index}
                className={`rounded-lg p-3 text-center transition-all duration-300 ${
                  isCurrentDemo(demo)
                    ? 'scale-105 bg-green-500 text-white shadow-lg'
                    : isNextDemo(demo)
                      ? 'scale-102 bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
                }`}
              >
                <div className="font-mono font-semibold">{demo.time}</div>
                <div className="mt-1 text-xs">
                  {isCurrentDemo(demo) ? (
                    <span className="font-bold">{t.liveNow}</span>
                  ) : isNextDemo(demo) ? (
                    <span className="font-bold">{t.next}</span>
                  ) : (
                    t.demo
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-green-500"></div>
                <span>{t.legend.liveNow}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-blue-500"></div>
                <span>{t.legend.nextDemo}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-gray-400"></div>
                <span>{t.legend.scheduled}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

type Integrant = {
  name: string
  img: string
  link: string
}

const integrants: Integrant[] = [
  {
    name: 'Pedro Matumoto',
    img: 'https://avatars.githubusercontent.com/u/85521574?v=4',
    link: 'https://www.linkedin.com/in/pedromatumoto/'
  },
  {
    name: 'Pedro Bauke',
    img: 'profile_photos/bauke.jpeg',
    link: 'https://www.linkedin.com/in/pedro-bauke-b1284a30b/'
  },
  {
    name: 'Aline Nunes',
    img: 'profile_photos/aline.jpeg',
    link: 'https://www.linkedin.com/in/alinenuneswatanabe/'
  },
  {
    name: 'Eliana So',
    img: 'profile_photos/eliana.jpeg',
    link: 'https://www.linkedin.com/in/eliana-so/'
  },
  {
    name: 'Erick Wu',
    img: 'profile_photos/erick.jpeg',
    link: 'https://www.linkedin.com/in/erick-wu-a19368209/'
  },
  {
    name: 'Anderson Harayashiki',
    img: 'profile_photos/anderson.jpeg',
    link: 'https://www.linkedin.com/in/andersonhm/'
  },
  {
    name: 'Maicon Koji',
    img: 'profile_photos/maicon.jpeg',
    link: 'https://www.linkedin.com/in/maicon-koji-778183207/'
  }
]

interface HomeProps {
  language: Language
  setLanguage?: (lang: Language) => void // Optional now since it's in navbar
}

export function Home({ language }: HomeProps) {
  const { theme } = useTheme()
  const [fade, setFade] = useState(false)
  const [showFullText, setShowFullText] = useState(false)
  const [showFullTextAbtComp, setShowFullTextAbtComp] = useState(false)
  const [currentGifIndex, setCurrentGifIndex] = useState(0)
  const [gifOpacity, setGifOpacity] = useState(1)

  // Get current translations
  const t = translations[language]

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
              {t.hero.title}
              <br />
              <span className="text-xl sm:text-3xl lg:text-4xl">
                {t.hero.subtitle}
              </span>
              <br />
              <br />
              <span className="text-lg sm:text-2xl lg:text-3xl">
                {t.hero.robotName}
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
                <span className="relative z-10">{t.hero.knowMore}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Call-to-Action Banner */}
      <div className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-4 py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 backdrop-blur-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-white sm:text-sm">
              🎯 Live Demonstrations
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            {t.demoBanner.title}
          </h2>
          <p className="mb-8 text-base text-white/90 sm:text-lg md:text-xl">
            {t.demoBanner.subtitle}
          </p>
          <button
            onClick={() =>
              document
                .getElementById('demo-schedule')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="group relative inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl sm:px-8 sm:py-4 sm:text-lg"
          >
            <span>{t.demoBanner.button}</span>
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8"
        id="about"
      >
        <h1 className="mb-8 text-center font-mont text-2xl font-bold transition-all duration-1000 sm:mb-12 sm:text-4xl">
          {t.about.title}
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
              {showFullText
                ? t.about.description.full
                : t.about.description.short}
            </p>
            <button
              className={`mt-6 self-center rounded-lg p-3 lg:self-start ${theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'} transition-all duration-1000 hover:bg-black hover:text-white`}
              onClick={handleToggleText}
            >
              {showFullText ? t.about.readLess : t.about.readMore}
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
            {t.team.title}
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
            {t.team.description}
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
                      {t.team.members[integrant.name]?.position}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400 sm:text-sm">
                      {t.team.members[integrant.name]?.bio}
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
          {t.competition.title}
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
              {showFullTextAbtComp
                ? t.competition.description.full
                : t.competition.description.short}
            </p>
            <button
              className="mt-4 rounded-lg bg-black p-3 text-white transition-all duration-1000 hover:bg-gray-800"
              onClick={handleToggleTextAbtComp}
            >
              {showFullTextAbtComp
                ? t.competition.readLess
                : t.competition.readMore}
            </button>
          </div>
        </div>
      </div>

      <div
        className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-16 sm:px-0"
        id="timeline"
      >
        <h1 className="mb-6 px-4 text-center font-mont text-xl font-bold transition-all duration-1000 sm:mb-8 sm:text-2xl md:text-3xl lg:text-4xl">
          {t.milestones.title}
        </h1>
        <p className="mb-8 w-full px-4 text-center text-sm leading-relaxed sm:text-base md:mb-10 md:w-2/3 lg:w-1/2">
          {t.milestones.description}
        </p>

        <div className="w-full max-w-6xl px-2 sm:px-4 md:px-6">
          <div className="space-y-6 sm:space-y-8">
            {(() => {
              const videos = [
                {
                  src: 'https://www.youtube.com/embed/EqAsmHjFv3U',
                  type: 'youtube' as const,
                  title: 'Mirai Robot - Promotional Video'
                },
                {
                  src: 'https://www.youtube.com/embed/5jP9ZgoEL1Q',
                  type: 'youtube' as const,
                  title: 'Robotic Arm Virtual Twin Integration'
                },
                {
                  src: 'https://www.youtube.com/embed/vkWkgSUY6bs',
                  type: 'youtube' as const,
                  title: 'Robotic Arm Virtual Twin Simulation'
                },
                {
                  src: 'https://www.youtube.com/embed/hjAr5C6vf2c',
                  type: 'youtube' as const,
                  title: 'Robot Keyboard Control Movement Test'
                },
                {
                  src: 'https://www.youtube.com/embed/5uOVR22IWbw',
                  type: 'youtube' as const,
                  title: 'Fully Autonomous Robot Movement'
                },
                {
                  src: 'https://www.youtube.com/embed/kKJjD6PnqGE',
                  type: 'youtube' as const,
                  title: 'AI Conversation & Interaction Demo'
                },
                {
                  src: '/walking_test.mp4',
                  type: 'video' as const,
                  title: 'Manual Mobility & Movement Test'
                },
                {
                  src: '/communication_test.mp4',
                  type: 'video' as const,
                  title: 'ROS2 Communication System Test'
                },
                {
                  src: '/robo-dancando.gif',
                  type: 'gif' as const,
                  title: 'Early Robot Movement Test'
                },
                null
              ]

              return t.milestones.items.map((milestone, index) => (
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
                      <CardContent className="p-4 sm:p-6">
                        <h3 className="mb-2 text-base font-bold sm:text-lg md:text-xl">
                          {milestone.title}
                        </h3>
                        <p className="mb-4 text-xs leading-relaxed text-gray-600 dark:text-gray-300 sm:text-sm md:text-base">
                          {milestone.description}
                        </p>

                        {/* Video Section */}
                        {videos[index] && (
                          <div className="mb-4">
                            <h4 className="mb-2 text-sm font-semibold sm:text-base md:text-sm">
                              {videos[index]!.title}
                            </h4>
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                              {videos[index]!.type === 'youtube' ? (
                                <iframe
                                  className="h-full w-full"
                                  src={videos[index]!.src}
                                  title={videos[index]!.title}
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  allowFullScreen
                                />
                              ) : videos[index]!.type === 'gif' ? (
                                <img
                                  src={videos[index]!.src}
                                  alt={videos[index]!.title}
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
                                    src={videos[index]!.src}
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
                            {t.milestones.keyAchievements}
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
              ))
            })()}
          </div>
        </div>
      </div>

      {/* Demo Schedule Section */}
      <div
        className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8"
        id="demo-schedule"
      >
        <div className="mb-8 text-center sm:mb-12">
          <h1 className="mb-4 font-mont text-2xl font-bold transition-all duration-1000 sm:text-3xl md:text-4xl lg:text-5xl">
            {t.demoSchedule.title}
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
            {t.demoSchedule.description}
          </p>
        </div>

        <DemoScheduleGrid t={t.demoSchedule} />
      </div>

      <div
        className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-16 sm:px-0"
        id="contact"
      >
        <h1 className="mb-8 text-center font-mont text-2xl font-bold transition-all duration-1000 sm:text-4xl">
          {t.contact.title}
        </h1>
        <p className="mb-10 w-full text-center md:w-2/3 lg:w-1/2">
          {t.contact.description}
        </p>

        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="text-2xl">🏫</div>
                  {t.contact.instituteName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                  {t.contact.instituteDescription}
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
                  {t.contact.projectLinks}
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
                      <div className="font-semibold">
                        {t.contact.githubRepo}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">
                        {t.contact.githubDescription}
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
                      <div className="font-semibold">
                        {t.contact.robocupHome}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">
                        {t.contact.robocupDescription}
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
