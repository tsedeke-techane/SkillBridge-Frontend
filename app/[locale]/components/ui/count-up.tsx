"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface CountUpProps {
  end: number | string
  duration?: number
  className?: string
  suffix?: string
}

export function CountUp({ end, duration = 2, className = "", suffix = "" }: CountUpProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const endValue = typeof end === "string" ? Number.parseInt(end.replace(/[^0-9]/g, "")) : end

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const countUp = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      // Use easeOutExpo for a nice deceleration at the end
      const easeOutExpo = 1 - Math.pow(2, -10 * progress)
      setCount(Math.floor(easeOutExpo * endValue))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(countUp)
      }
    }

    animationFrame = requestAnimationFrame(countUp)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isInView, endValue, duration])

  return (
    <motion.div ref={ref} className={className}>
      {count}
      {suffix}
    </motion.div>
  )
}
