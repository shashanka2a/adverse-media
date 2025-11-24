'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const interactables = document.querySelectorAll('.interactable, a, button')

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      })
    }

    const handleMouseEnter = (el: Element) => {
      cursor.classList.add('hovered')
      const text = el.getAttribute('data-cursor-text') || 'VIEW'
      cursor.setAttribute('data-text', text)
    }

    const handleMouseLeave = () => {
      cursor.classList.remove('hovered')
      cursor.setAttribute('data-text', '')
    }

    document.addEventListener('mousemove', handleMouseMove)

    interactables.forEach((el) => {
      el.addEventListener('mouseenter', () => handleMouseEnter(el))
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', () => handleMouseEnter(el))
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return <div id="cursor" ref={cursorRef} />
}

