"use client"

import { motion } from "motion/react"
import { useEffect, useState } from "react"
import { Heart, Sparkles } from "lucide-react"

export default function HeartReveal({ onComplete }) {
  const [showText, setShowText] = useState(false)
  const [heartOpened, setHeartOpened] = useState(false)
  const [showFallingHearts, setShowFallingHearts] = useState(false)

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 2000)
    const openTimer = setTimeout(() => {
      setHeartOpened(true)
      setShowFallingHearts(true)
    }, 2500)
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 7000)

    return () => {
      clearTimeout(textTimer)
      clearTimeout(openTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  const fallingHearts = [...Array(30)].map((_, i) => ({
    id: i,
    startX: (Math.random() - 0.5) * 100,
    endX: (Math.random() - 0.5) * 300,
    endY: 300 + Math.random() * 200,
    size: 8 + Math.random() * 16,
    delay: i * 0.08,
    duration: 2 + Math.random() * 1.5,
    rotation: Math.random() * 720 - 360,
    color: ['#FF69B4', '#FFB6C1', '#FF1493', '#FFC0CB', '#FF85A2', '#FFD1DC'][Math.floor(Math.random() * 6)]
  }))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="relative">
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="relative"
        >
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-pink-400 rounded-full blur-3xl opacity-40"
            style={{ transform: "scale(1.5)" }}
          />
        </motion.div>

        <motion.div
          initial={{ x: 0, rotate: 0, opacity: 1 }}
          animate={{ 
            x: heartOpened ? -140 : 0, 
            rotate: heartOpened ? -50 : 0, 
            opacity: heartOpened ? 0 : 1 
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="relative z-10"
        >
          <Heart
            className="w-52 h-52 text-pink-400 fill-current"
            style={{ 
              clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
              filter: "drop-shadow(0 0 20px rgba(255,105,180,0.6))"
            }}
          />
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-pink-400 rounded-full blur-2xl opacity-40"
          />
        </motion.div>

        <motion.div
          initial={{ x: 0, rotate: 0, opacity: 1 }}
          animate={{ 
            x: heartOpened ? 140 : 0, 
            rotate: heartOpened ? 50 : 0, 
            opacity: heartOpened ? 0 : 1 
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute top-0 left-0 z-10"
        >
          <Heart
            className="w-52 h-52 text-pink-400 fill-current"
            style={{ 
              clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
              filter: "drop-shadow(0 0 20px rgba(255,105,180,0.6))"
            }}
          />
        </motion.div>

        {showFallingHearts && fallingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ 
              opacity: 0, 
              scale: 0, 
              x: heart.startX, 
              y: 0 
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.2, 1.2, 1, 0.6],
              x: heart.endX,
              y: heart.endY,
              rotate: heart.rotation,
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              ease: "easeOut",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <Heart 
              style={{ 
                width: heart.size, 
                height: heart.size, 
                color: heart.color,
                fill: heart.color,
                filter: "drop-shadow(0 0 8px rgba(255,105,180,0.5))"
              }} 
            />
          </motion.div>
        ))}

        {[...Array(16)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.2, 1.8, 0],
              x: Math.cos((i * 22.5 * Math.PI) / 180) * 180,
              y: Math.sin((i * 22.5 * Math.PI) / 180) * 180,
            }}
            transition={{
              delay: 2.6 + i * 0.08,
              duration: 2,
              ease: "easeOut",
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <Sparkles className="w-6 h-6 text-yellow-300" style={{ filter: "drop-shadow(0 0 5px rgba(255,215,0,0.8))" }} />
          </motion.div>
        ))}
      </div>

      {showText && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.8 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute bottom-20 text-center px-6"
        >
          <motion.div 
            className="bg-white/10 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/20"
            animate={{
              boxShadow: [
                "0 0 20px rgba(255,105,180,0.3)",
                "0 0 40px rgba(255,105,180,0.5)",
                "0 0 20px rgba(255,105,180,0.3)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-3xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
              My heart opens for you...
            </p>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
