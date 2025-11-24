'use client'

import { useEffect, useRef } from 'react'

export function Sprockets() {
  const topStripRef = useRef<HTMLDivElement>(null)
  const bottomStripRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const generateSprockets = () => {
      const topStrip = topStripRef.current
      const bottomStrip = bottomStripRef.current
      if (!topStrip || !bottomStrip) return

      topStrip.innerHTML = ''
      bottomStrip.innerHTML = ''

      const totalWidth = window.innerWidth * 6 // 6 panels
      const isMobile = window.innerWidth < 768
      const holeSize = isMobile ? 16 + 16 : 28 + 32
      const count = Math.ceil(totalWidth / holeSize)

      const createHole = () => {
        const hole = document.createElement('div')
        hole.className = 'sprocket-hole'
        return hole
      }

      for (let i = 0; i < count; i++) {
        topStrip.appendChild(createHole())
        bottomStrip.appendChild(createHole())
      }
    }

    generateSprockets()
    window.addEventListener('resize', generateSprockets)

    return () => {
      window.removeEventListener('resize', generateSprockets)
    }
  }, [])

  return (
    <>
      <div ref={topStripRef} className="sprocket-strip sprocket-top" />
      <div ref={bottomStripRef} className="sprocket-strip sprocket-bottom" />
    </>
  )
}

