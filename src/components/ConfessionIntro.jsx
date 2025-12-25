"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Heart, Sparkles } from "lucide-react"

function BeautifulRose({ onClick, isBlooming }) {
  return (
    <motion.div
      className="relative cursor-pointer flex flex-col items-center"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 300,
          height: 300,
          background: "radial-gradient(circle, rgba(255,182,193,0.6) 0%, rgba(255,105,180,0.4) 40%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{
          opacity: isBlooming ? [0.7, 1, 0.85] : [0.5, 0.8, 0.5],
          scale: isBlooming ? [1.2, 1.6, 1.4] : [1, 1.3, 1],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="relative w-56 h-56 md:w-64 md:h-64 flex items-center justify-center"
        animate={{
          scale: isBlooming ? [1, 1.15, 1.1] : [1, 1.03, 1],
          filter: isBlooming
            ? "drop-shadow(0 0 40px rgba(255,182,193,1)) drop-shadow(0 0 80px rgba(255,105,180,0.7))"
            : "drop-shadow(0 0 25px rgba(255,182,193,0.8)) drop-shadow(0 0 50px rgba(255,105,180,0.4))",
        }}
        transition={{ duration: isBlooming ? 1.5 : 3, repeat: isBlooming ? 0 : Infinity, ease: "easeInOut" }}
      >
        <motion.img 
          src="/images/rose.jpg" 
          alt="Rose"
          className="w-full h-full object-cover rounded-full border-4 border-pink-200/50 shadow-2xl"
          initial={{ rotate: 0 }}
          animate={{ 
            rotate: isBlooming ? [0, 5, -5, 0] : 0,
            scale: isBlooming ? [1, 1.1, 1] : 1
          }}
          transition={{ duration: 2, repeat: isBlooming ? Infinity : 0 }}
        />
      </motion.div>

      {isBlooming && [...Array(20)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            left: `${50 + Math.cos((i * 18 * Math.PI) / 180) * 50}%`,
            top: `${45 + Math.sin((i * 18 * Math.PI) / 180) * 45}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 1.8,
            delay: 0.2 + i * 0.1,
            repeat: Infinity,
            repeatDelay: 0.8,
          }}
        >
          <Sparkles className="w-4 h-4 text-pink-200" style={{ filter: "drop-shadow(0 0 5px rgba(255,182,193,0.8))" }} />
        </motion.div>
      ))}

      {isBlooming && [...Array(12)].map((_, i) => (
        <motion.div
          key={`petal-fall-${i}`}
          className="absolute"
          initial={{ 
            opacity: 0, 
            x: (Math.random() - 0.5) * 40,
            y: 0,
            rotate: 0,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: (Math.random() - 0.5) * 150,
            y: 200,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 3,
            delay: 0.5 + i * 0.15,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          <Heart className="w-4 h-4 text-pink-300 fill-pink-300" style={{ filter: "drop-shadow(0 0 4px rgba(255,182,193,0.6))" }} />
        </motion.div>
      ))}
      
      {!isBlooming && (
        <motion.p
          className="text-center mt-6 text-pink-300 text-base font-medium"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Tap the rose 🌹
        </motion.p>
      )}
    </motion.div>
  )
}

export default function ConfessionIntro({ onComplete }) {
  const [isBlooming, setIsBlooming] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const handleRoseClick = () => {
    if (!isBlooming) {
      setIsBlooming(true)
      setTimeout(() => {
        setShowContent(true)
      }, 1500)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center text-white px-6 py-8 relative"
    >
      <div className="w-full max-w-2xl relative z-20">
        <motion.div
          className="relative rounded-3xl p-8 md:p-12 text-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255, 192, 203, 0.15), rgba(255, 105, 180, 0.1), rgba(219, 112, 147, 0.08))",
            backdropFilter: "blur(20px)",
            border: "2px solid rgba(255, 182, 193, 0.4)",
          }}
          animate={{
            boxShadow: [
              "0 0 30px rgba(255, 105, 180, 0.3), 0 0 60px rgba(255, 182, 193, 0.2)",
              "0 0 40px rgba(255, 105, 180, 0.5), 0 0 80px rgba(255, 182, 193, 0.3)",
              "0 0 30px rgba(255, 105, 180, 0.3), 0 0 60px rgba(255, 182, 193, 0.2)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative z-10 space-y-6">
            <AnimatePresence mode="wait">
              {!showContent ? (
                <motion.div
                  key="rose-stage"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center py-4"
                >
                  <div className="mb-4">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        style={{
                          left: `${30 + i * 15}%`,
                          top: `${20 + (i % 2) * 10}%`,
                        }}
                        animate={{
                          scale: [0.8, 1.2, 0.8],
                          opacity: [0.4, 0.8, 0.4],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      >
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                      </motion.div>
                    ))}
                  </div>
                  
                  <BeautifulRose onClick={handleRoseClick} isBlooming={isBlooming} />
                  
                  {isBlooming && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-pink-200 text-lg mt-4"
                    >
                      ✨ Blooming for you... ✨
                    </motion.p>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="content-stage"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Heart className="w-14 h-14 text-pink-400 fill-pink-400 mx-auto" 
                      style={{ filter: "drop-shadow(0 0 15px rgba(255, 105, 180, 0.7))" }}
                    />
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400 bg-clip-text text-transparent"
                  >
                    I've been hiding something sweet...
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ delay: 0.4, duration: 2, repeat: Infinity }}
                    className="text-base md:text-lg text-pink-200 leading-relaxed"
                  >
                    There's a little secret I've been saving for the right moment.
                    Want to know what it is? 💖
                  </motion.p>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onComplete}
                    className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white px-10 md:px-12 py-4 rounded-full font-semibold text-base md:text-lg shadow-lg relative overflow-hidden group"
                    style={{
                      boxShadow: "0 0 25px rgba(255, 105, 180, 0.5), 0 0 50px rgba(255, 182, 193, 0.3)",
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Heart className="w-5 h-5 fill-current" />
                      Show me
                      <Heart className="w-5 h-5 fill-current" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
