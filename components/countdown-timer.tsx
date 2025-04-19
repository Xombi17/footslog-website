"use client"

import { useState, useEffect } from "react"

type CountdownTimerProps = {
  targetDate: Date | string
  className?: string
}

type TimeUnitProps = {
  value: number
  label: string
}

export default function CountdownTimer({ targetDate, className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Update the count down every 1 second
    const updateTimer = () => {
      // Get today's date and time
      const now = new Date().getTime()
      
      // Find the distance between now and the count down date
      const distance = new Date(targetDate).getTime() - now
      
      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)
      
      setTimeLeft({ days, hours, minutes, seconds })
    }
    
    // Initial update
    updateTimer()
    
    // Set up interval
    const interval = setInterval(updateTimer, 1000)
    
    // Clean up interval
    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <div className={`flex gap-4 ${className}`}>
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  )
}

function TimeUnit({ value, label }: TimeUnitProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-green-800/80 border border-green-700 rounded-lg w-16 h-16 flex items-center justify-center mb-1">
        <span className="text-2xl font-bold text-amber-400">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs text-amber-200/80">{label}</span>
    </div>
  )
} 