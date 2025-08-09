"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedTextProps {
  text: string | ReactNode
  className?: string
  once?: boolean
  delay?: number
}

export function AnimatedText({ text, className = "", once = true, delay = 0 }: AnimatedTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once }}
      className={className}
    >
      {text}
    </motion.div>
  )
}
