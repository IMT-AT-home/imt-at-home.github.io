import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

export type PillNavItem = {
  label: string
  href: string
  ariaLabel?: string
}

export interface PillNavProps {
  logo: string
  logoAlt?: string
  items: PillNavItem[]
  activeHref?: string
  className?: string
  ease?: string
  baseColor?: string
  pillColor?: string
  hoveredPillTextColor?: string
  pillTextColor?: string
  onMobileMenuClick?: () => void
  initialLoadAnimation?: boolean
}

const PillNav: React.FC<PillNavProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#fff',
  pillColor = '#060010',
  hoveredPillTextColor = '#060010',
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNavVisible, setIsNavVisible] = useState(true)
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([])
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([])
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([])
  const logoImgRef = useRef<HTMLImageElement | null>(null)
  const logoTweenRef = useRef<gsap.core.Tween | null>(null)
  const hamburgerRef = useRef<HTMLButtonElement | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)
  const navItemsRef = useRef<HTMLDivElement | null>(null)
  const logoRef = useRef<HTMLAnchorElement | HTMLElement | null>(null)
  const navContainerRef = useRef<HTMLDivElement | null>(null)
  const lastScrollY = useRef(0)
  const navTween = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return

        const pill = circle.parentElement as HTMLElement
        const rect = pill.getBoundingClientRect()
        const { width: w, height: h } = rect
        const R = ((w * w) / 4 + h * h) / (2 * h)
        const D = Math.ceil(2 * R) + 2
        const delta =
          Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1
        const originY = D - delta

        circle.style.width = `${D}px`
        circle.style.height = `${D}px`
        circle.style.bottom = `-${delta}px`

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        })

        const label = pill.querySelector<HTMLElement>('.pill-label')
        const white = pill.querySelector<HTMLElement>('.pill-label-hover')

        if (label) gsap.set(label, { y: 0 })
        if (white) gsap.set(white, { y: h + 12, opacity: 0 })

        const index = circleRefs.current.indexOf(circle)
        if (index === -1) return

        tlRefs.current[index]?.kill()
        const tl = gsap.timeline({ paused: true })

        tl.to(
          circle,
          { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' },
          0
        )

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0)
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 })
          tl.to(
            white,
            { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' },
            0
          )
        }

        tlRefs.current[index] = tl
      })
    }

    layout()

    const onResize = () => layout()
    window.addEventListener('resize', onResize)

    if (document.fonts) {
      document.fonts.ready.then(layout).catch(() => {})
    }

    const menu = mobileMenuRef.current
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1, y: 0 })
    }

    if (initialLoadAnimation) {
      const logo = logoRef.current
      const navItems = navItemsRef.current

      if (logo) {
        gsap.set(logo, { scale: 0 })
        gsap.to(logo, {
          scale: 1,
          duration: 0.6,
          ease
        })
      }

      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: 'hidden' })
        gsap.to(navItems, {
          width: 'auto',
          duration: 0.6,
          ease
        })
      }
    }

    return () => window.removeEventListener('resize', onResize)
  }, [items, ease, initialLoadAnimation])

  // Scroll behavior effect
  useEffect(() => {
    let isScrolling = false

    const handleScroll = () => {
      if (isScrolling) return

      isScrolling = true
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        const scrollingUp = currentScrollY < lastScrollY.current
        const atTop = currentScrollY <= 50

        // Show navbar if at top or scrolling up
        const shouldShow = atTop || scrollingUp

        if (navContainerRef.current) {
          navTween.current?.kill()

          if (shouldShow && !isNavVisible) {
            setIsNavVisible(true)
            navTween.current = gsap.to(navContainerRef.current, {
              transform: 'translateX(-50%) translateY(0px)',
              opacity: 1,
              duration: 0.4,
              ease
            })
          } else if (!shouldShow && isNavVisible) {
            setIsNavVisible(false)
            navTween.current = gsap.to(navContainerRef.current, {
              transform: 'translateX(-50%) translateY(-100px)',
              opacity: 0,
              duration: 0.3,
              ease
            })
          }
        }

        lastScrollY.current = Math.max(0, currentScrollY)
        isScrolling = false
      })
    }

    // Initial state
    if (navContainerRef.current) {
      gsap.set(navContainerRef.current, {
        transform: 'translateX(-50%) translateY(0px)',
        opacity: 1
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      navTween.current?.kill()
    }
  }, [isNavVisible, ease])

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i]
    if (!tl) return
    activeTweenRefs.current[i]?.kill()
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto'
    })
  }

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i]
    if (!tl) return
    activeTweenRefs.current[i]?.kill()
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto'
    })
  }

  const handleLogoEnter = () => {
    const img = logoImgRef.current
    if (!img) return
    logoTweenRef.current?.kill()
    gsap.set(img, { rotate: 0 })
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.2,
      ease,
      overwrite: 'auto'
    })
  }

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen
    setIsMobileMenuOpen(newState)

    const hamburger = hamburgerRef.current
    const menu = mobileMenuRef.current

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line')
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease })
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease })
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease })
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease })
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' })
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease,
            transformOrigin: 'top center'
          }
        )
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease,
          transformOrigin: 'top center',
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' })
          }
        })
      }
    }

    onMobileMenuClick?.()
  }

  const isExternalLink = (href: string) =>
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#')

  const isRouterLink = (href?: string) => href && !isExternalLink(href)

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        })
      }
    }
  }

  const cssVars = {
    ['--base']: baseColor,
    ['--pill-bg']: pillColor,
    ['--hover-text']: hoveredPillTextColor,
    ['--pill-text']: resolvedPillTextColor,
    ['--nav-h']: '42px',
    ['--logo']: '36px',
    ['--pill-pad-x']: '18px',
    ['--pill-gap']: '3px'
  } as React.CSSProperties

  return (
    <div
      ref={navContainerRef}
      className="pill-nav-container fixed left-1/2 top-[1em] z-[1000] w-full max-w-[calc(100vw-2rem)] -translate-x-1/2 md:w-auto md:max-w-none"
    >
      <nav
        className={`box-border flex w-full items-center justify-between px-2 sm:px-4 md:w-max md:justify-center md:px-0 ${className}`}
        aria-label="Primary"
        style={cssVars}
      >
        {isRouterLink(items?.[0]?.href) ? (
          <Link
            to={items[0].href}
            aria-label="Home"
            onMouseEnter={handleLogoEnter}
            role="menuitem"
            ref={(el) => {
              logoRef.current = el
            }}
            className="inline-flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full p-2"
            style={{
              width: 'var(--nav-h)',
              height: 'var(--nav-h)',
              background: 'var(--base, #000)',
              minWidth: 'var(--nav-h)'
            }}
          >
            <img
              src={logo}
              alt={logoAlt}
              ref={logoImgRef}
              className="block h-full w-full object-cover"
            />
          </Link>
        ) : (
          <a
            href={items?.[0]?.href || '#'}
            aria-label="Home"
            onMouseEnter={handleLogoEnter}
            ref={(el) => {
              logoRef.current = el
            }}
            className="inline-flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full p-2"
            style={{
              width: 'var(--nav-h)',
              height: 'var(--nav-h)',
              background: 'var(--base, #000)',
              minWidth: 'var(--nav-h)'
            }}
          >
            <img
              src={logo}
              alt={logoAlt}
              ref={logoImgRef}
              className="block h-full w-full object-cover"
            />
          </a>
        )}

        <div
          ref={navItemsRef}
          className="relative ml-2 hidden items-center rounded-full md:flex"
          style={{
            height: 'var(--nav-h)',
            background: 'var(--base, #000)'
          }}
        >
          <ul
            role="menubar"
            className="m-0 flex h-full list-none items-stretch p-[3px]"
            style={{ gap: 'var(--pill-gap)' }}
          >
            {items.map((item, i) => {
              const isActive = activeHref === item.href

              const pillStyle: React.CSSProperties = {
                background: 'var(--pill-bg, #fff)',
                color: 'var(--pill-text, var(--base, #000))',
                paddingLeft: 'var(--pill-pad-x)',
                paddingRight: 'var(--pill-pad-x)'
              }

              const PillContent = (
                <>
                  <span
                    className="hover-circle pointer-events-none absolute bottom-0 left-1/2 z-[1] block rounded-full"
                    style={{
                      background: 'var(--base, #000)',
                      willChange: 'transform'
                    }}
                    aria-hidden="true"
                    ref={(el) => {
                      circleRefs.current[i] = el
                    }}
                  />
                  <span className="label-stack relative z-[2] inline-block leading-[1]">
                    <span
                      className="pill-label relative z-[2] inline-block leading-[1]"
                      style={{ willChange: 'transform' }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                      style={{
                        color: 'var(--hover-text, #fff)',
                        willChange: 'transform, opacity'
                      }}
                      aria-hidden="true"
                    >
                      {item.label}
                    </span>
                  </span>
                  {isActive && (
                    <span
                      className="absolute -bottom-[6px] left-1/2 z-[4] h-3 w-3 -translate-x-1/2 rounded-full"
                      style={{ background: 'var(--base, #000)' }}
                      aria-hidden="true"
                    />
                  )}
                </>
              )

              const basePillClasses =
                'relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-semibold text-[16px] leading-[0] uppercase tracking-[0.2px] whitespace-nowrap cursor-pointer px-0'

              return (
                <li key={item.href} role="none" className="flex h-full">
                  {isRouterLink(item.href) ? (
                    <Link
                      role="menuitem"
                      to={item.href}
                      className={basePillClasses}
                      style={pillStyle}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                    >
                      {PillContent}
                    </Link>
                  ) : (
                    <a
                      role="menuitem"
                      href={item.href}
                      className={basePillClasses}
                      style={pillStyle}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                      onClick={(e) => handleAnchorClick(e, item.href)}
                    >
                      {PillContent}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <button
          ref={hamburgerRef}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          className="relative flex flex-shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-full border-0 p-0 md:hidden"
          style={{
            width: 'var(--nav-h)',
            height: 'var(--nav-h)',
            background: 'var(--base, #000)',
            minWidth: 'var(--nav-h)'
          }}
        >
          <span
            className="hamburger-line duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] h-0.5 w-4 origin-center rounded transition-all"
            style={{ background: 'var(--pill-bg, #fff)' }}
          />
          <span
            className="hamburger-line duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] h-0.5 w-4 origin-center rounded transition-all"
            style={{ background: 'var(--pill-bg, #fff)' }}
          />
        </button>
      </nav>

      <div
        ref={mobileMenuRef}
        className="pill-nav-mobile-menu absolute left-2 right-2 top-[3em] z-[998] origin-top rounded-[27px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] md:hidden"
        style={{
          ...cssVars,
          background: 'var(--base, #f0f0f0)',
          maxWidth: 'calc(100vw - 1rem)',
          width: 'auto'
        }}
      >
        <ul className="m-0 flex list-none flex-col gap-[2px] p-[2px]">
          {items.map((item) => {
            const defaultStyle: React.CSSProperties = {
              background: 'var(--pill-bg, #fff)',
              color: 'var(--pill-text, #fff)'
            }
            const hoverIn = (e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.background = 'var(--base)'
              e.currentTarget.style.color = 'var(--hover-text, #fff)'
            }
            const hoverOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.background = 'var(--pill-bg, #fff)'
              e.currentTarget.style.color = 'var(--pill-text, #fff)'
            }

            const linkClasses =
              'pill-nav-mobile-item block py-2.5 px-3 text-[14px] sm:text-[16px] font-medium rounded-[50px] transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] whitespace-nowrap overflow-hidden text-ellipsis'

            return (
              <li key={item.href}>
                {isRouterLink(item.href) ? (
                  <Link
                    to={item.href}
                    className={linkClasses}
                    style={defaultStyle}
                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={linkClasses}
                    style={defaultStyle}
                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                    onClick={(e) => {
                      handleAnchorClick(e, item.href)
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default PillNav
