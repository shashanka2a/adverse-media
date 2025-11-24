'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export function Countdown() {
  const [count, setCount] = useState(5)
  const countdownRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = countdownRef.current
    if (!el) return

    let currentCount = 5

    const interval = setInterval(() => {
      currentCount--
      if (currentCount > 0) {
        setCount(currentCount)
        gsap.fromTo(
          el,
          { scale: 1.2, filter: 'blur(4px)' },
          { scale: 1, filter: 'blur(0px)', duration: 0.2, ease: 'power2.out' }
        )
      } else if (currentCount === 0) {
        setCount(0)
        el.textContent = 'ACTN'
        el.style.fontSize = window.innerWidth < 768 ? '4rem' : '8rem'
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span
      ref={countdownRef}
      className="text-[8rem] md:text-[16rem] font-oswald font-bold text-celluloid-cream tabular-nums leading-none mt-4"
    >
      {count > 0 ? count : 'ACTN'}
    </span>
  )
}

