"use client"

import { useEffect, useRef, useMemo } from "react"
import { motion } from "motion/react"

function FallingPetals() {
  const petals = useMemo(() => 
    [...Array(20)].map((_, i) => ({
      id: i,
      left: (i * 5) % 100,
      delay: i * 0.5,
      duration: 12 + (i % 5) * 2,
      size: 10 + (i % 4) * 3,
      swayAmount: 80 + (i % 3) * 20,
      color1: 140 + (i % 4) * 15,
      color2: 170 + (i % 3) * 10,
      color3: 180 + (i % 3) * 12,
      color4: 200 + (i % 2) * 8,
    })), [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.left}%`,
            top: -30,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, Math.sin(petal.id) * petal.swayAmount, -Math.sin(petal.id) * petal.swayAmount * 0.5, 0],
            rotate: [0, 360 * (petal.id % 2 === 0 ? 1 : -1)],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.2}
            viewBox="0 0 24 28"
            style={{
              filter: `drop-shadow(0 0 3px rgba(255, 150, 180, 0.5))`,
              opacity: 0.75,
            }}
          >
            <ellipse
              cx="12"
              cy="14"
              rx="10"
              ry="12"
              fill={`rgba(255, ${petal.color1}, ${petal.color2}, 0.85)`}
            />
            <ellipse
              cx="12"
              cy="14"
              rx="6"
              ry="8"
              fill={`rgba(255, ${petal.color3}, ${petal.color4}, 0.6)`}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

function FloatingSparkles() {
  const sparkles = useMemo(() => 
    [...Array(15)].map((_, i) => ({
      id: i,
      width: 3 + (i % 3),
      left: (i * 7) % 100,
      top: (i * 6.5) % 100,
      shadowSize: 8 + (i % 4) * 2,
      duration: 3 + (i % 3),
      delay: i * 0.2,
    })), [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[2]">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full"
          style={{
            width: sparkle.width,
            height: sparkle.width,
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            background: `radial-gradient(circle, rgba(255, 255, 255, 0.9), rgba(255, 200, 220, 0.6))`,
            boxShadow: `0 0 ${sparkle.shadowSize}px rgba(255, 180, 200, 0.7)`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

function BackgroundMusic() {
  const audioRef = useRef(null)
  const hasPlayedRef = useRef(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.4

    const tryPlay = async () => {
      if (hasPlayedRef.current) return
      try {
        await audio.play()
        hasPlayedRef.current = true
      } catch (err) {
        console.log("Autoplay blocked, waiting for user interaction")
      }
    }

    tryPlay()

    const handleInteraction = async () => {
      if (hasPlayedRef.current || !audio) return
      try {
        await audio.play()
        hasPlayedRef.current = true
      } catch (err) {
        console.log("Still cannot play audio")
      }
    }

    document.addEventListener("click", handleInteraction)
    document.addEventListener("touchstart", handleInteraction)
    document.addEventListener("keydown", handleInteraction)

    return () => {
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("touchstart", handleInteraction)
      document.removeEventListener("keydown", handleInteraction)
    }
  }, [])

  return (
    <audio
      ref={audioRef}
      src="/audio/bg.mp3"
      loop
      preload="auto"
      style={{ display: "none" }}
    />
  )
}

export default function AmbientEffects() {
  return (
    <>
      <FallingPetals />
      <FloatingSparkles />
      <BackgroundMusic />
    </>
  )
}
