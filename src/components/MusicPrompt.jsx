"use client"

import { motion } from "motion/react"
import { Music, Volume2, VolumeX } from "lucide-react"

export default function MusicPrompt({ onStart }) {
  const handleStart = (withMusic) => {
    onStart(withMusic)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center text-white px-6 py-8 relative"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255,105,180,0.15) 0%, transparent 60%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center space-y-8"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Music className="w-20 h-20 text-pink-400 mx-auto" style={{ filter: "drop-shadow(0 0 20px rgba(255,105,180,0.6))" }} />
        </motion.div>

        <div className="space-y-4">
          <motion.h1
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400 bg-clip-text text-transparent"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            A Special Surprise Awaits
          </motion.h1>
          <p className="text-pink-200 text-lg">Would you like to experience it with music?</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleStart(true)}
            className="flex items-center gap-3 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg"
            style={{ boxShadow: "0 0 25px rgba(255,105,180,0.5)" }}
          >
            <Volume2 className="w-5 h-5" />
            Play with Music
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleStart(false)}
            className="flex items-center gap-3 bg-white/10 backdrop-blur-sm text-pink-200 px-8 py-4 rounded-full font-semibold text-lg border border-pink-400/30 hover:bg-white/20 transition-colors"
          >
            <VolumeX className="w-5 h-5" />
            Continue without Music
          </motion.button>
        </div>

        <motion.p
          className="text-pink-300/60 text-sm"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          For the best experience, use headphones
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
