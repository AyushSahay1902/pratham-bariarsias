'use client'

import { useEffect, useState } from 'react'

interface Stat {
  number: number
  label: string
  suffix?: string
  format?: (n: number) => string
}

interface AnimatedStatsProps {
  stats: Stat[]
}

function AnimatedCounter({ stat }: { stat: Stat }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [ref, setRef] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true)
      }
    })

    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref, isVisible])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000 // 2 seconds animation
    const steps = 60
    const stepDuration = duration / steps
    const incrementPerStep = stat.number / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      setCount(Math.floor(incrementPerStep * currentStep))

      if (currentStep >= steps) {
        setCount(stat.number)
        clearInterval(interval)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [isVisible, stat.number])

  return (
    <div ref={setRef} className="space-y-2 text-center">
      <p className="text-4xl font-bold" style={{ color: 'var(--brand-primary)' }}>
        {stat.format ? stat.format(count) : count}
        {stat.suffix}
      </p>
      <p className="text-gray-600">{stat.label}</p>
    </div>
  )
}

export function AnimatedStats({ stats }: AnimatedStatsProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
      <div className="grid md:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <AnimatedCounter key={idx} stat={stat} />
        ))}
      </div>
    </section>
  )
}
