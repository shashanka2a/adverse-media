'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger)

export function ScrollAnimations() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Detect if device supports touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    
    // Setup Lenis (Smooth Scroll)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: isTouchDevice ? 2 : 1.5, // Higher multiplier for touch devices
      wheelMultiplier: 1, // Standard for mouse wheel
      smoothWheel: true, // Smooth scrolling for mouse wheel on desktop
      smoothTouch: isTouchDevice ? true : false, // Enable smooth touch on mobile
      infinite: false,
    } as any)

    lenisRef.current = lenis

    // Sync Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)
    
    // Use requestAnimationFrame for smooth updates
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    
    // Also sync with GSAP ticker for compatibility
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    const sections = gsap.utils.toArray('.panel') as HTMLElement[]
    const progressBar = document.getElementById('progress-bar')
    const frameDisplay = document.getElementById('frame-display')

    // Horizontal Scroll Animation
    const scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: '.wrapper',
        pin: true,
        scrub: 1,
        end: () => '+' + window.innerWidth * 4,
        onUpdate: (self) => {
          // Update Progress Bar
          if (progressBar) {
            gsap.to(progressBar, {
              width: `${self.progress * 100}%`,
              duration: 0.1,
              ease: 'none',
            })
          }

          // Update Frame Counter
          if (frameDisplay) {
            const currentFrame = Math.min(
              Math.round(self.progress * (sections.length - 1)) + 1,
              sections.length
            )
            frameDisplay.innerText = `00${currentFrame}`
          }
        },
      },
    })

    // Parallax Effect for Images inside panels
    sections.forEach((section) => {
      const img = section.querySelector<HTMLElement>('.parallax-img img')
      if (img) {
        gsap.to(img, {
          x: '10%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            containerAnimation: scrollTween,
            start: 'left right',
            end: 'right left',
            scrub: true,
          },
        })
      }

      // Text Reveal Animation
      const texts = section.querySelectorAll<HTMLElement>('.reveal-text')
      if (texts.length > 0) {
        gsap.to(texts, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            containerAnimation: scrollTween,
            start: 'left center',
            toggleActions: 'play none none reverse',
          },
        })
        gsap.set(texts, { y: 30 })
      }
    })

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return null
}

