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
      touchMultiplier: isTouchDevice ? 2 : 1.5,
      wheelMultiplier: 1,
      smoothWheel: true,
      smoothTouch: isTouchDevice ? true : false,
      infinite: false,
    } as any)

    lenisRef.current = lenis

    // Sync Lenis with ScrollTrigger - this is critical
    lenis.on('scroll', ScrollTrigger.update)
    
    // Use requestAnimationFrame for smooth updates
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    
    const progressBar = document.getElementById('progress-bar')
    const frameDisplay = document.getElementById('frame-display')

    // Wait for DOM to be ready
    const initScrollTrigger = () => {
      const sections = gsap.utils.toArray('.panel') as HTMLElement[]
      
      if (sections.length === 0) {
        setTimeout(initScrollTrigger, 100)
        return
      }

      // Horizontal Scroll Animation
      const scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: '.wrapper',
          pin: true,
          scrub: 1,
          end: () => '+' + window.innerWidth * 4,
          invalidateOnRefresh: true,
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

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh()
    }

    // Initialize after a short delay to ensure DOM is ready
    setTimeout(initScrollTrigger, 200)


    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return null
}

